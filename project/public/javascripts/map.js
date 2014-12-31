/**
 * Created by dav on 2014-12-31.
 */
var Map = function () {

};

Map.prototype.initializeMap = function () {
    function loaded() {
        var mapOptions = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        };
        Map.prototype.mapReference = new google.maps.Map(document.getElementById('map'),
            mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', loaded());
};