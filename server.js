#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');

var request = require('request'),
    cheerio = require('cheerio');


var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var ret = [];

  request('http://www.accuweather.com/en/us/madison-wi/53706/minute-weather-forecast/331530', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('.spanwith').each(function(i, element){
        var a = $(this);
        ret.push(a.css('background-color'));
      });

      res.send(ret);
    }
  });
});

var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});