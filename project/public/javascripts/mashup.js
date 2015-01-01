/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);

    var _eniro = new Eniro();
    var _map = new Map();
    var _detailedView = new DetailedView();
    var _companySearch = new CompanySearch();


    _eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
        console.log("skickade eniroSearch från Mashup.js");
        socketEmit('eniroSearch', eniroSearch);
        //console.log(_map.mapReference);

    });

    _companySearch.waitForUserClick(function (selectedCompany) {
        _detailedView.hideSearchView();
        _detailedView.renderDetailedView(selectedCompany);
        _map.showSelectedCompany(selectedCompany['location']['coordinates'][0]);
    });

    _socketSetting.on('companySearch', function (companySearch) {
        _map.initializeMap(companySearch);
        _map.addMarkers();
        _companySearch.generateCompanies(companySearch);
    });

};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

