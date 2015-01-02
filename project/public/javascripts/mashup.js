/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);
    var  _search;
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

   /*     _companySearch.waitForUserClick(function (selectedCompany) {
        _detailedView.hideSearchView();
        _detailedView.renderDetailedView(selectedCompany);
        _map.focusOnSelectedCompany(selectedCompany);
    });*/


    _socketSetting.on('companySearch', function (companySearch) {
        _search = companySearch;
        var validCompanies = [];
        _search['adverts'].forEach(function (company) {
            if (company['location']['coordinates'][0]['longitude'] !== null) {
                //console.log(company['location']['coordinates'][0]['longitude'])
                validCompanies.push((company))
            }
        });
        _search['adverts'] = validCompanies;
        _map.setCompanies(_search);
        _map.addMarkers();


        _map.focusOnSelectedCompany(_search['adverts'][0]);
        _detailedView.renderDetailedView(_search['adverts'][0]);

        //_companySearch.generateCompanies(companySearch);
    });

};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

