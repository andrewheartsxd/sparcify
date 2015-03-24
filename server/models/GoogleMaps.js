'use strict';

var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
  coordinates: Object,
  location: String,
  ratio: Number,
  color: String
});
