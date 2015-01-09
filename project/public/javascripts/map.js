/**
 * Created by dav on 2014-12-31.
 */
var Map = function () {

    var markers = [];
    var _companies;

    var redIcon = "../images/red.png";
    var greenIcon = "../images/green.png";

    var arrayIndex = 0;
    var leftArrow = document.getElementById('leftArrow');
    var rightArrow = document.getElementById('rightArrow');

    var mapOptions = {
        center: {lat: 58, lng: 15},
        zoom: 5,
        disableDefaultUI: true

    };
    this.setCompanies = function (companies) {
        _companies = companies;
        arrayIndex = 0;
    };


    this.initializeMap = function () {

        function loaded() {
            Map.mapReference = new google.maps.Map(document.getElementById('map'),
                mapOptions);
        }

        this.style();
        google.maps.event.addDomListener(window, 'load', loaded());

    };
    this.setupNavigation = function() {
        Map.prototype.userNavigationGuide.style.visibility = "visible";
        leftArrow.style.display = "flex";
        rightArrow.style.display = "flex";
    };

    this.waitForUserArrowPress = function (callback) {

        leftArrow.addEventListener('click', function (e) {
            e.preventDefault();
            if (arrayIndex > 0) {

                markers[arrayIndex].setIcon(redIcon);
                arrayIndex += -1;

                markers[arrayIndex].setIcon(greenIcon);
                callback(_companies['adverts'][arrayIndex]);
            }
        });

        rightArrow.addEventListener('click', function (e) {
            e.preventDefault();
            if (arrayIndex < _companies['adverts'].length - 1) {

                markers[arrayIndex].setIcon(redIcon);
                arrayIndex += 1;

                markers[arrayIndex].setIcon(greenIcon);

                callback(_companies['adverts'][arrayIndex]);
            }
        });

    };

    Map.prototype.focusOnSelectedCompany = function (company) {

        var markerPosition = new google.maps.LatLng(
            company['location']['coordinates'][0]['latitude'],
            company['location']['coordinates'][0]['longitude']);
        Map.mapReference.setCenter(markerPosition);
        Map.mapReference.setZoom(11);

        markers[arrayIndex].setIcon(greenIcon);
    };

    this.addMarkers = function () {

        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        arrayIndex = 0;

        _companies['adverts'].forEach(function (company) {
            createMarker(company, redIcon, function (callback) {
                markers.push(callback);
            });
        });
    };

    function createMarker(company, icon, callback) {

        var latitude = company['location']['coordinates'][0]['latitude'];
        var longitude = company['location']['coordinates'][0]['longitude'];

        var markerPosition = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: markerPosition,
            map: Map.mapReference,
            title: "tempotitel",
            icon: icon,
            infoWindow: new google.maps.InfoWindow({
                content: "tomkontent just nus"
            })

        });
        callback(marker);
    }

    this.markersEventListener = function (callback){

        markers.forEach(function(marker,i){
            google.maps.event.addListener(marker, 'click', function () {

                markers[arrayIndex].setIcon(redIcon);
                markers[i].setIcon(greenIcon);
                arrayIndex = i;
                callback(arrayIndex);
            });
        });

    };

    this.style = function () {
        mapOptions.styles =
            [{"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.5}]}, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#2D333C"}]
            }]
    }
};

Map.prototype.mapReference = null;
Map.prototype.userNavigationGuide = document.getElementById('companySearch').firstChild.nextSibling;