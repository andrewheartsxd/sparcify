'use strict';

var storePics = function(passedLocation, passedGender) {

  var DummyProf = require('../models/DummyProf');
  var GoogleMaps = require('../models/GoogleMaps');
  //var _ = require('lodash');
  var tinderRecs;


  function getPics() {
    var picArray = [];
    DummyProf.findOne({location: passedLocation, gender: passedGender}, function(err, data) {
      if (err) throw err;
      
      tinderRecs = data.tinderRecs;

      for(var i = 0; i < tinderRecs.length; i++) {
        picArray.push(tinderRecs[i].photos[0].processedFiles[1].url);
      }

      console.dir(picArray);

      if (passedGender) {
        GoogleMaps.findOneAndUpdate({location: passedLocation}, {femalePictures: picArray}, {upsert: false}, function(err, doc) {
          if (err) throw err;
          console.log(doc);
        });
      } else {
        GoogleMaps.findOneAndUpdate({location: passedLocation}, {malePictures: picArray}, {upsert: false}, function(err, doc) {
          if (err) throw err;
          console.log(doc);
        });
      }
    });
  } 

  getPics();
};

module.exports = storePics;
