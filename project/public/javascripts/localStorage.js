/**
 * Created by dav on 2015-01-08.
 */
var Localstorage = function () {
    var oneWeek = 604800000;
    //var oneWeek = 30000;
    this.localStorageComparability = function (callback) {
        if(typeof(Storage) !== "undefined") {
            callback (true);
        } else {
            callback(false);
        }
    };

    this.getItem = function (searchParameter,callback){
        var refreshTime = new Date().getTime()- oneWeek;
        console.log(searchParameter);
        var searchResult = JSON.parse(localStorage.getItem(searchParameter));
        console.log(searchResult['timestamp']);
        console.log(new Date().getTime());
        if(searchResult['timestamp'] +oneWeek > refreshTime){
          callback(searchResult);
        }
        else{
           callback(false);
        }
    };
    this.setItem = function (searchParameter, object) {
        console.log(searchParameter);
        var stringifyObject = JSON.stringify(object);
        localStorage.setItem(searchParameter,stringifyObject);
    };

    this.setManyItems = function (cities){
        var stringifyObject;
        var searchWord = "&" +cities[0].search_word;
        cities.forEach(function(object){
            //console.log(object);
            //console.log(object.city+searchWord);
            stringifyObject =  JSON.stringify(object);
            localStorage.setItem(object.city+searchWord,stringifyObject);
        })
    }
};
