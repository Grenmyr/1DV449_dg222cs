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
    var $;
    

    request(url, function(error,response,html){
        if(!error){
            $ = cheerio.load(html)

            $('.padder').filter(function(){

                var data = $(this);
                console.log(data);
            });
            console.log($());
        }
    });
    res.send($);
});

module.exports = router;

