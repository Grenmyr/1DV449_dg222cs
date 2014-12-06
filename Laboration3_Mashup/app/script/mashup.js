/**
 * Created by dav on 2014-12-01.
 */

var mashup = {
    map: {
        object: {},
        mapOptions: {
            center: {lat: 56.697, lng: 16.354},
            zoom: 3
        },
        previousMarker: {}

    },
    firstLoad : true,
    selectedMarkers : []
};

function init() {

    var socket = io.connect('http://localhost');
    socket.on('load', function (data) {
        console.log("server push");

        //mashup['selectedMarkers'] = [];
        mashup['markersDefault'] = [];
        mashup['markersValue0'] = [];
        mashup['markersValue1'] = [];
        mashup['markersValue2'] = [];
        mashup['markersValue3'] = [];

        var cleanJson = cleanJsonObj(data);
        cleanJson.forEach(function (message) {
            mashup.markersDefault.push(message);

            switch (message['category']) {
                case 0 :
                    mashup.markersValue0.push(message);
                    break;
                case 1 :
                    mashup.markersValue1.push(message);
                    break;
                case 2 :
                    mashup.markersValue2.push(message);
                    break;
                case 3 :
                    mashup.markersValue3.push(message);
                    break;
                default :
                    console.log("pannkaka");
                    break;
            }
        });


        var select = document.querySelector('#dropdown-select');
        select.addEventListener('change', function (e) {
            switch (e.target.options.selectedIndex) {
                case 0 :
                    generateMarkers(mashup.markersValue0);
                    break;
                case 1 :
                    generateMarkers(mashup.markersValue1);
                    break;
                case 2 :
                    generateMarkers(mashup.markersValue2);
                    break;
                case 3 :
                    generateMarkers(mashup.markersValue3);
                    break;
                default  :
                    generateMarkers(mashup.markersDefault);
                    break;
            }
        });

        if(mashup.firstLoad){
            generateMarkers(mashup.markersDefault);
            mashup.firstLoad = false;

        }



    });

    function initialize() {
        mashup.map = new google.maps.Map(document.getElementById('map-canvas'), mashup.map.mapOptions);
    }


    google.maps.event.addDomListener(window, 'load', initialize);


    /* jQuery.get('/sr', function (data, textStatus, jqXHR) {
     generateMarkers(data);
     });*/

}
function cleanJsonObj(data) {

    var purifiedMarkers = data['messages'].map(function (message) {

        return {
            latitude: message.latitude,
            longitude: message.longitude,
            title: message.title,
            description: message.description,
            createddate: message.createddate,
            category: message.category,
            subcategory: message.subcategory
        };

    });
    purifiedMarkers.reverse();
    return purifiedMarkers;
}
function generateMarkers(data) {
    var div = document.querySelector('ul');

    div.textContent = "";

    console.log(mashup.selectedMarkers.length);
    mashup.selectedMarkers.forEach(function (marker) {
        marker.setMap(null);
    });
    mashup.selectedMarkers = [];


    var slicedMarkers = data.slice(0, 100);

    slicedMarkers.forEach(function (marker) {

        var markerPosition = new google.maps.LatLng(marker.latitude, marker.longitude);
        var infoWindow = new InfoWindow(marker);

        var addMarker = new google.maps.Marker({
            position: markerPosition,
            map: mashup.map,
            title: marker.title,
            infoWindow: new google.maps.InfoWindow({
                content: infoWindow.getDomString()
            })
        });


        //console.log(mashup.selectedMarkers);
        google.maps.event.addListener(addMarker, 'click', function () {

            if (mashup.map.previousMarker) {
                mashup.map.previousMarker.infoWindow.close();
            }

            mashup.map.setZoom(10);
            mashup.map.setCenter(markerPosition);
            this.infoWindow.open(mashup.map, this);
            mashup.map.previousMarker = this;
        });

        var list = document.createElement('li');
        list.textContent = addMarker.title;
        google.maps.event.addDomListener(list, "click", function (e) {
            e.preventDefault();
            google.maps.event.trigger(addMarker, "click");
        });
        div.appendChild(list);

        mashup.selectedMarkers.push(addMarker);
    });


    //console.log(mashup.markersValue3);
}

window.onload = init();