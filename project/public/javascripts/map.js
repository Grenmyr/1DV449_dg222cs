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
    // arrows on side reset and also reset search when a new valid search is done.
    this.setCompanies = function (companies) {
        _companies = companies;
        arrayIndex = 0;
        rightArrow.style.display = "inline-block";
        leftArrow.style.display = "inline-block";
    };

    // run only once.
    this.initializeMap = function () {

        function loaded() {
            Map.mapReference = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            mapLoaded = true;
        }

        this.style();
        google.maps.event.addDomListener(window, 'load', loaded());

    };
    this.setupNavigation = function () {
        Map.prototype.userNavigationGuide.style.display = "block";
        leftArrow.style.display = "flex";
        rightArrow.style.display = "flex";
    };

    // function to give better navigation one can change company with side. also changing style on markers
    // depending on what marker user is on.
    this.waitForUserArrowPress = function (callback) {

        leftArrow.addEventListener('click', function (e) {
            e.preventDefault();
            if (arrayIndex > 0) {
                // fix for firefox,explorer and safari so it work
                if (window.onlineStatus || window.loadedMapOnce) {

                    markers[arrayIndex].setIcon(redIcon);
                }
                arrayIndex += -1;
                if (window.onlineStatus || window.loadedMapOnce) {

                    markers[arrayIndex].setIcon(greenIcon);


                    if (arrayIndex === 0) {
                        leftArrow.style.display = "none";
                    }
                    else {
                        leftArrow.style.display = "inline-block";
                        rightArrow.style.display = "inline-block"
                    }
                }
                callback(_companies['adverts'][arrayIndex]);
            }
        });

        rightArrow.addEventListener('click', function (e) {
            e.preventDefault();
            if (arrayIndex < _companies['adverts'].length - 1) {
                if (window.onlineStatus || window.loadedMapOnce) {
                    markers[arrayIndex].setIcon(redIcon);
                }
                arrayIndex += 1;
                if (window.onlineStatus || window.loadedMapOnce) {
                    markers[arrayIndex].setIcon(greenIcon);


                    if (arrayIndex === _companies['adverts'].length - 1) {
                        rightArrow.style.display = "none";
                        leftArrow.style.display = "inline-block";
                    }
                    else {
                        rightArrow.style.display = "inline-block";
                        leftArrow.style.display = "inline-block";
                    }
                }
                callback(_companies['adverts'][arrayIndex]);
            }

        });

    };
    // called from mashup.js when user selected a company, it focus map on that location.
    Map.prototype.focusOnSelectedCompany = function (company) {
        var markerPosition = new google.maps.LatLng(
            company['location']['coordinates'][0]['latitude'],
            company['location']['coordinates'][0]['longitude']);
        Map.mapReference.setCenter(markerPosition);
        Map.mapReference.setZoom(11);

        markers[arrayIndex].setIcon(greenIcon);
    };
    // generate fresh markers from mashup.js when new valid search is made and remove old.
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

    // put attributes on each marker.
    function createMarker(company, icon, callback) {
        var latitude = company['location']['coordinates'][0]['latitude'];
        var longitude = company['location']['coordinates'][0]['longitude'];

        var markerPosition = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: markerPosition,
            map: Map.mapReference,
            title: company['companyInfo']['companyName'],
            icon: icon
        });
        callback(marker);
    }

    this.markersEventListener = function (callback) {

        markers.forEach(function (marker, i) {
            google.maps.event.addListener(marker, 'click', function () {

                markers[arrayIndex].setIcon(redIcon);
                markers[i].setIcon(greenIcon);
                arrayIndex = i;
                callback(arrayIndex);
            });
        });

    };
    // css for my google map
    this.style = function () {
        mapOptions.styles =
            [{"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.5}]}, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#2D333C"}]
            }]
    }
};
// make it on prototype for all that owns Map.(mashup.js)
Map.prototype.mapReference = null;
Map.prototype.userNavigationGuide = document.getElementById('userNavGuide');