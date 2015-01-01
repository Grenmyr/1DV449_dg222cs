/**
 * Created by dav on 2015-01-01.
 */
var CompanySearch = function () {
    console.log("companysearchKonstruktor");

    var _companies;
    var div = document.querySelector('#companySearch');
    var listDiv = document.createElement('div');
    listDiv.setAttribute('id','listDiv');


    this.generateCompanies = function (companies){

        _companies = companies;


        while (listDiv.hasChildNodes()) {
            listDiv.removeChild(listDiv.lastChild);
        }

        console.log(_companies);
        console.log(_companies['totalHits']);




        div.appendChild(listDiv);
        var ul = document.createElement('ul');

        //console.log(companies);

        _companies['adverts'].forEach(function (company) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            console.log(company['companyInfo']['companyName']);
            a.textContent = company['companyInfo']['companyName'];
            li.appendChild(a);
            ul.appendChild(li);
        });

        listDiv.appendChild(ul);
    };


};
