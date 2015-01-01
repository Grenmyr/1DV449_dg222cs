/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting) {
    _socketSetting = io.connect(socketSetting);

    var eniro = new Eniro();
    var map = new Map();
    var mapReference;

    eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = eniro.searchParameters[eniroSearch.search_word];
        console.log("skickade eniroSearch från Mashup.js");
        socketEmit('eniroSearch',eniroSearch);
        mapReference = map.initializeMap();
        console.log(map.mapReference);
    });
   /* _socketSetting.on('load', function (eniroJson) {
        console.log("connect");
        console.log(eniroJson);
    });*/
    _socketSetting.on('companySearch', function (companySearch) {
        console.log(companySearch);

    });

};
function socketEmit(emitName,search){
    _socketSetting.emit(emitName,search);
}

