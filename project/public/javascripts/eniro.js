/**
 * Created by dav on 2014-12-12.
 */
var Eniro = function () {
    var searchParameters ={
        movingCompany: "flyttfirma",
        cleaningCompany : "städfirma"
    };


    console.log("enirokonstruktor");
    this.requestData = function () {
        console.log("requestData")
    };
   setupSearch();
};

function setupSearch (){
    var select = document.querySelector('#companySelect');
    select.addEventListener('change', function (e) {

    })

}
