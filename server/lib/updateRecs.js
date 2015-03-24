'use strict';

var updateRecs = function(passedLocation, passedGender) {
  
  var superagent = require('superagent');
  var DummyProf = require('../models/DummyProf');

  var tinderToken;
  var userAgent = 'Tinder/3.0.4 (iphone; iOS 7.1; Scale/2.00';
  var contentType = 'application/json';

  DummyProf.findOne({location: passedLocation, gender: passedGender}, function(err, data) {
    if (err) throw err;

    tinderToken = data.tinderToken;

    superagent.get('https://api.gotinder.com/user/recs')
    .set('X-Auth-Token', tinderToken)
    .set('User-Agent', userAgent)
    .set('Content-type', contentType)
    .end(function(err, res) {
      if(res.ok) {
        //res.JSON(res.body);
        console.log(res.body);
      } else {
        console.log('Oh no! Error ' + res.text);
      }
    }); 
  });
};

module.exports = updateRecs;
