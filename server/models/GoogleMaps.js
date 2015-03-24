'use strict';

var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
  coordinates: Object,
  location: String,
  ratioMale: Number,
  ratioFemale: Number,
  colorMale: String,
  colorFemale: String
});
