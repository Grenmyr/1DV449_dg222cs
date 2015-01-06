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

        var refreshTime = new Date().getTime()-100000;
        var searchResult = JSON.parse(localStorage.getItem(searchParameter));
        //console.log(searchResult['timestamp']);
        //console.log(refreshTime);
        if(searchResult['timestamp'] > refreshTime){
          callback(searchResult);
        }
        else{
           callback(false);
        }
    };
    this.setItem = function (searchParameter, object) {
        var stringifyObject = JSON.stringify(object);
        localStorage.setItem(searchParameter,stringifyObject);
    }
};
