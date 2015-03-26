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
    var newDummy = new DummyProf(req.body);
    newDummy.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not update dummyProfile'});

      res.json(data);
    });
  });

  //Update dummy profile facebookToken
  app.put('/sparcify/dummyProfile/:_id', eat_auth(appSecret), function(req, res) {
    var query = {_id: req.params._id};
    DummyProf.findOneAndUpdate(query, {facebookToken: req.body.facebookToken}, {upsert: false}, function(err, doc) {
      if (err) res.status(500).send({'msg': 'could not update dummyProfile facebookToken'});

      res.send(doc);
    });
  });
//eat_auth(appSecret),
  //retrieve recommendations
  app.get('/sparcify/recs/:location/:gender',eat_auth(appSecret),  function(req, res) {
    var query = {location: req.params.location}; 
    var gender = req.params.gender;
    console.dir(GoogleMaps);
    GoogleMaps.findOne(query, function(err, data) {
      if (err || data === null) return res.status(500).send({'msg': 'could not retrieve recommendations'});

      res.json(data['color' + gender]);
    }); 
  });

  //retrieve pictures
  app.get('/sparcify/pictures/:location/:gender', eat_auth(appSecret), function(req, res) {
    var query = {location: req.params.location }; 
    var gender = req.params.gender;
    console.log(query);
    GoogleMaps.findOne(query,function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve recommendations'});
      if(data === null) return res.status(500).send({'msg': 'No Recommendations found'});
      console.dir(data.pictures);
      res.json(data.pictures);
    }); 
  });


//retrieve messages
  app.get('/sparcify/messages/:location/:gender',  function(req, res) {
    var query = {location: req.params.location }; 
    var gender = req.params.gender;
    console.log(query);
    Message.find(query,{_id:0, message:1},function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve messages'});
      if(data == null) return res.status(500).send({'msg': 'No Messages found'});
      console.log("mesages get req"+data);
      res.json(data);

    }); 
  });

  // post messages 
  app.post('/sparcify/messages/:location/:gender', function(req,res){
    var newMessage = new Message(req.body); 
    newMessage.save(function(err,data){
      console.log('server msg - '+ data.message );
      if (err) return res.status(500).send({'msg': 'could not save Message'});
        console.log('Message 123'+ data.message)
        res.json(data);

  });

});
};
