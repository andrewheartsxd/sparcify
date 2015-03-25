'use strict';

var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
  coordinates: Object,
  location: String,
  pictures: Array,
  ratioMale: Number,
  ratioFemale: Number,
  colorMale: String,
  colorFemale: String
});
