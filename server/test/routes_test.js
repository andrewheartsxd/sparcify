'use strict';

process.env.MONGO_URI = 'mongodb://localhost/sparcify_development_test';
require('../../server.js');
var DummyProf = require('../models/DummyProf');
var GoogleMaps = require('../models/GoogleMaps');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('The Sparcify App', function() {
  var token;  
  before(function(done) {
    chai.request('localhost:3000/api/v1/sparcify')
      .post('/create_user')
      .send({email: 'testing@example.com', password: 'foobar123', username: 'testUser'})
      .end(function(err, res) {
        if (err) throw err;
        token = res.body.eat;
        //console.log('token: ' + token);
        done();
      });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should post a dummy profile', function(done) {
    chai.request('localhost:3000/api/v1/sparcify')
        .post('/dummyProfile')
        .send({eat: token, facebookToken: 't1ralalala34', facebookID: 12345, location: 'capitolhill', tinderRecs: [{photos: [{processedFiles: [{url: 'url1'}, {url: 'url2'}]}]}]})
        .end(function(err, res) {
          if (err) throw err;
          //console.log('dummyProfile posted: ' + res.text);  
          done();
        });
  });
    
  it('should post a location', function(done) {
    chai.request('localhost:3000/api/v1/sparcify')
      .post('/newlocation')
      .send({eat: token, location: 'capitolhill', malePictures: ['url1', 'url2'], femalePictures: ['url1', 'url2'], ratioMale: 0.4, ratioFemale: 0.6, colorMale: '#FBC451', colorFemale: '#FFF015', messages: ['msg1', 'msg2']})
      .end(function(err, res) {
        if (err) throw err;
        //console.log('location posted: ' + res.text);
        done();
      });
  });

  it('Should return a color string on a GET request', function(done) {
    chai.request('localhost:3000/api/v1/sparcify')
      .get('/color/capitolhill/true')
      .send({eat: token})
      .end(function(err, res) {
        //console.log('token: ' + token);
        //console.log('res.text: ');
        //console.log(JSON.parse(res.text));
        expect(err).to.eql(null);
        expect(JSON.parse(res.text).color).to.equal('#FFF015');
        expect(res).to.have.status(200);
        done();
      });
  });

});

