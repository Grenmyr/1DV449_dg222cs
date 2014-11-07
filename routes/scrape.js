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
                        courseName = checkInformation(courseName);

                        Json[courseName] = {};
                        Json[courseName].courseName = courseName;

                        var courseCode = $('#header-wrapper ul li ').last().text();
                        Json[courseName].courseCode = courseCode;

                        Json[courseName].url = url;

                        $('#navigation .sub-menu li a').filter(function(){
                            var data = $(this);
                            if(data.text().match('Kursplan')){
                                var coursePlan = data.attr('href');
                                Json[courseName].coursePlan = coursePlan;
                            }

                        });
                        var courseDescription = $('.entry-content').text();
                         courseDescription = checkInformation(courseDescription);

                        Json[courseName].courseDescription = courseDescription;


                        var lastPostHeader = $('.entry-header .entry-title').first().text();
                        Json[courseName].latestPost={};
                        lastPostHeader = checkInformation(lastPostHeader);
                        Json[courseName].latestPost = {headerTitle : lastPostHeader};

                        var author = $('.entry-header .entry-byline strong').first().text();
                        author = checkInformation(author);
                        Json[courseName].latestPost = {author : author };

                        var date = $('.entry-header .entry-byline').first().text();

                        var match = date.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/);
                        if(match !== null) {
                            Json[courseName].latestPost = {date : match[0] };
                        }
                  
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

function checkInformation (string){
    if (string === '') { return string = 'no information'; }
    return string;
}



module.exports = router;

