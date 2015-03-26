'use strict';
process.env.MONG_URI = 'mongodb://localhost/user_test';
require('../../server');

var chai = require('chai'),
    chaihttp = require('chai-http'),
	expect = chai.expect,
    serverUrl = 'localhost:3000/api/v1/sparcify',
    mongoose = require('mongoose');

    chai.use(chaihttp);

describe('User Testing', function () {
    var token,
    userA ={'email':'ann@example.com', 'password':'aaaa'},
    userB = {'eamil':'bill@example.com', 'password':'bbbb'};
    

    before(function (done) {
        chai.request(serverUrl)
            .post('/create_user')
            .send(userA)
            .end(function (err, res) {
                token = res.body.token;
                done();
            });
    });


    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            done();
        });
    });
    it('should create a user and return a token', function (done) {
        chai.request(serverUrl)
            .post('/create_user')
            .send(userB)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.have.property('eat');
                done();
            })
    })

	it('should return token', function (done) {
    chai.request(serverUrl)
        .get('/sign_in')
        .auth('ann@example.com', 'aaaa')
        .end(function (err, res) {
            expect(err).to.eql(null);
            var retObj = res.body;	
            expect(retObj).to.have.property('eat');
            done();
        });
    });
   });