/**
 * Created by dav on 2014-12-12.
 */
var Eniro = function () {
    var offlineData = document.querySelector('#offlineData');
    // STRING DEPENDENCY TO INDEX.JS in Route Folder
    var onlyOnce = true;
    this.offlineDataRequest = function (callback) {

        offlineData.addEventListener('click', function () {
            if (onlyOnce) {
                callback(true);
            }
            onlyOnce = false;
        });


    };

};


Eniro.prototype.waitForUserClick = function (callback) {
    var select = document.querySelector('#companySelect');
    var input = document.querySelector('#inputfield');
    var button = document.querySelector('#searchButton');
    button.addEventListener('click', function () {
        callback({
            search_word: select.options.selectedIndex,
            geo_area: input.value.toLocaleLowerCase()
        });
    });

    input.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key == 13) { //
            callback({
                search_word: select.options.selectedIndex,
                geo_area: input.value.toLocaleLowerCase()
            });
        }
    });

};
Eniro.prototype.searchParameters = ["flyttfirma", "städfirma"];
