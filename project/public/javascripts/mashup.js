/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);
    var arrayIndex = 0;
    var _eniro = new Eniro();
    var _map = null;
    var _detailedView = new DetailedView();
    var _companySearch = new CompanySearch();


    _eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
        console.log("skickade eniroSearch från Mashup.js");
        if (_map === null) {
            _map = new Map();
            _map.initializeMap();

            _map.waitForUserArrowPress(function (navigationResponse) {
                _map.focusOnSelectedCompany(navigationResponse);
                _detailedView.renderDetailedView(navigationResponse);
            });
        }
        socketEmit('eniroSearch', eniroSearch);
    });

    _companySearch.waitForUserClick(function (selectedCompany) {
        _detailedView.hideSearchView();
        _detailedView.renderDetailedView(selectedCompany);
        _map.focusOnSelectedCompany(selectedCompany['location']['coordinates'][0]);
    });


    _socketSetting.on('companySearch', function (companySearch) {
        _companySearch = companySearch;
        var validCompanies = [];
        _companySearch['adverts'].forEach(function (company) {
            if (company['location']['coordinates'][0]['longitude'] !== null) {
                validCompanies.push((company))
            }
        });
        _companySearch['adverts'] = validCompanies;
        _map.setCompanies(_companySearch);
        _map.addMarkers();

        _map.focusOnSelectedCompany(_companySearch['adverts'][0]);
        _detailedView.renderDetailedView(_companySearch['adverts'][0]);

        //_companySearch.generateCompanies(companySearch);
    });

};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

