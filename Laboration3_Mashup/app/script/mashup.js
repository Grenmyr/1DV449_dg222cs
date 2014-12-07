/**
 * Created by dav on 2014-12-01.
 */
var icons = [
    "../files/blue.png",
    "../files/orange.png",
    "../files/yellow.png",
    "../files/green.png",
    "../files/blue.png"
];
var mashup = {
    map: {
        object: {},
        mapOptions: {
            center: {lat: 62.697, lng: 14.354},
            zoom: 4
        },
        previousMarker: {}
    },
    firstLoad : true,
    selectedMarkers : []
};


function fetchSrData() {
    var socket = io.connect('http://localhost');

    socket.on('load', function (srJson) {

        console.log("server push");
        mashup['markersDefault'] = [];
        mashup['newMarkers'] = [];
        mashup['markersValue0'] = [];
        mashup['markersValue1'] = [];
        mashup['markersValue2'] = [];
        mashup['markersValue3'] = [];

        var cleanedFullJson = cleanJsonObj(srJson);
        cleanedFullJson.forEach(function (message) {
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
        if(mashup.firstLoad) {
            console.log("pushed new data from server");
            generateMarkers(mashup.markersDefault);
            mashup.firstLoad = false;
        }

    });

    function initializeMap() {
        console.log("initializeMap körs");
        var select = document.querySelector('#dropdown-select');
        select.addEventListener('change', function (e) {
            mashup.map.setZoom(4);
            mashup.map.setCenter({lat: 62.697, lng: 14.354});
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

        mashup.map = new google.maps.Map(document.getElementById('map-canvas'), mashup.map.mapOptions );
    }
    google.maps.event.addDomListener(window, 'load', initializeMap);


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
            subcategory: message.subcategory,
            priority : message.priority
        };

    });
    purifiedMarkers.reverse();
    return purifiedMarkers.slice(0, 100);
}

function generateMarkers(categoryArray) {
    var start = new Date().getMilliseconds();


    var div = document.querySelector('ul');

    div.textContent = "";
    console.log("nya kategorilängd " +categoryArray.length);
    console.log("föregående markers längd"+mashup.selectedMarkers.length);
    mashup.selectedMarkers.forEach(function (marker) {
        marker.setMap(null);
    });
    mashup.selectedMarkers = [];




    categoryArray.forEach(function (marker) {

        var markerPosition = new google.maps.LatLng(marker.latitude, marker.longitude);
        var infoWindow = new InfoWindow(marker);

       var addMarker = new google.maps.Marker({
            position: markerPosition,
            map: mashup.map,
            title: marker.title,
            icon : icons[marker.priority-1],
            infoWindow: new google.maps.InfoWindow({
                content: infoWindow.getDomString()
            })
        });


        google.maps.event.addListener(addMarker, 'click', function () {

            if (mashup.map.previousMarker) {
                mashup.map.previousMarker.infoWindow.close();
            }

            mashup.map.setZoom(10);
            mashup.map.setCenter( markerPosition);
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

    var done = new Date().getMilliseconds();
    console.log(done - start);
}

window.onload = fetchSrData();