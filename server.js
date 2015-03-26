'use strict';

var express = require('express');
var mongoose = require('mongoose');
var sparcifyRoutes = require('./server/routes/sparcifyRoutes');
var passport = require('passport');
var updateTinderToken = require('./server/lib/updateTinderToken');
var updateLoc = require('./server/lib/updateLoc');
var updateRecs = require('./server/lib/updateRecs');
var calculateRatio = require('./server/lib/calculateRatio');
var finalRecs = require('./server/lib/finalRecs');
var storePics = require('./server/lib/storePics');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/sparcify_development');

var app = express();
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

  var femaleRecArray = [];
  var finalFemaleRecArray = [];
  var maleRecArray = [];
  var finalMaleRecArray = [];

  var updateRecsTimeoutFunction1 = function() { updateRecs('capitolhill', true, femaleRecArray, finalRecs, finalFemaleRecArray);};
  var updateRecsTimeoutFunction2 = function() { updateRecs('capitolhill', true, femaleRecArray, finalRecs, finalFemaleRecArray);};

  var updateRecsTimeoutFunction3 = function() { updateRecs('capitolhill', false, maleRecArray, finalRecs, finalMaleRecArray);};
  var updateRecsTimeoutFunction4 = function() { updateRecs('capitolhill', false, maleRecArray, finalRecs, finalMaleRecArray);};

  //Updates capitol hill male tinder token & location 
  // updateTinderToken('capitolhill', true);
  // updateLoc('capitolhill', true);
  // Updates capitol hill female tinder token & location 
  //updateTinderToken('capitolhill', false);
  //updateLoc('capitolhill', false);


  //Runs tinder recommendation pulls for capitol hill, defined above
  //for (var i = 0; i < 4; i++) {
  //  setTimeout(updateRecsTimeoutFunction1, 10000*i);
  //  setTimeout(updateRecsTimeoutFunction2, 20000*i);
  //  setTimeout(updateRecsTimeoutFunction3, 30000*i);
  //  setTimeout(updateRecsTimeoutFunction4, 40000*i);
  //}

 //Calculates ratio and saves to database
 //calculateRatio('capitolhill', true, false);

 //Stores pictures to database
 //storePics('capitolhill', true);
 //storePics('capitolhill', false);
 
});




