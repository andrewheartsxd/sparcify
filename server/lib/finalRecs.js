'use strict';

var finalRecs = function(genderRecArray) {
  var _ = require('lodash');

  var combinedRecArray = _.flatten(genderRecArray);
  console.log(combinedRecArray);

  var uniqueRecArray = _.unique(combinedRecArray, '_id');
  console.log(uniqueRecArray);

  return uniqueRecArray;

};

module.exports = finalRecs;
