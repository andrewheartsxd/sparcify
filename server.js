'use strict';

var express = require('express');
var mongoose = require('mongoose');
var sparcifyRoutes = require('./server/routes/sparcifyRoutes');
var passport = require('passport');
var updateTinderToken = require('./server/lib/updateTinderToken');
var updateLoc = require('./server/lib/updateLoc');
var updateRecs = require('./server/lib/updateRecs');
var calculateRatio = require('./server/lib/calculateRatio');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/sparcify_development');

var app = express();
app.use(express.static(__dirname+"/build"));

app.set('appSecret', process.env.SECRET || 'bullseye');
app.use(passport.initialize());
require('./server/lib/passport_strat')(passport);


//app.use(express.static(__dirname + '/public'));

var sparcifyRouter = express.Router();
var userRouter = express.Router();

sparcifyRoutes(sparcifyRouter, app.get('appSecret'));
require('./server/routes/userRoutes')(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', sparcifyRouter);
app.use('/api/v1', userRouter);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));

 //Updates capitol hill male tinder recommendations
 //updateTinderToken('capitol hill', true);
 //updateLoc('capitol hill', true);
 //updateRecs('capitol hill', true);

 //Updates capitol hill female tinder recommendations
 //updateTinderToken('capitol hill', false);
 //updateLoc('capitol hill', false);
 //updateRecs('capitol hill', false);

 //Calculates ratio and saves to database
 //calculateRatio('capitol hill', true, false);
 
});
