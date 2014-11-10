/**
 * Created by dav on 2014-11-05.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


/* GET users listing. */
router.get('/', function(req, res) {
    var url = 'http://coursepress.lnu.se/kurser';

    fs.readFile('scrapeResult.json',function(err,data){
        console.log(data);
        if(data === undefined) { scrape(url);  return }
        var parse = JSON.parse(data);
        res.send(parse);
        var date = new Date().getTime();
        if(date -parse.lastScrapeTime > 30000){
            console.log("scrapade om");
            scrape(url);
        }
    });

});
var Json = {};
Json.courses = [];
var hrefCount = 0;
function scrape (url){

    request(url, function (error, response, html) {

        if (!error) {
            var $= cheerio.load(html);

            $('.item-title a').filter(function () {
                var data = $(this);

                var courseLinks = data.attr('href');
                if(courseLinks.match(/\/kurs/)) { scrapeCourseLink(courseLinks);}

                function scrapeCourseLink(url) {
                    hrefCount +=1;
                request(url, {headers: { 'User-Agent': 'David Grenmyr' }},
                    function (error, response, html) {
                    if (!error) {
                        $ = cheerio.load(html);
                        var courseName = $('#header-wrapper h1 a').text();
                        courseName = checkInformation(courseName);

                        Json[courseName] = {};
                        Json.courses.push(Json[courseName]);
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

                        // lastPost header
                        var lastPostHeader = $('.entry-header .entry-title').first().text();
                        lastPostHeader = checkInformation(lastPostHeader);

                        // lastPost author
                        var author = $('.entry-header .entry-byline strong').first().text();
                        author = checkInformation(author);

                        // lastPost byline/text
                        var date = $('.entry-header .entry-byline').first().text();
                        var match = date.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/);
                        if(match === null) {
                            match = checkInformation(match);
                        }
                        // Populate my Coursname object with 3 lastPost data above.
                        Json[courseName].latestPost = {
                            date : match[0],
                            headerTitle : lastPostHeader,
                            author : author
                        };
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

    var homeURL = 'http://coursepress.lnu.se';

    if (url !== undefined) {
        url = homeURL + url;
        scrape(url);
    }
    else{

        var myIntervall = setInterval(writeFile,1000);

        function writeFile() {
            if(hrefCount !== Json.courses.length) { return }
            Json.scrapedCourses = Json.courses.length;
            Json.lastScrapeTime = new Date().getTime();
            fs.writeFile('scrapeResult.json', JSON.stringify(Json, null, 4), function (err) {
                if (err) {
                    console.log("whoops fel vid sparande av Json fil.");
                }
                console.log(Json);
                console.log('Success save file to disc');

            });
            clearInterval(myIntervall);
        }


    }
}

function checkInformation (string){
    if (string === '' | string === null) { return string = 'no information'; }
    return string;
}



module.exports = router;

