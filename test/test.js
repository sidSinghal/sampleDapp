// var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe("Sample test", function() {
    it("should return the homepage", function(done) {
        server.get("/users").expect("Content-type", /json/).expect(200).end(function(err, res) {
            res.status.should.equal(200);
            // res.body.error.should.equal(false);
            done();
        });
    });

    it("should get a user from the database", function(done){
        server
        .get("/users/5cba3ca6e9df355594b5900c")
        .expect("Content-type", /json/).expect(200).end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });

    it("should return errorr page", function(done){
        server
        .get("/random")
        .expect(404)
        .end(function(err, res){
            res.status.should.equal(404);
            done();
        });
    });
});