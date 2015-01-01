/**
 * Created by dav on 2014-12-31.
 */
var Map = function () {
    var map;

    this.initializeMap = function (coordinates) {
        function loaded() {
            var mapOptions = {
                center: {lat: coordinates['latitude'], lng: coordinates['longitude']},
                zoom: 11
            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var markerPosition = new google.maps.LatLng(coordinates['latitude'], coordinates['longitude']);

            var marker = new google.maps.Marker({
                position: markerPosition,
                map: map,
                title: "tempotitel" ,
                infoWindow: new google.maps.InfoWindow({
                    content: "tomkontent just nus"
                })
            });
        }
        google.maps.event.addDomListener(window, 'load', loaded());
    };
};

