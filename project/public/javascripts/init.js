/**
 * Created by dav on 2014-12-11.
 */
    function init(){
    var socket = io.connect('http://localhost');
    socket.on('load', function (data) {
        console.log("connect");
        console.log(data);

    });
    initializeMap()

}
initializeSocket(){

}

function initializeMap(){

    function loaded(){
        var mapOptions = {
            center: { lat: -34.397, lng: 150.644},
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', loaded());


}


window.onload = init();


