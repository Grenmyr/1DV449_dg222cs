/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);
    var lastSearch;
    var _search;
    var _eniro = new Eniro();
    var _map = null;
    var _companyView = new CompanyView();
    var _localStorage = new Localstorage();
    //var _companySearch = new CompanySearch();
    //var _oauthFacebook = new OauthFacebook();
    //var test = new test();

    var connectionHeader = document.querySelector('#connection');
    var welcomeHeader = document.querySelector('#start');

    _eniro.waitForUserClick(function (eniroSearch) {
            eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
            lastSearch = eniroSearch.geo_area + eniroSearch.search_word;

            if (_map === null) {
                welcomeHeader.remove();
                _map = new Map();
                _map.initializeMap();

                _map.waitForUserArrowPress(function (navigationResponse) {
                    _map.focusOnSelectedCompany(navigationResponse);
                    _companyView.renderBasicView(navigationResponse);
                });
            }

            _localStorage.localStorageComparability(function (browserSupport) {
                if (browserSupport) {
                    if (localStorage[lastSearch]) {

                        _localStorage.getItem(lastSearch, function (searchResult) {
                            if(searchResult){
                                _search = searchResult;
                                console.log("localstorage presenterade fräsh data");
                                prepareData();
                            }
                            else{
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
    _socketSetting.on('disconnect', function() {
        connectionHeader.textContent = "Offline läge";
    });

    _socketSetting.on('connect', function() {
        connectionHeader.textContent = "Online läge";
    });

    _socketSetting.on('companySearch', function (companySearch) {
        if(companySearch['adverts'].length > 0){
            _search = companySearch;
            console.log(_search);
            _localStorage.setItem(lastSearch, _search);
            prepareData();
        }
        else{
            console.log("inga träffar på sökning");
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
        _map.addMarkers();
        //_map.markerEventlisterner();
        _map.focusOnSelectedCompany(_search['adverts'][0]);
        _companyView.renderBasicView(_search['adverts'][0]);

    }
};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

