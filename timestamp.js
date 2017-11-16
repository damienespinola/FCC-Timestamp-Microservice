/*

  Usage: www.example.com/December 15, 2015
         www.example.com/1450137600

  Description: This project parses a parameter passed to the end of the url that contains either
    a Unix timestamp or natural language date. It will return the unix timestamp and natural 
    language form of date (using UTC) in JSON. It will return null parameters for invalid input.
    
  Notes: This project was done as a freeCodeCamp challange.
    (https://www.freecodecamp.org/challenges/timestamp-microservice)

  Future: Could reimplement this using moment.js.
  
  Author: Damien Espinola
  Date Created: Nov 11, 2017
  Date Modified:
*/
  
var express = require('express');
const { URL } = require('url');
//var moment = require('moment');

var app = express();

app.get ('/:thedate', function(req, res){
  var theDate;
  var retObj = {};
  var dateInt = parseInt(req.params.thedate);
  var unixTimeParsed = false;

  if(Number.isNaN(dateInt)){
    theDate = new Date(req.params.thedate);
  } else {
    theDate = new Date(dateInt * 1000);
    unixTimeParsed = true;
  }

  var validDate = !Number.isNaN(theDate.valueOf());

  var monthStr;
  if (validDate){
    switch (theDate.getUTCMonth()){
      case 0:
        monthStr = 'January';
        break;
      case 1:
        monthStr = 'February';
        break;
      case 2:
        monthStr = 'March';
        break;
      case 3:
        monthStr = 'April';
        break;
      case 4:
        monthStr = 'May';
        break;
      case 5:
        monthStr = 'June';
        break;
      case 6:
        monthStr = 'July';
        break;
      case 7:
        monthStr = 'August';
        break;
      case 8:
        monthStr = 'September';
        break;
      case 9:
        monthStr = 'October';
        break;
      case 10:
        monthStr = 'November';
        break;
      case 11:
        monthStr = 'December';
        break;
    }
  }

  /*The second ternary expression corrects the unix timestamp to UTC when 
    natural language is parsed.*/
  retObj.unix = validDate ? theDate.valueOf() / 1000 - 
    (unixTimeParsed ? 0 : theDate.getTimezoneOffset() * 60) : 
    null;
  retObj.natural = validDate ? `${monthStr} ${theDate.getUTCDate()}, ${theDate.getUTCFullYear()}` : null;
  
  res.send(retObj);




});
app.listen(12345);
