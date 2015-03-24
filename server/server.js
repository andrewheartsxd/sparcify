'use strict';

var express = require('express');
var mongoose = require('mongoose');
var sparcifyRoutes = require('./routes/sparcifyRoutes');
var passport = require('passport');
var updateTinderToken = require('./lib/updateTinderToken');
var updateRecs = require('./lib/updateRecs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/sparcify_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'bullseye');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

//app.use(express.static(__dirname + '/public'));

var sparcifyRouter = express.Router();
var userRouter = express.Router();

sparcifyRoutes(sparcifyRouter, app.get('appSecret'));
require('./routes/userRoutes')(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', sparcifyRouter);
app.use('/api/v1', userRouter);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));

 //updateTinderToken('capitol hill', true);
  updateRecs('capitol hill', true);
});
