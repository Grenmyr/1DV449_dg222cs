/**
 * Created by dav on 2015-01-08.
 */
var Localstorage = function () {

    this.localStorageComparability = function (callback) {
        if(typeof(Storage) !== "undefined") {
            callback (true);
        } else {
            callback(false);
        }
    };

    this.getItem = function (searchParameter,callback){
        var rawData = localStorage.getItem(searchParameter);
        //console.log(rawData);
       var item = JSON.parse(localStorage.getItem(searchParameter));
        //console.log(item);
        callback(item);
    };
    this.setItem = function (searchParameter, object) {
        var stringifyObject = JSON.stringify(object);
        localStorage.setItem(searchParameter,stringifyObject);
    }
};
