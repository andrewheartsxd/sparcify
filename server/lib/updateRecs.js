'use strict';

var updateRecs = function(passedLocation, passedGender, recArray, finalRecsFunction, finalArray) {
  
  var superagent = require('superagent');
  var DummyProf = require('../models/DummyProf');

  var tinderToken;
  var userAgent = 'Tinder/3.0.4 (iphone; iOS 7.1; Scale/2.00';
  var contentType = 'application/json';
  var query = {location: passedLocation, gender: passedGender};

  DummyProf.findOne(query, function(err, data) {
    if (err) throw err;

    tinderToken = data.tinderToken;

    console.log('tinderToken: ' + tinderToken);

    superagent.get('https://api.gotinder.com/user/recs')
    .set('X-Auth-Token', tinderToken)
    .set('User-Agent', userAgent)
    .set('Content-type', contentType)
    .end(function(err, res) {
      if(res.ok) {

        //console.log(res.body.results);
        console.log('length: ' + res.body.results.length);
        recArray.push(res.body.results);
        console.log('recArray: ');
        console.log(recArray);
      
      } else {

        console.log('Oh no! Error ' + res.text);
      }

      finalArray = finalRecsFunction(recArray);
      console.log('finalArray: ');
      console.dir(finalArray);
      console.log('finalArray: ' + finalArray.length);

      DummyProf.findOneAndUpdate(query, {tinderRecs: finalArray}, {upsert: false}, function(err, doc) {
        if (err) throw err;
        console.log(doc);
      }); 
    });
  });
};

module.exports = updateRecs;
