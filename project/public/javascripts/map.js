/**
 * Created by dav on 2014-12-31.
 */
var Map = function () {
    var map;
    var markers = [];
    var _companies;

    var arrayIndex = 0;
    var leftArrow = document.getElementById('leftArrow');
    var rightArrow = document.getElementById('rightArrow');

    var mapOptions = {
        center: {lat: 58, lng: 15},
        zoom: 5
    };
    this.setCompanies = function (companies){
        _companies = companies;
    };


    this.initializeMap = function () {

        function loaded() {
            Map.mapReference = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            //addMarker(coordinates);
        }
        google.maps.event.addDomListener(window, 'load', loaded());
        setupNavigation();
    };
    function setupNavigation() {

        leftArrow.style.display = "flex";
        rightArrow.style.display = "flex";
    }

    this.waitForUserArrowPress = function (callback) {

        leftArrow.addEventListener('click', function (e) {
            e.preventDefault();
            if(arrayIndex > 0 ){
                arrayIndex += -1;
                callback(_companies['adverts'][arrayIndex]);
            }
        });

        rightArrow.addEventListener('click', function (e) {
            e.preventDefault();
            if(arrayIndex < _companies['adverts'].length-1){
                arrayIndex += 1;
                callback(_companies['adverts'][arrayIndex]);
            }
        });

    };

    this.focusOnSelectedCompany = function (company) {

        var markerPosition = new google.maps.LatLng(
            company['location']['coordinates'][0]['latitude'],
            company['location']['coordinates'][0]['longitude']);
        Map.mapReference.setCenter(markerPosition);
        Map.mapReference.setZoom(11);

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