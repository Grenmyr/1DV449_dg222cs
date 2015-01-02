/**
 * Created by dav on 2015-01-01.
 */
var CompanySearch = function () {
    var _companies;

    var div = document.querySelector('#companySearch');
    var listDiv = document.createElement('div');
    listDiv.setAttribute('id','listDiv');
    div.appendChild(listDiv);
    var ul = document.createElement('ul');

    this.waitForUserClick = function (callback){
        ul.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target.nodeName === 'A') {
                callback(_companies['adverts'][e.target.parentNode.id]);
            }
        });
    };
    this.generateComp = function(companies){
        _companies = companies;




        _companies['adverts'].forEach(function (company,i) {
            var li = document.createElement('li');
            li.setAttribute('id',i);
            var a = document.createElement('a');
            //console.log(company['companyInfo']['companyName']);
            a.textContent = company['companyInfo']['companyName'];
            li.appendChild(a);
            ul.appendChild(li);
        });
        listDiv.appendChild(ul);

    };

    this.generateCompanies = function (companies){

        _companies = companies;

        console.log(_companies['adverts'].length)

        while (ul.hasChildNodes()) {
            console.log("remove")
            ul.removeChild(ul.lastChild);
        }


        _companies['adverts'].forEach(function (company,i) {
            var li = document.createElement('li');
            li.setAttribute('id',i);
            var a = document.createElement('a');
            //console.log(company['companyInfo']['companyName']);
            a.textContent = company['companyInfo']['companyName'];
            li.appendChild(a);
            ul.appendChild(li);
        });
        listDiv.appendChild(ul);
    };
};
