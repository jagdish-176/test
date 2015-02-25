var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');

var download = function (url, callback) {
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            callback(null,body);
        });
    }).on('error', function(e) {
        callback(e);
    });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    download('http://azure.microsoft.com/en-us/', function (err, body) {
        if(err)
            return res.send(err);

        var $ = cheerio.load(body);
        var $body = $('body');
        var $add = $body.find('.wa-carousel');
        $add.siblings().remove();
        $add.parentsUntil('body').siblings().remove();
        res.send($.html());
    });
});



module.exports = router;
