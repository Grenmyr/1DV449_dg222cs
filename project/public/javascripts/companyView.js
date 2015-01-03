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

    this.hideSearchView = function () {
        var divToModify = document.querySelector('#companySearch');
        divToModify.style.display = "none";
    };


    this.renderBasicView = function (company) {

        console.log(company)
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
        var link = cloneA.cloneNode(true);

        link.addEventListener('click', function () {
            window.open(company['homepage'], '_blank');
        });

        if (company['address']['streetName'] === null) {
            streetName.textContent = unknownAddress;
        }
        else {
            streetName.textContent = company['address']['streetName'];
            postArea.textContent = company['address']['postArea'];
            postCode.textContent = company['address']['postCode'];
            link.textContent = "Öppna Hemsida.";
        }
        addressDiv.appendChild(streetName);
        addressDiv.appendChild(postCode);
        addressDiv.appendChild(postArea);

        companyViewDiv.appendChild(header);
        companyViewDiv.appendChild(link);
        companyViewDiv.appendChild(addressDiv);
        basicDiv.appendChild(companyViewDiv);
        contentDiv.appendChild(basicDiv);

    };

    function renderDetailedView(company) {
        console.log(company);
        var detailedDiv = cloneDiv.cloneNode(true);
        var companyReviews = cloneA.cloneNode(true);
        companyReviews.href = company['companyReviews'];
        companyReviews.textContent = "konsumentomdömme från rejta";
        var companyViewDiv = document.querySelector('#basicView');

        detailedDiv.appendChild(companyReviews);
        detailedDiv.appendChild(companyViewDiv);
        detailedDiv.setAttribute('id', 'detailedDiv');

        contentDiv.appendChild(detailedDiv);

    }

};
