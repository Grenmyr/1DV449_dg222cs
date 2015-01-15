/**
 * Created by dav on 2014-12-11.
 */

// script just start application.

var settings = {
    //socket: io.connect('http://localhost:3000')/*io.connect('188.166.30.34')*/,
    html: {
        start: document.querySelector('#start'),
        content: document.querySelector('.content')
    }
};
function init() {
    settings.html.content.style.visibility = "visible";
    new Mashup(settings.socket);
}


window.onload = init();


