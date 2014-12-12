/**
 * Created by dav on 2014-12-11.
 */
var settings = {
    socket: io.connect('http://localhost'),
    map: null,
    html : {
        body : document.querySelector('body'),
        content : document.querySelector('.content')
    }
};


function init() {
    initializeSocket();
    waitForUserClick();
}
function initializeSocket() {
    //settings.socket = io.connect('http://localhost');
}

function initializeMap() {
    function loaded() {
        var mapOptions = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        };
        settings.map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', loaded());
}

function waitForUserClick (){
    settings.html.body.addEventListener('click', function (e) {
        settings.html.content.style.visibility = "visible";
        console.log("loaded map");
        initializeMap();
        new Mashup(settings.socket,settings.map);
    });
}

window.onload = init();


