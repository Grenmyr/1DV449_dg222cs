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

    // message if emty searches.
    this.noResults = function () {
        header.textContent = 'Din sökning gav inga träffar, behåller senaste sökning.';
        divToModify.appendChild(header);
    };
    // message if search results
    this.results = function (lastSearch, results) {
        lastSearch = lastSearch.split('&');
        header.textContent = results + ' resultat från sökningen ' + lastSearch[1] + ' : ' + lastSearch[0];
        divToModify.appendChild(header);
    };
    // used to clear prvious company window from data.
    this.clearCompanyViewDiv = function () {
        while (companyViewDiv.hasChildNodes()) {
            companyViewDiv.removeChild(companyViewDiv.lastChild);
        }
    };
    /* big massive function to generate all dom inside companyView window.

     */
    this.renderBasicView = function (company) {

        this.clearCompanyViewDiv();
        var header = document.createElement('h2');
        header.textContent = company['companyInfo']['companyName'];
        var basicDiv = cloneDiv.cloneNode(true);
        var addressDiv = cloneDiv.cloneNode(true);
        var streetName = document.createElement('p');
        var postArea = document.createElement('p');
        var postCode = document.createElement('p');
        var homepageLink = cloneA.cloneNode(true);
        var phoneNumber = document.createElement('a');
        homepageLink.setAttribute('id', 'hemsida');
        var facebookLink = cloneA.cloneNode(true);
        facebookLink.setAttribute('id', 'facebook');
        var facebookLogin = cloneDiv.cloneNode(true);
        facebookLogin.setAttribute('id', 'status');

        var loginCheck = window.checkLoginState2();

        homepageOpen(homepageLink, company['homepage']);
        facebookOpen(facebookLink, company['facebook'], loginCheck);

        if (company['address']['streetName'] === null) {
            streetName.textContent = unknownAddress;
        }
        else {
            streetName.textContent = company['address']['streetName'];
            postArea.textContent = company['address']['postArea'];
            postCode.textContent = company['address']['postCode'];
        }

        if (company['phoneNumbers'][0]['phoneNumber'] !== null) {
            phoneNumber.href = "tel:" + company['phoneNumbers'][0]['phoneNumber'];
            phoneNumber.target = "_blank";
            phoneNumber.textContent = "TLF: " + company['phoneNumbers'][0]['phoneNumber'];
        }

        addressDiv.appendChild(streetName);
        addressDiv.appendChild(postCode);
        addressDiv.appendChild(postArea);

        companyViewDiv.appendChild(header);
        // ask my bool on window object if client got connection to server, if he is not online
        // then i choose not to present the online material.
        if (window.onlineStatus) {
            companyViewDiv.appendChild(homepageLink);
            companyViewDiv.appendChild(facebookLink);
            companyViewDiv.appendChild(facebookLogin);
        }
        companyViewDiv.appendChild(phoneNumber);
        companyViewDiv.appendChild(addressDiv);
        basicDiv.appendChild(companyViewDiv);
        contentDiv.appendChild(basicDiv);
    };

    /* function with event listener that check facebookOauth if user is logged in, if he is he can open it,
     if not he is asked to log in before.


     */
    function facebookOpen(node, externalLink, loginCheck) {
        if (externalLink !== null) {

            if (loginCheck === "connected") {
                node.textContent = "Öppna " + node.getAttribute('id');
            }
            else {
                node.textContent = "Logga in för se " + node.getAttribute('id');
            }
            node.addEventListener('click', function () {
                loginCheck = window.checkLoginState2();
                if (loginCheck === "connected") {
                    window.open(externalLink, '_blank');
                }

            });
        }
        else {
            companyViewDiv.appendChild(node);
            node.parentNode.removeChild(node);
        }

    }

    function homepageOpen(node, externalLink) {
        node.textContent = "Öppna " + node.getAttribute('id');
        node.addEventListener('click', function () {
            window.open(externalLink, '_blank');
        });
    }


};
