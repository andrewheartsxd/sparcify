'use strict';

var DummyProf = require('../models/DummyProf');
var GoogleMaps = require('../models/GoogleMaps');
var bodyparser = require('body-parser');
var eat_auth = require('../lib/eat_auth');
var Message = require('../models/Message');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  //development use
  
  //Create dummy profile in database
  //fields needed: facebookToken, facebookID, location, coordinates in format: '{"lat": latitude, "lon": longitude}'
  app.post('/sparcify/dummyProfile', eat_auth(appSecret), function(req, res) {
    console.dir(req.body);
    if(req.user[0].admin) {
      var newDummy = new DummyProf(req.body);
      newDummy.save(function(err, data) {
        if (err) return res.status(500).send({'msg': 'could not update dummyProfile'});

        res.json(data);
      });
    } else {
      return res.status(403).send({'msg': 'forbidden'});
    }
  });

  //Update dummy profile facebookToken (provide facebookToken in body)
  app.put('/sparcify/dummyProfile/:_id', eat_auth(appSecret), function(req, res) {
    if(req.user[0].admin) {
      var query = {_id: req.params._id};
      DummyProf.findOneAndUpdate(query, {facebookToken: req.body.facebookToken}, {upsert: false}, function(err, doc) {
        if (err) res.status(500).send({'msg': 'could not update dummyProfile facebookToken'});

        res.send(doc);
      });
    } else {
      return res.status(403).send({'msg': 'forbidden'});
    }
  });

  //Create GoogleMap location in database
  //fields needed: location
  app.post('/sparcify/newlocation', eat_auth(appSecret), function(req, res) {
    console.dir(req.body);
    if(req.user[0].admin) {
      var newLocation = new GoogleMaps(req.body);
      newLocation.save(function(err, data) {
        if (err) return res.status(500).send({'msg': 'could not update dummyProfile'});

        res.json(data);
      });
    } else {
      return res.status(403).send({'msg': 'forbidden'});
    }
  });

  //public app use
  //retrieve color 
  app.get('/sparcify/color/:location/:gender', function(req, res) {
    var query = {location: req.params.location}; 
    var gender = req.params.gender;
    var genderString = JSON.parse(gender.toLowerCase()) ? 'colorFemale' : 'colorMale';
    console.log(query);
    console.log(gender);
    console.log(genderString);
    GoogleMaps.findOne(query, function(err, data) {
      if (err || data === null) return res.status(500).send({'msg': 'could not retrieve recommendations'});

      console.log(data[genderString]);
      res.json({color: data[genderString]});
    }); 
  });

  //retrieve pictures (gender set to 'true' for male, 'false' for female')
  app.get('/sparcify/pictures/:location/:gender', eat_auth(appSecret), function(req, res) {
    var query = {location: req.params.location }; 
    var gender = req.params.gender;
    var genderString = JSON.parse(gender.toLowerCase()) ? 'femalePictures' : 'malePictures';
    console.log(genderString);
    GoogleMaps.findOne(query,function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve pictures'});
      if(data === null) return res.status(500).send({'msg': 'No pictures found'});
      console.dir(data[genderString]);
      res.json({pictures: data[genderString]});
    }); 
  });

//retrieve messages
  app.get('/sparcify/messages/:location/:gender',  function(req, res) {
    var query = {location: req.params.location }; 
    var gender = req.params.gender;
    Message.find(query,{_id:0, message:1},function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve messages'});
      if(data === null) return res.status(500).send({'msg': 'No Messages found'});
      res.json(data);
    }); 
  });

  // post messages 
  app.post('/sparcify/messages/:location/:gender', function(req,res){
    var newMessage = new Message(req.body); 
    newMessage.save(function(err,data){
      if (err) return res.status(500).send({'msg': 'could not save Message'});
      res.json(data);
    });

  });

};
