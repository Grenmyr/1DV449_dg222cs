/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);
    var searchParameter;
    var _search;
    var _eniro = new Eniro();
    var _map = null;
    var _companyView = new CompanyView();
    var _localStorage = new Localstorage();
    //var _companySearch = new CompanySearch();
    //var _oauthFacebook = new OauthFacebook();
    //var test = new test();


    _eniro.waitForUserClick(function (eniroSearch) {
            eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
            searchParameter = eniroSearch.geo_area + eniroSearch.search_word;

            console.log("skickade eniroSearch från Mashup.js");
            if (_map === null) {
                _map = new Map();
                _map.initializeMap();

                _map.waitForUserArrowPress(function (navigationResponse) {
                    _map.focusOnSelectedCompany(navigationResponse);
                    _companyView.renderBasicView(navigationResponse);
                });
            }

            _localStorage.localStorageComparability(function (supportLocalStorage) {
                if (supportLocalStorage) {
                    var refreshTime = new Date().getTime()-100000;
                    console.log(refreshTime);
                    if (localStorage[searchParameter]) {
                        _localStorage.getItem(searchParameter, function (searchResult) {
                            if(searchResult['timestamp'] > refreshTime){
                                _search = searchResult;
                                console.log("localstorage presenterade data");
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
    )
    ;

    /*     _companySearch.waitForUserClick(function (selectedCompany) {
     _detailedView.hideSearchView();
     _detailedView.renderBasicView(selectedCompany);
     _map.focusOnSelectedCompany(selectedCompany);
     });*/


    _socketSetting.on('companySearch', function (companySearch) {
        if(companySearch['adverts'].length > 0){
            _search = companySearch;
            console.log(_search);

            _localStorage.setItem(searchParameter, _search);

            prepareData();
        }
        else{
            console.log("inga träffar på sökning")
            // present somehow there was no searchresults
        }

        /*   var validCompanies = [];
         _search['adverts'].forEach(function (company) {
         if (company['homepage'] !== null &&
         company['location']['coordinates'][0]['longitude'] !== null) {
         validCompanies.push((company))
         }
         });

         console.log(companySearch['adverts'].length);
         _search['adverts'] = validCompanies;
         _map.setCompanies(_search);
         _map.addMarkers();
         console.log(validCompanies.length);

         _map.focusOnSelectedCompany(_search['adverts'][0]);
        _companyView.renderBasicView(_search['adverts'][0]);*/
    });

    function prepareData() {
        var validCompanies = [];
        _search['adverts'].forEach(function (company) {
            if (company['homepage'] !== null &&
                company['location']['coordinates'][0]['longitude'] !== null) {
                validCompanies.push((company))
            }
        });

        //console.log(companySearch['adverts'].length);
        _search['adverts'] = validCompanies;
        _map.setCompanies(_search);
        _map.addMarkers();
        console.log(validCompanies.length);

        _map.focusOnSelectedCompany(_search['adverts'][0]);
        _companyView.renderBasicView(_search['adverts'][0]);
    }
};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

