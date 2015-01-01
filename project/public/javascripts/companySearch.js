/**
 * Created by dav on 2015-01-01.
 */
var CompanySearch = function () {
    console.log("companysearchKonstruktor");




    this.generateCompanies = function (companies){
        console.log("inne");
        var div = document.querySelector('#companySearch');
        var listDiv = document.createElement('div');
        listDiv.setAttribute('id','listDiv');
        div.appendChild(listDiv);
        var ul = document.createElement('ul');




        //console.log(companies);

        companies['adverts'].forEach(function (company) {
            var li = document.createElement('li');
            console.log(company['companyInfo']['companyName']);
            li.textContent = company['companyInfo']['companyName'];
            ul.appendChild(li);
        });

        listDiv.appendChild(ul);
    };


};
