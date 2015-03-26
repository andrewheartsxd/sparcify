'use strict';

var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
  coordinates: Object,
  location: String,
  malePictures: Array,
  femalePictures: Array,

  ratioMale: Number,
  ratioFemale: Number,
  colorMale: String,
  colorFemale: String, 
  messages:Array
});

module.exports = mongoose.model('location', mapSchema);
