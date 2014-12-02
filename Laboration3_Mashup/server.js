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
var socketIo = require('socket.io');

var fs = require('fs');

var app = express();




var env = process.env.NODE_ENV ||  'developement';


if('developement' == env){
    app.use('/',express.static(path.join(__dirname,'app')));
    app.use(logger('dev'));
    app.use(bodyParser());
    app.use(errorHandler({dumpExceptions:true,showStack:true}));

    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'sr')));
}



//connectionSetup
var ip = process.env.OPENSHIFT_NODE_IP || "127.0.0.1";
var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8000;

app.set('ip',ip);
app.set('port',port);

var server = app.listen(port,ip,function(){
    console.log("express listening on port:" +port,app.settings.env);

});

/*app.get('/test', function (req, res) {

    res.sendfile('/app/index.html');
});*/

app.get('/sr', function (req, res) {

   //res.send(JSON.parse(fs.readFileSync(__dirname+'/sr.json')));
    var uri = "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=10000";

    request(uri,function(err,resp,data){

        if(err !== true && resp.statusCode == 200) {


            fs.writeFile('sr.json', data, function (err) {
                //if (err) return console.log(err);
                if (err) throw err;


                res.send(JSON.parse(data));

            });
        }
    });


});

/*socketIo.sockets.on('connection',function(client){

});*/


