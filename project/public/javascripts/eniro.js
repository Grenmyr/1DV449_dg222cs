/**
 * Created by dav on 2014-12-12.
 */
var Eniro = function () {
    var searchParameters = {
        movingCompany: "flyttfirma",
        cleaningCompany: "städfirma"
    };


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
        callback({selectedValue : select.options.selectedIndex,input: input.value});
    })

};
function makeSearch(category,searchstring) {


}