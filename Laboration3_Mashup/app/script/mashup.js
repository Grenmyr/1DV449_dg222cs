/**
 * Created by dav on 2014-12-01.
 */


var mashup = {
    map: {
        object: {},
        mapOptions:{
            center: {lat: 56.697, lng: 16.354},
            zoom: 11
        }
    },
    markers:[]


};
function init () {
    function initialize() {
        mashup.map = new google.maps.Map(document.getElementById('map-canvas'), mashup.map.mapOptions);
        }
        google.maps.event.addDomListener(window, 'load', initialize);

    console.log(mashup.map);

    var response = jQuery.get("/test", function (data, textStatus, jqXHR) {

        console.dir(data);
        //console.log(testStatus);
        //console.log(jqXHR);
    });

    //console.log(response);
}

window.onload = init();