/**
 * Created by dav on 2014-12-11.
 */
var Mashup = function (socketSetting, mapSetting) {
    var _socketSetting = socketSetting;
    var _mapSetting = mapSetting;

    var eniro = new Eniro();
    eniro.waitForUserClick(function () {
        console.log("userlicked");
    });

    _socketSetting.on('load', function (eniroJson) {
        console.log("connect");
        console.log(eniroJson);
    });


};