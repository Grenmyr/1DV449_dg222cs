/**
 * Created by dav on 2014-12-11.
 */


var Mashup = function () {
    var _socketSetting;
    _socketSetting = io.connect('http://localhost:3000');
    //_socketSetting = io.connect('188.166.30.34');
    var firstLoad = true;
    var lastSearch;
    var _search;
    var _eniro = new Eniro();
    var _map = new Map();
    _map.initializeMap();
    var _companyView = new CompanyView();
    var _localStorage = new Localstorage();
    var ping = 0;
    var pong = 0;
    var connectionHeader = document.querySelector('#connection');
    var welcomeHeader = document.querySelector('#start');

        setInterval(function(){
            ping++;
            socketEmit('ping', ping);
            if(ping > pong +1){
                connectionHeader.textContent = "Offline läge";
            }
            else{
                connectionHeader.textContent = "Online läge";
            }
        }, 3000);

        _socketSetting.on('pong', function (resp) {
            pong = resp;
        });

        _eniro.waitForUserClick(function (eniroSearch) {
                eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
                lastSearch = eniroSearch.geo_area + '&' + eniroSearch.search_word;

                if (firstLoad === true) {
                    welcomeHeader.remove();
                    _map.setupNavigation();
                    _map.waitForUserArrowPress(function (navigationResponse) {
                        _map.userNavigationGuide.remove();
                        _map.focusOnSelectedCompany(navigationResponse);
                        _companyView.renderBasicView(navigationResponse);
                    });
                    firstLoad = false;
                }


                _localStorage.localStorageComparability(function (browserSupport) {
                    if (browserSupport) {
                        if (localStorage[lastSearch]) {

                            _localStorage.getItem(lastSearch, function (searchResult) {
                                if (searchResult) {
                                    _search = searchResult;
                                    console.log("localstorage presenterade fräsh data");
                                    prepareData();
                                }
                                else {
                                    console.log("Data finns men gammal i localstorage, Söker ny via server")
                                    socketEmit('eniroSearch', eniroSearch);
                                }
                            })
                        }
                        else {
                            console.log("ny sökningskategori sökte via server");
                            socketEmit('eniroSearch', eniroSearch);
                        }
                    }
                    else {
                        socketEmit('eniroSearch', eniroSearch);
                    }
                });
            }
        );

        _socketSetting.on('companySearch', function (companySearch) {
            if (companySearch['adverts'].length > 0) {
                _search = companySearch;
                _localStorage.setItem(lastSearch, _search);
                prepareData();
            }
            else {
                _companyView.noResults();
            }
        });

        function prepareData() {
            var validCompanies = [];
            _search['adverts'].forEach(function (company) {
                if (company['homepage'] !== null &&
                    company['location']['coordinates'][0]['longitude'] !== null) {
                    validCompanies.push((company))
                }
            });
            _search['adverts'] = validCompanies;
            _map.setCompanies(_search);
            _companyView.setCompanies(_search);
            _map.addMarkers();
            _companyView.results(lastSearch, _search['adverts'].length);
            _map.markersEventListener(function (index) {
                _map.focusOnSelectedCompany(_search['adverts'][index]);
                _companyView.renderBasicView(_search['adverts'][index]);
            });
            _map.focusOnSelectedCompany(_search['adverts'][0]);
            _companyView.renderBasicView(_search['adverts'][0]);

        }

        function socketEmit(emitName, search) {
            _socketSetting.emit(emitName, search);
        }

};


