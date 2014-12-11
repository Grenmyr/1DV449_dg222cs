/**
 * Created by dav on 2014-12-11.
 */
    function init(){
    var socket = io.connect('http://localhost');
    socket.on('load', function (data) {
        console.log("connect");
        console.log(data);
    });
}
window.onload = init();