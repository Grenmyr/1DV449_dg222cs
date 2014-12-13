/**
 * Created by dav on 2014-12-11.
 */
var settings = {
    socket: io.connect('http://localhost:3000'),
    map: null,
    html : {
        start : document.querySelector('#start'),
        content : document.querySelector('.content')
    }
};
function init() {
    waitForUserClick();
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
    settings.html.start.addEventListener('click', function (e) {
        settings.html.content.style.visibility = "visible";
        settings.html.start.remove();
        console.log("loaded map");
        initializeMap();
        new Mashup(settings.socket,settings.map);
    });
}

window.onload = init();


