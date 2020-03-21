// file contains all tests for Data Base module
var chai = require("chai");
var expect = chai.expect;
var sinon = require('sinon');
var assert = require('assert');
var conn = require('../data_base/functions');


var server;
before(function () { server = sinon.fakeServer.create(); });
after(function () { server.restore(); });

describe('Login function in data base', function () {
    it('should return a json object', function () {

    });
});


