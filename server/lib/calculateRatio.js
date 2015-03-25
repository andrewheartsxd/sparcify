'use strict';

var calculateRatio = function(passedLocation, male, female) {

  var DummyProf = require('../models/DummyProf');
  var GoogleMaps = require('../models/GoogleMaps');
  var tinderRecsWomen;
  var tinderRecsMen;
  var ratioFemale;
  var ratioMale;
  var ratioFemaleColor;
  var ratioMaleColor;

  DummyProf.findOne({location: passedLocation, gender: male}, function(err, data) {
    if (err) throw err;

    tinderRecsWomen = data.tinderRecs.length;
  });

  DummyProf.findOne({location: passedLocation, gender: female}, function(err, data) {
    if (err) throw err;

    tinderRecsMen = data.tinderRecs.length;
  });

  ratioFemale = tinderRecsWomen / (tinderRecsWomen + tinderRecsMen);
  ratioMale = 1 - ratioFemale;

  if(ratioFemale >= 0.6) ratioFemaleColor = '#DB2929'; //brown madder
  if(ratioFemale >= 0.4 && ratioFemale < 0.6) ratioFemaleColor = '#ECC3BF'; //piglet snout
  if(ratioFemale >= 0.25 && ratioFemale < 0.4) ratioFemaleColor = '#499DF5'; //blue bucket
  if(ratioFemale >= 0 && ratioFemale < 0.25) ratioFemaleColor = '#26466D'; //blue spider
  
  if(ratioMale >= 0.6) ratioMaleColor = '#DB2929';
  if(ratioMale >= 0.4 && ratioMale < 0.6) ratioMaleColor = '#ECC3BF';
  if(ratioMale >= 0.25 && ratioMale < 0.4) ratioMaleColor = '#499DF5';
  if(ratioMale >= 0 && ratioMale < 0.25) ratioMaleColor = '#26466D';

  var query = {location: passedLocation}; 
  GoogleMaps.findOneAndUpdate(query, {ratioFemale: ratioFemale, colorFemale: ratioFemaleColor, ratioMale: ratioMale, colorMale: ratioMaleColor}, {upsert: false}, function(err, doc) {
    if (err) throw err; 

    console.log(doc);
  });
};

module.exports = calculateRatio;
