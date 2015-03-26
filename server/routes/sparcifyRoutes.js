'use strict';

var DummyProf = require('../models/DummyProf');
var GoogleMaps = require('../models/GoogleMaps');
var bodyparser = require('body-parser');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  //development use
  
  //Create dummy profile in database
  //fields needed: facebookToken, facebookID, location, coordinates in format: '{"lat": latitude, "lon": longitude}'
  app.post('/sparcify/dummyProfile', eat_auth(appSecret), function(req, res) {
    console.dir(req.body);
    var newDummy = new DummyProf(req.body);
    newDummy.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not update dummyProfile'});

      res.json(data);
    });
  });

  //Update dummy profile facebookToken (provide facebookToken in body)
  app.put('/sparcify/dummyProfile/:_id', eat_auth(appSecret), function(req, res) {
    var query = {_id: req.params._id};
    DummyProf.findOneAndUpdate(query, {facebookToken: req.body.facebookToken}, {upsert: false}, function(err, doc) {
      if (err) res.status(500).send({'msg': 'could not update dummyProfile facebookToken'});

      res.send(doc);
    });
  });

  //Create GoogleMap location in database
  //fields needed: location
  app.post('/sparcify/newlocation', eat_auth(appSecret), function(req, res) {
    console.dir(req.body);
    var newLocation = new GoogleMaps(req.body);
    newLocation.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not update dummyProfile'});

      res.json(data);
    });
  });



  //retrieve color 
  app.get('/sparcify/recs/:location/:gender', eat_auth(appSecret), function(req, res) {
    var query = {location: req.params.location}; 
    var gender = req.params.gender;
    GoogleMaps.findOne(query, function(err, data) {
      if (err || data === null) return res.status(500).send({'msg': 'could not retrieve recommendations'});

      res.json(data['color' + gender]);
    }); 
  });

  //retrieve pictures
  app.get('/sparcify/pictures/:location/:gender', eat_auth(appSecret), function(req, res) {
    var query = {location: req.params.location }; 
    var gender = req.params.gender;
    GoogleMaps.findOne(query,function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve pictures'});
      if(data === null) return res.status(500).send({'msg': 'No pictures found'});
      console.dir(data.pictures);
      res.json(data.pictures);
    }); 
  });
};
