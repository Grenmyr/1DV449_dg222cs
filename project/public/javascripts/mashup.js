/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);
    var _search;
    var _eniro = new Eniro();
    var _map = null;
    var _companyView = new CompanyView();
    var _companySearch = new CompanySearch();


    _eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
        console.log("skickade eniroSearch från Mashup.js");
        if (_map === null) {
            _map = new Map();
            _map.initializeMap();

            _map.waitForUserArrowPress(function (navigationResponse) {
                _map.focusOnSelectedCompany(navigationResponse);
                _companyView.renderBasicView(navigationResponse);
            });
        }

        socketEmit('eniroSearch', eniroSearch);
    });

    /*     _companySearch.waitForUserClick(function (selectedCompany) {
     _detailedView.hideSearchView();
     _detailedView.renderBasicView(selectedCompany);
     _map.focusOnSelectedCompany(selectedCompany);
     });*/


    _socketSetting.on('companySearch', function (companySearch) {
        _search = companySearch;
        var validCompanies = [];
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
        _companyView.renderBasicView(_search['adverts'][0]);
    });

};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

