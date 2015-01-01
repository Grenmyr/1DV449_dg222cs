/**
 * Created by dav on 2014-12-12.
 */
var Eniro = function () {
    // STRING DEPENDENCY TO INDEX.JS in Route Folder



    console.log("enirokonstruktor");
    this.requestData = function () {
        console.log("requestData")
    };
};

Eniro.prototype.waitForUserClick = function (callback) {
    var select = document.querySelector('#companySelect');
    var input = document.querySelector('#inputfield');
    var button = document.querySelector('#searchButton');
    button.addEventListener('click', function () {
        callback({search_word: select.options.selectedIndex,
            geo_area: input.value.toLocaleLowerCase()});
    })

};
Eniro.prototype.searchParameters = [ "flyttfirma", "städfirma"];
function makeSearch(category, searchstring) {

}