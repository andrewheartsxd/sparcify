'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  location: String, 
  message: String
});


module.exports = mongoose.model('message', messageSchema);