'use strict';

var finalRecs = function(genderRecArray) {
  var _ = require('lodash');

  var combinedRecArray = _.flatten(genderRecArray);
  console.log('combinedRecArray length: ' + combinedRecArray.length);

  var uniqueRecArray = _.unique(combinedRecArray, '_id');
  
  console.log('uniqueRecArray length: ' + uniqueRecArray.length);

  return uniqueRecArray;

};

module.exports = finalRecs;
