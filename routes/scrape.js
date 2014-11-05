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

          scrape(url);

    res.send();
});

function scrape (url){
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            $('.item-title a').filter(function () {
                var data = $(this);
                var courseNames = data.html();
                var courseLinks = data.attr('href');
                console.log(courseLinks);
            });

            var newUrl = $('#pag-top .next');
            newUrl = newUrl.attr('href');
            scrapeOn(newUrl)
        }
    });
}

function scrapeOn (url){
    console.log(url);
    var homeURL = 'http://coursepress.lnu.se';

    if (url !== undefined) {
        var newUrl = homeURL + url;
        console.log(newUrl);
        scrape(newUrl);
    }
}


module.exports = router;

