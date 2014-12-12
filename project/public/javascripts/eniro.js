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
    var select = document.querySelector('#searchButton');
    select.addEventListener('click', function (e) {
        console.log(e.target);
        makeSearch(e.target,"kalmar");
        callback();
    })

};
function makeSearch(category,searchstring) {

}