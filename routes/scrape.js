/**
 * Created by dav on 2014-11-05.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET users listing. */
router.get('/', function(req, res) {
    var url='http://coursepress.lnu.se/kurser/?bpage=1';

            request(url, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);

                    var breakUrl = url.split("?");
                    url = breakUrl[0];

                    var newUrl = $('#pag-top .next');

                    newUrl = newUrl.attr('href');


                    if (newUrl !== undefined) {
                        newUrl = newUrl.replace('/kurser/', '');
                        url = url + newUrl;
                        console.log(url);
                    }

                    $('.item-title a').filter(function () {
                        var data = $(this);
                        var courseNames = data.html();
                        var courseLinks = data.attr('href');

                    });

                    if (newUrl !== undefined) {
                        console.log("Anropa metoden för läsa.");
                    }
                }
            });


    res.send();
});





module.exports = router;

