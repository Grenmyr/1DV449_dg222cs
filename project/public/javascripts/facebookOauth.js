/**
 * Created by dav on 2015-01-08.
 */
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    //console.log('statusChangeCallback');
    //console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    var loginButton = document.querySelector('#fbButton');
    if (response.status === 'connected') {
        // Logged into your app and Facebook.

        loginButton.style.display = "none";
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
        loginButton.style.display = "block";
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Logga in ' +
        'till Facebook för kunna använda all funktionalitet.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
var checkLoginState = function () {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};
var status;
window.checkLoginState2 = function () {

    FB.getLoginStatus(function (response) {
        //statusChangeCallback(response);
        status = response.status;

    });
    return status;
};

window.fbAsyncInit = function () {
    FB.init({
        appId: '1529045937346117',
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').textContent =
            'Välkommen ' + response.name + ' inloggad via facebook du har tillgång' +
            ' till all funktionalitet!';
        var companyViewDiv = document.getElementById('facebook');
        if (companyViewDiv !== null) {
            companyViewDiv.textContent = "Öppna facebook";
        }
    });
}