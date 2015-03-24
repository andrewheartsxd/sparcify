'use strict';

var DummyProf = require('../models/DummyProf');
var bodyparser = require('body-parser');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  //development use
  //fields needed: facebookToken, facebookID, location
  app.post('/sparcify/dummyProfile', eat_auth(appSecret), function(req, res) {
    console.dir(req.body);
    var newDummy = new DummyProf(req.body);
    newDummy.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not update dummyProfile'});

      res.json(data);
    });
  });

  app.put('/sparcify/dummyProfile/:_id', eat_auth(appSecret), function(req, res) {
    var query = {_id: req.params._id};
    DummyProf.findOneAndUpdate(query, {facebookToken: req.body.facebookToken}, {upsert: false}, function(err, doc) {
      if (err) res.status(500).send({'msg': 'could not update dummyProfile facebookToken'});

      res.send(doc);
    });
  });

  //retrieve recommendations 
  app.get('/sparcify/recs/:location', eat_auth(appSecret), function(req, res) {
    DummyProf.findOne({location: req.params.location}, function(err, data) {
      if (err || data === null) return res.status(500).send({'msg': 'could not retrieve recommendations'});

      res.json(data.tinderRecs);
    }); 
  });





};
