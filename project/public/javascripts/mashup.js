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
    var mapReference;

    _eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = _eniro.searchParameters[eniroSearch.search_word];
        console.log("skickade eniroSearch från Mashup.js");
        socketEmit('eniroSearch', eniroSearch);
        //console.log(_map.mapReference);
    });

    _companySearch.waitForUserClick(function (selectedCompany) {
        _detailedView.hideSearchView();
        _detailedView.renderDetailedView(selectedCompany);


        mapReference = _map.initializeMap(selectedCompany['location']['coordinates'][0]);
        console.log(selectedCompany);
    });

    _socketSetting.on('companySearch', function (companySearch) {
        //console.log(companySearch);

        _companySearch.generateCompanies(companySearch);
        console.log("skickar");
    });

};
function socketEmit(emitName, search) {
    _socketSetting.emit(emitName, search);
}

