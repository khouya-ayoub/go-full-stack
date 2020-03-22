/**
 * This file contains all scrypt test
 * */
// import expect from chai
var expect = require('chai').expect;
var assert = require('chai').assert;
// import my app
var app = require('../app');
// requests
var request = require('supertest');

/**
 * Reference that helps to write your own test
 * */
describe('General syntax of the tests for our API :', () => {
    // first run the app before each test
    before((done) => {
        app.listen((err) => {
            if (err) { return done(err); }
            done();
        });
    });

    // After all tests are done
    after(() => {
        console.log("All tests for General syntax section are done !");
    });

    it('Test of a POST method', function (done) {
        request(app)
            .post('/test/routepost')
            .send({ email: 'post' })
            .expect(200)
            .end((err, resp) => {
                if (err) {done(err);}
                done();
            });
    });

    it('Test of a GET method', function (done) {
        request(app)
            .get('/test/routeget')
            .send({ email: 'get' })
            .expect(200)
            .end((err, resp) => {
                if (err) {done(err);}
                done();
            });
    });

    it('Test of a native function or variable', function () {
        // same other examples
        expect(5).to.equal(5);
        expect(5).to.not.equal(3);
        assert.equal(6,6,"6 its equal to 6");
        assert.typeOf('Heho', 'string');
    });
});

/**
 * Tests for user functions
 * */
describe("Tests for user functions :", () => {
    before(done => {
        app.listen(err => {
            if (err) done(err);
            done();
        });
    });
    after(() => {
        console.log("User functions tested well !")
    });
    // singup function
    it('sign up function for the user', function (done) {
        request(app)
            .post('/api/auth/signup')
            .send({ login: 'testback', password: 'testback' })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});
