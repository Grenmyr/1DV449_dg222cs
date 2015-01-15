/**
 * Created by dav on 2014-12-11.
 */
/* This 2 variables on window object is used from multiple javascripts to check connectivity.
 the first one is set by my ping/pong emit to server to true or false depending to connectivity.

 the second one is a fix, because offline first work 100% in chrome and opera, i had to do a workaround
 to make application no crash since other browsers cannot cache google maps.

 So for other browsers, if google maps fail to load, then i know it is full offline status
 (app started from offline) and then i disable function of google maps.

 */
window.onlineStatus = false;
window.loadedMapOnce = false;
var Mashup = function () {
    var _socketSetting;
    _socketSetting = io.connect('http://localhost:3000');
    //_socketSetting = io.connect('188.166.30.34');
    var firstLoad = true;
    var lastSearch;
    var _search;
    var _eniro = new Eniro();
    var _map = new Map();

    var _companyView = new CompanyView();
    var _localStorage = new Localstorage();
    var ping = 0;
    var pong = 0;

    var connectionHeader = document.querySelector('#connection');
    var welcomeHeader = document.querySelector('#start');
    var offlineData = document.querySelector('#offlineData');
    var waitHeader = document.querySelector('#wait');

    // Function socketEmit(ping) and SocketEmit(pong) to check status of server.
    setInterval(function () {
        ping++;
        socketEmit('ping', ping);
        if (ping > pong + 1) {
            connectionHeader.textContent = "Offline läge";
            offlineData.style.display = "none";
            window.onlineStatus = false;

        }
        else {
            connectionHeader.textContent = "Online läge";
            offlineData.style.display = "inline-block";
            window.onlineStatus = true;
            if (!window.loadedMapOnce) {
                _map.initializeMap();
                window.loadedMapOnce = true;
            }

        }
    }, 3000);

    _socketSetting.on('pong', function (resp) {
        pong = resp;
    });

    // load eventlisteners, and handle eniro search on client.
    _eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
        lastSearch = eniroSearch.geo_area + '&' + eniroSearch.search_word;

        if (firstLoad === true) {

            welcomeHeader.parentNode.removeChild(welcomeHeader);
            _map.setupNavigation();
            _map.waitForUserArrowPress(function (navigationResponse) {
                // ugly fix for internet explorer that cannot use .remove()
                if (_map.userNavigationGuide.parentNode !== null) {
                    _map.userNavigationGuide.parentNode.removeChild(_map.userNavigationGuide);
                }

                if (window.onlineStatus || window.loadedMapOnce) {
                    _map.focusOnSelectedCompany(navigationResponse);
                }
                _companyView.renderBasicView(navigationResponse);
            });
            firstLoad = false;
        }

        // function to  retrieve data from localstorage if data found, i call prepareData() and it present it without ask server.
        _localStorage.localStorageComparability(function (browserSupport) {
            if (browserSupport) {
                if (localStorage[lastSearch]) {

                    _localStorage.getItem(lastSearch, function (searchResult) {
                        if (searchResult) {
                            _search = searchResult;
                            waitHeader.style.display = "none";
                            prepareData();
                        }
                        else {
                            if (!window.onlineStatus) {
                                waitHeader.style.display = "block";
                            }
                            socketEmit('eniroSearch', eniroSearch);
                        }
                    })
                }
                else {
                    if (!window.onlineStatus) {
                        waitHeader.style.display = "block";
                    }
                    //console.log("ny sökningskategori sökte via server");
                    socketEmit('eniroSearch', eniroSearch);
                }
            }
            else {
                socketEmit('eniroSearch', eniroSearch);
            }
        });
    });
    // Emit that download all data to client and call on localstorage to save it.
    _eniro.offlineDataRequest(function (callback) {
        if (callback) {
            socketEmit('offlineData', true);
            _socketSetting.on('offlineData', function (data) {
                _localStorage.setManyItems(data);
                offlineData.textContent = "Data Sparat Lokalt"
            });
        }

    });

    // function to search server for data, if match save it, else present no results.
    _socketSetting.on('companySearch', function (companySearch) {

        waitHeader.style.display = "none";
        if (companySearch['adverts'].length > 0) {
            _search = companySearch;
            _localStorage.setItem(lastSearch, _search);
            prepareData();
        }
        else {
            _companyView.noResults();
        }
    });

    // function shared by localstorage and data from server to present for client.
    function prepareData() {
        // filter data and save only those with long lat on
        var validCompanies = [];
        _search['adverts'].forEach(function (company) {
            if (company['homepage'] !== null &&
                company['location']['coordinates'][0]['longitude'] !== null) {
                validCompanies.push((company))
            }
        });
        _search['adverts'] = validCompanies;
        _map.setCompanies(_search);

        // offline fix if online, for firefox, explorer, safari that way client can atleast use app if internet
        //disapears chrome/opera can use maps even if starting from offline.
        if (window.onlineStatus || window.loadedMapOnce) {
            _map.addMarkers();
        }
        // clear previous search if a new alid search is made.
        _companyView.results(lastSearch, _search['adverts'].length);
        if (_search['adverts'].length === 0) {
            _companyView.clearCompanyViewDiv();
            return;
        }
        // clear previous search markers if a new valid is made
        _map.markersEventListener(function (index) {
            // ugly fix for internet explorer that cannot use .remove()
            if (_map.userNavigationGuide.parentNode !== null) {
                _map.userNavigationGuide.parentNode.removeChild(_map.userNavigationGuide);
            }
            // see row 156
            if (window.onlineStatus || window.loadedMapOnce) {
                _map.focusOnSelectedCompany(_search['adverts'][index]);
            }
            _companyView.renderBasicView(_search['adverts'][index]);
        });
        // see row 156
        if (window.onlineStatus || window.loadedMapOnce) {
            _map.focusOnSelectedCompany(_search['adverts'][0]);
        }
        _companyView.renderBasicView(_search['adverts'][0]);
    }

    // using this function for all emit to server.
    function socketEmit(emitName, search) {

        _socketSetting.emit(emitName, search);
    }

};


