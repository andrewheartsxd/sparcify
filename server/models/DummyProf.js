'use strict';

var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
  facebookToken: String,
  facebookID: Number,
  tinderToken: String,
  location: String,
  coordinates: Object,
  gender: {type: Boolean, default: true},
  preference: {type: Boolean, default: false},
  tinderRecs: Object  
});

module.exports = mongoose.model('profile', profileSchema);
