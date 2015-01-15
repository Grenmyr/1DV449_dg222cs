/**
 * Created by dav on 2015-01-08.
 */
var Localstorage = function () {
    // rules for timestamp on client, one week
    var oneWeek = 604800000;
    // check compability with localstorage
    this.localStorageComparability = function (callback) {
        if (typeof(Storage) !== "undefined") {
            callback(true);
        } else {
            callback(false);
        }
    };
    // retrieve one search
    this.getItem = function (searchParameter, callback) {
        var time = new Date().getTime();
        var searchResult = JSON.parse(localStorage.getItem(searchParameter));
        if (searchResult['timestamp'] > time - oneWeek) {
            callback(searchResult);
        }
        else {
            callback(false);
        }
    };
    // save once search
    this.setItem = function (searchParameter, object) {
        //console.log(searchParameter);
        var stringifyObject = JSON.stringify(object);
        localStorage.setItem(searchParameter, stringifyObject);
    };
    // used when client download offline data from server to save all companysearches with valid timestamp.
    this.setManyItems = function (cities) {
        var stringifyObject;
        var searchWord = "&" + cities[0].search_word;
        var time = new Date().getTime();
        cities.forEach(function (object) {
            if (object.timestamp > time - oneWeek) {
                stringifyObject = JSON.stringify(object);
                localStorage.setItem(object.city + searchWord, stringifyObject);
            }
        })
    }
};
