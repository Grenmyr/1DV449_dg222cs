/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;

var Mashup = function (socketSetting, mapSetting) {
    _socketSetting = io.connect(socketSetting);

    var eniro = new Eniro();

    eniro.waitForUserClick(function (eniroSearch) {
        eniroSearch.search_word = eniro.searchParameters[eniroSearch.search_word];
        console.log("skickade eniroSearch från Mashup.js");
        socketEmit('eniroSearch',eniroSearch);
    });
   /* _socketSetting.on('load', function (eniroJson) {
        console.log("connect");
        console.log(eniroJson);
    });*/


};
function socketEmit(emitName,search){
    _socketSetting.emit(emitName,search);
}