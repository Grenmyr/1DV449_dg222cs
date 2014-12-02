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
    markersCategoryDefault:[]
};
function init () {


    function initialize() {
        mashup.map = new google.maps.Map(document.getElementById('map-canvas'), mashup.map.mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


    jQuery.get('/sr', function (data, textStatus, jqXHR) {
      generateMarkers(data);
    });

}
function generateMarkers(data) {
    var purifiedMarkers = [];
        purifiedMarkers = data['messages'].map(function(message){

        return {
            latitude: message.latitude,
            longitude: message.longitude,
            title: message.title,
            description: message.description,
            createddate: message.createddate
        };

    });
    purifiedMarkers.reverse();
    var slicedMarkers = purifiedMarkers.slice(0,100);

    slicedMarkers.forEach(function(marker){

        var markerPosition = new google.maps.LatLng(marker.latitude,marker.longitude);
        var addMarker = new google.maps.Marker({
            position: markerPosition,
            map: mashup.map,
            title: marker.title
        });
        mashup.markersCategoryDefault.push(marker);
        google.maps.event.addListener(addMarker,'click',function(){
            mashup.map.setZoom(10);
            mashup.map.setCenter(markerPosition);
        });

    })
    console.log(mashup.markersCategoryDefault.length)
}
window.onload = init();