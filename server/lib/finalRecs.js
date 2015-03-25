'use strict';

var finalRecs = function(genderRecArray) {
  var _ = require('lodash');

  var combinedRecArray = _.flatten(genderRecArray);
  console.log('combinedRecArray: ' + combinedRecArray);

  var uniqueRecArray = _.unique(combinedRecArray, '_id');
  
  console.log('uniqueRecArray: ' + uniqueRecArray);

  return uniqueRecArray;

};

module.exports = finalRecs;
