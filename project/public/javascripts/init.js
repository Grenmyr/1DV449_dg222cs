/**
 * Created by dav on 2014-12-11.
 */


var settings = {
    socket: io.connect('http://localhost:3000'),
    html : {
        start : document.querySelector('#start'),
        content : document.querySelector('.content')
    }
};
function init() {
    waitForUserClick();
}


function waitForUserClick (){
    settings.html.start.addEventListener('click', function (e) {
        settings.html.content.style.visibility = "visible";
        settings.html.start.remove();
        new Mashup(settings.socket);
    });
}

window.onload = init();


