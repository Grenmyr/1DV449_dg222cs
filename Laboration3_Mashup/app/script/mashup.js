/**
 * Created by dav on 2014-12-01.
 */

var mashup = {
    map: {
        object: {},
        mapOptions:{
            center: {lat: 56.697, lng: 16.354},
            zoom: 3
        },
        event: []
    },
    markersDefault:[],
    markersValue0: [],
    markersValue1:[],
    markersValue2: [],
    markersValue3:[]

};
function init () {

    var socket = io.connect('http://localhost');
    socket.on('load', function (data) {
        var cleanJson = cleanJsonObj(data);
        cleanJson.forEach(function(message){
            mashup.markersDefault.push(message);
            switch (message['category']){
                case 0 :
                    mashup.markersValue0.push(message);
                    break;
                case 1 : mashup.markersValue1.push(message);
                    break;
                case 2 : mashup.markersValue2.push(message);
                    break;
                case 3 : mashup.markersValue3.push(message);
                    break;
                default :
                    console.log("pannkaka");
                    break;
            }
        });

        generateMarkers(mashup.markersValue3);
        socket.emit('my other event', { my: 'data' });
    });

    function initialize() {
        mashup.map = new google.maps.Map(document.getElementById('map-canvas'), mashup.map.mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


   /* jQuery.get('/sr', function (data, textStatus, jqXHR) {
      generateMarkers(data);
    });*/

}
function cleanJsonObj(data){

    var  purifiedMarkers = data['messages'].map(function(message){

        return {
            latitude: message.latitude,
            longitude: message.longitude,
            title: message.title,
            description: message.description,
            createddate: message.createddate,
            category : message.category
        };

    });
    return purifiedMarkers;
}
function generateMarkers(data) {
   //var purifiedMarkers = cleanJsonObj(data);
    data.reverse();
    var slicedMarkers = data.slice(0,100);

    slicedMarkers.forEach(function(marker){

        var markerPosition = new google.maps.LatLng(marker.latitude,marker.longitude);
        var addMarker = new google.maps.Marker({
            position: markerPosition,
            map: mashup.map,
            title: marker.title
        });

        mashup.markersDefault.push(marker);
        google.maps.event.addListener(addMarker,'click',function(){
            mashup.map.setZoom(10);
            mashup.map.setCenter(markerPosition);
        });

    });
    console.log(mashup.markersValue3);
}
window.onload = init();