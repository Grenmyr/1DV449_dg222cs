/**
 * Created by dav on 2015-01-08.
 */
var Localstorage = function () {
    var oneWeek = 604800000;
    this.localStorageComparability = function (callback) {
        if(typeof(Storage) !== "undefined") {
            callback (true);
        } else {
            callback(false);
        }
    };

    this.getItem = function (searchParameter,callback){
        var time = new Date().getTime();
        //console.log(searchParameter);
        var searchResult = JSON.parse(localStorage.getItem(searchParameter));
        //console.log(searchResult['timestamp']);
        //console.log(time);
        if(searchResult['timestamp'] > time -oneWeek){
          callback(searchResult);
        }
        else{
           callback(false);
        }
    };
    this.setItem = function (searchParameter, object) {
        //console.log(searchParameter);
        var stringifyObject = JSON.stringify(object);
        localStorage.setItem(searchParameter,stringifyObject);
    };

    this.setManyItems = function (cities){
        var stringifyObject;
        var searchWord = "&" +cities[0].search_word;
        var time = new Date().getTime();
        cities.forEach(function(object){
            if(object.timestamp > time - oneWeek){
                //console.log(object);
                //console.log(object.city+searchWord);
                stringifyObject =  JSON.stringify(object);
                localStorage.setItem(object.city+searchWord,stringifyObject);
            }
        })
    }
};
