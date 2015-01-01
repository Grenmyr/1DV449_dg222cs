var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jade = require('jade');

var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');
var app = express();

// code assorted with fetching and storing data from eniro.
var request = require('request');
// end

// CODE ASSORTED WITH MONGODB
// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/enirodb');
//END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
/*
 app.use(function (req, res, next) {
 req.db = db;
 next();
 });
 */


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// DATA SECTION
var parse = JSON.parse("{}");
try {
    console.log(parse);
    parse = JSON.parse(fs.readFileSync(__dirname + '/eniro.json'));
}
catch (e) {
    console.log(e);
    console.log("error när initiering");
}
// END DATA SECTION

var debug = require('debug')('project');
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

var socketIo = require('socket.io').listen(server);

socketIo.sockets.on('connection', function (client) {
    console.log("connected");
    //var data = requestEniro();

    //socketIo.set('index', { test: 'test set med socket' })
    //client.emit('load', {test: "testobjekt"});
    client.on('eniroSearch', function (search) {
        requestEniro(search,function(companySearch){
            client.emit('companySearch',companySearch);
        })
    });
});

var requestEniro = function (search,callback) {
    var companySearch;
    find(search , function (data) {
        var refreshTime = new Date().getTime()-100000;
        if (data.length === 0 || data[0].timestamp < refreshTime) {

            console.log("fanns ingen data sparad lokalt eller gammal timestamp");
            requestEniroData(search,function (data){
                console.log(data.timestamp);
                //companySearch = data;
                callback(data)
            });
        }
        else {
            console.log("Gammal data fans sparad eller fräsh timestamp");
            console.log(refreshTime);
            console.log(data[0].timestamp);
            var companySearch;
            companySearch = data[0];
            callback(companySearch);
            //console.log(data[0].adverts[2].location);
        }


    });


};
function requestEniroData(search,callback) {

    var geo_area = '&geo_area=' + search.geo_area;
    var search_word = '&search_word=' + search.search_word;
    var searchProperties = "http://api.eniro.com/cs/search/basic?profile=davidg&key=5286734301137522208&country=se&version=1.1.3";
    var uri = searchProperties + search_word + geo_area;

    //var uri = "http://api.eniro.com/cs/search/basic?profile=davidg&key=5286734301137522208&country=se&version=1.1.3&search_word=" + search_word + "&geo_area=kalmar";
    request(uri, function (err, resp, data) {

        if (err !== true && resp && resp.statusCode == 200) {
            console.log("saved new data");

            console.log(data.length
            + " var längden på inserten "
            + "i område " + search.geo_area + " firmatypen var " + search.search_word);

            var parse = prepareData(data);
            insert(search, parse);
            callback(parse);
        }
    });
}

function prepareData(data) {
    parse = JSON.parse(data);
    parse['timestamp'] = new Date().getTime();
    return parse;
}

function insert(search, data) {
    dropCollection(search);

    var collection = db.get(search.geo_area + search.search_word);
    collection.insert(data, function (err) {
        if (err) {
            // If it failed, return error
            console.log("error inserting");
        }
        else {
            console.log("succes inserting");
        }
    });
}
function find(search, callback) {
    var collection = db.get(search.geo_area + search.search_word);
    collection.find( {}, function (err, data) {
        callback(data);
    });
}
function dropCollection(search) {
    var collection = db.get(search.geo_area+search.search_word);
    collection.drop();
}
