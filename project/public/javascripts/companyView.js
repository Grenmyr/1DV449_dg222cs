/**
 * Created by dav on 2015-01-01.
 */
var CompanyView = function () {
    var unknownAddress = "okänd adress";
    var contentDiv = document.querySelector('.content');
    var companyViewDiv = document.createElement('div');
    companyViewDiv.setAttribute('id', 'basicView');
    var cloneDiv = document.createElement('div');
    var cloneA = document.createElement('a');
    var header = document.createElement('h2');
    var divToModify = document.querySelector('#companySearch');

    var _companies;

    this.noResults = function(){
        header.textContent = 'Din sökning gav inga träffar, behåller senaste sökning.';
            divToModify.appendChild(header);
    };
    this.results = function (lastSearch,results){
        lastSearch = lastSearch.split('&');
        header.textContent = results+' resultat från sökningen '+ lastSearch[1]+' : ' +lastSearch[0];
        divToModify.appendChild(header);
    };
    this.setCompanies = function (companies) {
        _companies = companies;
    };


    this.renderBasicView = function (company) {

        while (companyViewDiv.hasChildNodes()) {
            companyViewDiv.removeChild(companyViewDiv.lastChild);
        }

        var header = document.createElement('h2');
        header.textContent = company['companyInfo']['companyName'];
        var basicDiv = cloneDiv.cloneNode(true);
        var addressDiv = cloneDiv.cloneNode(true);
        var streetName = document.createElement('p');
        var postArea = document.createElement('p');
        var postCode = document.createElement('p');
        var homepageLink = cloneA.cloneNode(true);
        homepageLink.setAttribute('id','hemsida');
        var facebookLink = cloneA.cloneNode(true);
        facebookLink.setAttribute('id','facebook');
        var facebookLogin = cloneDiv.cloneNode(true);
        facebookLogin.setAttribute('id','status');

        populateExternalLinks(homepageLink, company['homepage']);
        populateExternalLinks(facebookLink, company['facebook']);

        if (company['address']['streetName'] === null) {
            streetName.textContent = unknownAddress;
        }
        else {
            streetName.textContent = company['address']['streetName'];
            postArea.textContent = company['address']['postArea'];
            postCode.textContent = company['address']['postCode'];
        }
        addressDiv.appendChild(streetName);
        addressDiv.appendChild(postCode);
        addressDiv.appendChild(postArea);

        companyViewDiv.appendChild(header);
        companyViewDiv.appendChild(homepageLink);
        companyViewDiv.appendChild(facebookLink);
        companyViewDiv.appendChild(facebookLogin);

        companyViewDiv.appendChild(addressDiv);
        basicDiv.appendChild(companyViewDiv);
        contentDiv.appendChild(basicDiv);
    };

    function populateExternalLinks (node,externalLink) {
        if(externalLink !== null){
            node.textContent = "Öppna "+ node.getAttribute('id');
            node.addEventListener('click', function () {
                window.open(externalLink, '_blank');
            });
        }
        else{
            node.remove();
        }

    }

};
