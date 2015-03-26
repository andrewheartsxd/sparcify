'use strict';

var updateTinderToken = function(passedLocation, passedGender) {

  var superagent = require('superagent');
  var DummyProf = require('../models/DummyProf');

  var facebookToken;
  var facebookID;
  var userAgent = 'Tinder/3.0.4 (iphone; iOS 7.1; Scale/2.00';
  var contentType = 'application/json';
    
  DummyProf.findOne({location: passedLocation, gender: passedGender}, function(err, data) {
    if (err) throw err;

    //console.dir(data.facebookToken);
    facebookToken = data.facebookToken;
    facebookID = data.facebookID;

    superagent.post('https://api.gotinder.com/auth')
    .send({facebook_token: facebookToken, facebook_id: facebookID})
    .set('User-Agent', userAgent) 
    .set('Content-type', contentType)
    .end(function(err, res) {
      console.log(res.ok);
      if(res.ok) {
        var query = {location: passedLocation}; 
        DummyProf.findOneAndUpdate(query, {tinderToken: res.body.token}, {upsert: false}, function(err, doc) {
          if (err) res.status(500).send({msg: 'could not update tinderToken'});
          
          console.dir(res.body);
        });
      } else {
        console.log('Oh no! Error ' + res.text);
      }
    });
  });
};

module.exports = updateTinderToken;

