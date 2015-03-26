'use strict';
process.env.MONG_URI = 'mongodb://localhost/user_test';
require('../../server');

var chai = require('chai'),
    chaihttp = require('chai-http'),
	expect = chai.expect,
    serverUrl = 'localhost:3000/api/v1/sparcify',
    mongoose = require('mongoose');

    chai.use(chaihttp);

describe('Picture Testing', function () {
    var tokenVal,
    userA ={'email':'ann@example.com', 'password':'aaaa'},
    userB = {'eamil':'bill@example.com', 'password':'bbbb'};
    

    before(function (done) {
        chai.request(serverUrl)
            .post('/create_user')
            .send(userA)
            .end(function (err, res) {
                tokenVal = res.body.token;
                done();
            });
        });


    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            done();
        });
    });
    it('should return picture links', function (done) {
        chai.request(serverUrl)
            .post('/pictures/capitolhill/true')
            .set("Authorization", tokenVal)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.pictures).to.eql();
                done();
            })
    })

	it('should return picture links', function (done) {
        chai.request(serverUrl)
            .post('/pictures/capitolhill/true')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.be.empty;
                done();
            })
    })
   });