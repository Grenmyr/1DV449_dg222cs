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

        requestEniro(search)
    });
});

var requestEniro = function (search) {
    var geo_area = '&geo_area='+ search.geo_area;

    var search_word = '&search_word='+ search.search_word;
    console.log("area "+search.geo_area);
    console.log("firmatyp "+search.search_word);
    var searchProperties ="http://api.eniro.com/cs/search/basic?profile=davidg&key=5286734301137522208&country=se&version=1.1.3";
    var uri = searchProperties+search_word+geo_area;
    console.log(uri);
    //var uri = "http://api.eniro.com/cs/search/basic?profile=davidg&key=5286734301137522208&country=se&version=1.1.3&search_word="+search_word+"&geo_area=kalmar";
    //console.log(search);
    request(uri, function (err, resp, data) {

        if (err !== true && resp && resp.statusCode == 200) {
            console.log(data);
            var jsonData = JSON.stringify(data,null,4);
            console.log(jsonData);
            if (parse !== jsonData) {
                try {
                    console.log("saved new data");
                    console.log(data.length + " var längden på inserten server.js");
                    parse = jsonData;
                    socketIo.sockets.emit('load', jsonData);
                    fs.writeFile('eniro.json', data, function (err) {
                        if (err) throw err;
                    });
                }
                catch (e) {
                    fs.writeFile('eniro.json', "{}");
                }

            }
            else {
                parse = JSON.parse("{}");
                console.log("no new data")
            }

        }
    });
};
