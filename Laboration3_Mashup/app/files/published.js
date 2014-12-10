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
    selectedMarkers : [],
    oneHundred : 100
};


function fetchSrData() {
    var socket = io.connect('http://178.62.83.186');

    socket.on('load', function (srJson) {

        console.log("server push");
        mashup['markersDefault'] = [];
        mashup['newMarkers'] = [];
        mashup['markersValue0'] = [];
        mashup['markersValue1'] = [];
        mashup['markersValue2'] = [];
        mashup['markersValue3'] = [];

        var cleanedFullJson = cleanJsonObj(srJson);
        cleanedFullJson = filterUnique(cleanedFullJson);
        for (var i = 0; i < mashup.oneHundred; i++) {
            mashup.markersDefault.push(cleanedFullJson[i]);

            switch (cleanedFullJson[i]['category']) {
                case 0 :
                    mashup.markersValue0.push(cleanedFullJson[i]);
                    break;
                case 1 :
                    mashup.markersValue1.push(cleanedFullJson[i]);
                    break;
                case 2 :
                    mashup.markersValue2.push(cleanedFullJson[i]);
                    break;
                case 3 :
                    mashup.markersValue3.push(cleanedFullJson[i]);
                    break;
                default :
                    console.log("pannkaka");
                    break;
            }
        }

        if(mashup.firstLoad) {
            //console.log("pushed new data from server");
            generateMarkers(mashup.markersDefault);
            mashup.firstLoad = false;
        }

    });

    function initializeMap() {
        //console.log("initializeMap körs");
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
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mashup.map);

    }
    google.maps.event.addDomListener(window, 'load', initializeMap);


}
function filterUnique (messages){
    var tempObj = {};
    return messages.filter(function(value){
        return tempObj.hasOwnProperty(value.id) ? false : (tempObj[value.id] = true);
    })
}

function cleanJsonObj(data) {

    data['messages'].forEach(function(message) {
        message.createddate = parseInt(message.createddate.replace("/Date(", "").replace(")/", ""), 10);
    });
        data['messages'].sort(function(a, b){return b.createddate- a.createddate});

    var purifiedMarkers = data['messages'].map(function (message) {

        return {
            latitude: message.latitude,
            longitude: message.longitude,
            title: message.title,
            description: message.description,
            createddate: message.createddate,
            category: message.category,
            subcategory: message.subcategory,
            priority : message.priority,
            id : message.id
        };

    });
    //purifiedMarkers.reverse();
    return purifiedMarkers;
}

function generateMarkers(categoryArray) {
    //var start = new Date().getMilliseconds();

    var ul = document.querySelector('ul');
    ul.textContent = "";
    //console.log("nya kategorilängd " +categoryArray.length);
    //console.log("föregående markers längd"+mashup.selectedMarkers.length);

    mashup.selectedMarkers.forEach(function (marker) {
        marker.setMap(null);
    });
    mashup.selectedMarkers = [];
    categoryArray.forEach(function (marker,i) {

        var markerPosition = new google.maps.LatLng(marker.latitude, marker.longitude);
        var infoWindow = new InfoWindow(marker);

       var addMarker = new google.maps.Marker({
            position: markerPosition,
            map: mashup.map,
            title: marker.title ,
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
        list.setAttribute('id',i);
        list.textContent = addMarker.title;

        ul.appendChild(list);

        mashup.selectedMarkers.push(addMarker);
    });

    createUlEvent(ul);

    //var done = new Date().getMilliseconds();
    //console.log(done - start);
}
function createUlEvent (ul){
    google.maps.event.addDomListener(ul, "click", function (e) {
        e.preventDefault();
        if (e.target.nodeName === 'LI') {
        google.maps.event.trigger(mashup.selectedMarkers[e.target.id ], "click");
        }
    });
}

window.onload = fetchSrData();
