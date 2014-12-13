/**
 * Created by dav on 2014-12-11.
 */
var _socketSetting;
var Mashup = function (socketSetting, mapSetting) {
    _socketSetting = io.connect(socketSetting);

    var eniro = new Eniro();

    eniro.waitForUserClick(function (eniroSearch) {
        socketEmit(eniroSearch);
    });
   /* _socketSetting.on('load', function (eniroJson) {
        console.log("connect");
        console.log(eniroJson);
    });*/


};
function socketEmit(search){
    _socketSetting.emit('eniroSearch',search);
}