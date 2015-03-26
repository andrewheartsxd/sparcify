'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User');
var fs = require('fs');

module.exports = function(app, passport, appSecret) {
  app.use(bodyparser.json());

  app.post('/sparcify/create_user', function(req, res) {
    var newUser = new User();

    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password);
    newUser.username = req.body.username;
    newUser.gender = req.body.gender;
    newUser.preference = req.body.preference;

    newUser.save(function(err, user) {
      if (err) return res.status(500).send({msg: 'could not create user'});

      user.generateToken(appSecret, function(err, token) {
        if (err) return res.status(500).send({msg: 'could not generate token'});
        res.json({eat: token});
      });
    });
  });

  app.get('/sparcify/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(appSecret, function(err, token) {
      if (err) return res.status(500).send({msg: 'could not generate token'});
      res.json({eat: token});
    });
  });
};
