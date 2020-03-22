# if it's your first time you write a test scrypt for angular please follow the instructions bellow :

# Definition : What is a test scrypt ?
    The test scrypt is a programme written in the same language you use, and it's help
    you to test some blocs, functions, methods ... of your programme you are developing.

# Who write and evaluate those test ?
    You write the tests and your computer who evaluate them and tells you if all it's Okey !

# Structure of the test in Angular :
    For angular scrypt test looks like the following codes

## Version 1 : Sample function
    /******************* Version 1 : for a sample function ********************************/
    // This is just for organisation and reporting
    describe('Description of your test', function() {

    // This is the name of the test
        it('What should the function do / or test', function(done) {

            // We want this test to pass.
            if (5 == 5) {
            // If the behavior is as expected, call done with no argument.
                done();
            } else {
            // Otherwise, call done with an error.
                done(new Error("Not sure what's happened."));
            }
        });
    });
    /**************************************************************/
# Version 2 : An express app
    /******************* Version 1 : for a express app ********************************/
    var express = require('express'); // (npm install --save express)
    var request = require('supertest');

    function createApp() {
        app = express();
        var router = express.Router();
        router.route('/').get(function(req, res) {
            return res.json({goodCall: true});
        });
        app.use(router);
        return app;
    }

    describe('Our server', function() {
    var app;
        // Called once before any of the tests in this block begin.
        before(function(done) {
            app = createApp();
            app.listen(function(err) {
            if (err) { return done(err); }
                done();
            });
        });

        it('should send back a JSON object with goodCall set to true', function() {
            request(app)
                .get('/index')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    if (err) { return done(err); }
            callStatus = res.body.goodCall;
            expect(callStatus).to.equal(true);
            // Done
            done();
            });
        });
    });
    /***************************************************************************************/

# Conclusion :
    Of course there is a ot of ways to write tests, but thoses are the general blocs you can
    use to help you !

# Documentation wrote by :
    Ayoub KHOUYA
    Student engineer
    Software engineering
    a.khouya.ing@gmail.com
