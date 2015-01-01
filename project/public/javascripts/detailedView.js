/**
 * Created by dav on 2015-01-01.
 */
var DetailedView = function (){
    var unknownAddress = "okänd adress";
    var contentDiv = document.querySelector('.content');
    var detailedViewDiv = document.createElement('div');

    this.hideSearchView = function (){
        var divToModify =  document.querySelector('#companySearch');
        divToModify.style.display = "none";
    };

    this.renderDetailedView = function (company){
        console.log(company)

        var header = document.createElement('h2');
        header.textContent = company['companyInfo']['companyName'];


        var addressDiv = document.createElement('div');

        var streetName = document.createElement('p');
        var postArea = document.createElement('p');
        var postCode = document.createElement('p');
        if(company['address']['streetName'] === null){

            streetName.textContent = unknownAddress;

        }
        else{
            streetName.textContent = company['address']['streetName'];
            postArea.textContent = company['address']['postArea'];
            postCode.textContent = company['address']['postCode'];
        }
        addressDiv.appendChild(streetName);
        addressDiv.appendChild(postCode);
        addressDiv.appendChild(postArea);



        detailedViewDiv.appendChild(header);
        detailedViewDiv.appendChild(addressDiv);
        contentDiv.appendChild(detailedViewDiv);

    };

};
