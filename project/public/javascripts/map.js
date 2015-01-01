/**
 * Created by dav on 2014-12-31.
 */
var Map = function () {
    var map;
    var markers = [];
    var _companies;

    this.initializeMap = function (companies) {
        _companies = companies;
        console.log(_companies);
        function loaded() {
            var mapOptions = {
                center: {lat: 58, lng: 15},
                zoom: 5
            };
            Map.mapReference = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            //addMarker(coordinates);

        }

        google.maps.event.addDomListener(window, 'load', loaded());
    };

    this.showSelectedCompany = function (company) {
        //generate marker and infowindow?
    };

    this.addMarkers = function () {
        markers = [];
        _companies['adverts'].forEach(function (company) {
            var latitude = company['location']['coordinates'][0]['latitude'];
            var longitude = company['location']['coordinates'][0]['longitude'];

            if (latitude !== null) {
                var markerPosition = new google.maps.LatLng(latitude, longitude);
                var marker = new google.maps.Marker({
                    position: markerPosition,
                    map: Map.mapReference,
                    title: "tempotitel",
                    infoWindow: new google.maps.InfoWindow({
                        content: "tomkontent just nus"
                    })
                });
                markers.push(marker);
            }
        });


    }
};

Map.prototype.mapReference = null;