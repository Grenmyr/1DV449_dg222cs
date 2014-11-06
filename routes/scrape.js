/**
 * Created by dav on 2014-11-05.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET users listing. */
router.get('/', function(req, res) {

    var url='http://coursepress.lnu.se/kurser';


    scrape(url);

    res.send();
});
var Json = {};
function scrape (url){


    request(url, function (error, response, html) {

        if (!error) {
            var $= cheerio.load(html);

            $('.item-title a').filter(function () {
                var data = $(this);

                var courseLinks = data.attr('href');
                scrapeCourseLink(courseLinks);

                function scrapeCourseLink(url) {
                request(url, function (error, response, html) {
                    if (!error) {
                        $ = cheerio.load(html);

                        var courseName = $('#header-wrapper h1 a').text();
                        if (courseName === '') {
                            courseName = 'no information'
                        }

                        Json[courseName] = {};
                        Json[courseName].courseName = courseName;

                        var courseCode = $('#header-wrapper ul li ').last().text();
                        Json[courseName].courseCode = courseCode;

                        Json[courseName].url = url;

                        var node = $('#navigation .sub-menu li a').filter(function(){
                            var data = $(this);
                            if(data.text().match('Kursplan')){
                                var coursePlan = data.attr('href');
                                Json[courseName].coursePlan = coursePlan;
                            }

                        });

                        var courseDescription = $('.entry-content p').text();
                        if (courseDescription === '') {
                            courseDescription = 'no information'
                        }
                        Json[courseName].courseDescription = courseDescription;
                        console.log(Json)

                        //TODO härefter föööta inlägget med ttel föfattare och klockslag.
                    }
                });
            }
            });

        var newUrl = $('#pag-top .next');
        newUrl = newUrl.attr('href');
        scrapeOn(newUrl)
    }
});
}

function scrapeOn (url){
    //console.log(url);
    var homeURL = 'http://coursepress.lnu.se';

    if (url !== undefined) {
        url = homeURL + url;
        //console.log(url);
        scrape(url);
    }
}



module.exports = router;

