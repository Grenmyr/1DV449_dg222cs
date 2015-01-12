var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

// request used for url requests from eniro.
var request = require('request');

// CODE ASSORTED WITH MONGODB
// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/enirodb');
//END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
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


// Server settings
var debug = require('debug')('project');
app.set('port', process.env.PORT || 3000); // use local
//app.set('port', process.env.PORT || 80); // use when published

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


var socketIo = require('socket.io').listen(server);

// WebSocket communication with clients.
socketIo.sockets.on('connection', function (client) {
    console.log("connected");
    client.on('eniroSearch', function (search) {
        console.log("server emit eniroSearch");

        requestEniro(search,function(companySearch){
            client.emit('companySearch',companySearch);
        })
    });
    client.on('ping',function(int){
            client.emit('pong',int);
    });

    client.on('offlineData',function(bool){
        findAll(function(offlineData){
            console.log(offlineData);
            console.log("callback hit");
            client.emit('offlineData',offlineData)

        });
       /* console.log("körs sista");
        client.emit('offlineData',bool)*/
    })



});
var companyTypes = ['flyttfirma','städfirma'];
requestOfflineData = function (callback){
    //console.log(companyTypes);
        findAll(function (entireDB){
            callback(entireDB) ;
        });



   /* dbFind(function(offlineData){
            callback(offlineData);
        console.log(offlineData);
    } );*/
};

/*function dbFind(callback) {

    // Måste hämta alla companyTypes
    console.log("tried to get data");
}*/


/*  Main function to control data flow, First check database if data client request is stored
    In Mongodb with fresh timestamp, if it is, return that, if not it go through
    requestEniroData() function to require new data. That data is returned to user, and saved
    into database with fresh timestamp.
*/
var oneWeek = 604800000;
//var oneWeek = 30000;
var requestEniro = function (search,callback) {

    find(search , function (data) {
        var refreshTime = new Date().getTime()- oneWeek;
        if (data === undefined || data.length === 0 || data[0].timestamp < refreshTime) {
            console.log("fanns ingen data sparad lokalt eller gammal timestamp");
            requestEniroData(search,function (data){
                console.log(data.timestamp);
                callback(data)
            });
        }
        else {
            console.log("Gammal data fans sparad eller fräsh timestamp");
            console.log(refreshTime);
            console.log(data[0].timestamp);
            console.log("testvärde"+data[0].test);
            callback(data[0]);
        }
    });
};


// Function that communicate with Eniro API
function requestEniroData(search,callback) {

    var geo_area = '&geo_area=' + search.geo_area;
    var search_word = '&search_word=' + search.search_word;
    var searchProperties = "http://api.eniro.com/cs/search/basic?profile=davidg&key=5286734301137522208&country=se&from_list=1&to_list=100&version=1.1.3";
    var uri = searchProperties + search_word + geo_area;
    request(uri, function (err, resp, data) {
        if (err !== true && resp && resp.statusCode == 200) {
            console.log(data.length
            + " var längden på inserten från data hämtad av Eniro "
            + "i område " + search.geo_area + " och firmatypen var " + search.search_word);

            var parse = prepareData(data,search);
            console.log(parse.timestamp);
            insert(search, parse);
            callback(parse);
        }
        else{
            console.log("response ifrån eniro Validerades inte, data hämtades ej.")
        }
    });
}
var test = 0;
// Function to parse data in safe way and add timestamp.
function prepareData(data,search) {
    // remove test later;
    test ++;

    var parse = JSON.parse("{}");
    try {
        parse = JSON.parse(data);
    }
    catch (e) {
        console.log("Unexpected error when parsing Eniro Data");
    }
    parse['timestamp'] = new Date().getTime();
    console.log(search.geo_area +" geo area i prepareparse");
    parse['city'] = search.geo_area;
    parse['test'] = test;
    return parse;
}

// Functions handling CRD with mongodb using Monk.
function insert(search, data) {

    removeDocument(search);
    //db.open();
    var collection = db.get(search.search_word);
    collection.update({city : search.geo_area}, data, {upsert:true}, function (err) {
        if (err) {
            console.log(err);
            console.log("error inserting");
        }
        else {
            console.log("succes inserting");
        }
        //db.close();
    });
}
function find(search, callback) {
    //dropCollection(search);
    var collection = db.get(search.search_word);
    collection.find( { city : search.geo_area }, function (err, data) {
        if (err) {
            console.log("error when using Find");
        }
        callback(data);
        //db.close();
    });
}
function findAll(callback) {
    var collection;
    companyTypes.forEach(function (companyType) {
        collection = db.get(companyType);
        collection.find({}, function (err, data) {
            if (err) {
                console.log("error i findAll");
            }
            //console.log(data);
            data[0].search_word = companyType;
            callback(data);
        });
    });


    //console.log(allData);
}
function dropCollection(search) {
    var collection = db.get(search.search_word);
    collection.drop();
}
function removeDocument(search) {
    console.log(
        "RemoveOldDocument "+search.geo_area +
        " och collection var " + search.search_word);

    var collection = db.get(search.search_word);
    collection.remove({city : search.geo_area});
}
