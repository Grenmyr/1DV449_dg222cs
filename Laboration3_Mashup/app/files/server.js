/**
 * Created by dav on 2014-12-01.
 */



// require section
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var debug = require('debug');
var errorHandler = require('errorhandler');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var request = require('request');


var fs = require('fs');

var app = express();


var env = process.env.NODE_ENV || 'developement';


if ('developement' == env) {
    app.use('/', express.static(path.join(__dirname, 'app')));
    app.use(logger('dev'));
    app.use(bodyParser());
    app.use(errorHandler({dumpExceptions: true, showStack: true}));

    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'sr')));
}


//connectionSetup
var ip = "0.0.0.0";
var port = 80;

app.set('ip', ip);
app.set('port', port);

var server = app.listen(port, ip, function () {
    console.log("express listening on port:" + port, app.settings.env);

});
var socketIo = require('socket.io').listen(server);


/*app.get('/test', function (req, res) {

 res.sendfile('/app/index.html');
 });*/


var parse = JSON.parse("{}");
try {
    parse = JSON.parse(fs.readFileSync(__dirname + '/sr.json'));
}
catch (e) {
    console.log("error när initiering");
}

var count = 0;
var update = function () {
    count++;
    console.log(count);
    var uri = "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=10000";
    //var uri = "http://expressen.se";
    request(uri, function (err, resp, data) {

        if (err !== true && resp  && resp.statusCode == 200) {
            var jsonData = JSON.parse(data);
            if (JSON.stringify(parse) !== JSON.stringify(jsonData)) {

                try {
                    console.log("saved new data");
                    console.log(data.length + " var längden på inserten server.js");
                    parse = jsonData;
                    socketIo.sockets.emit('load', jsonData);
                    fs.writeFile('sr.json', data, function (err) {
                        //if (err) return console.log(err);
                        if (err) throw err;
                    });
                }
                catch (e) {
                    fs.writeFile('sr.json', "{}");
                }

            }
            else {
                console.log("no new data")
            }

        }
    });
};
update();
setInterval(update, 20000);


socketIo.sockets.on('connection', function (client) {
    console.log("start");
    client.emit('load', parse);
});






