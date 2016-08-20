
// test tools
var chai = require('chai');
var cap = require('chai-as-promised');
chai.use(cap);
var expect = chai.expect;
var bluebird = require('bluebird');
var then = require('promise');
var spawn = require('child_process').spawn;
var stream = require('stream');
var resumer = require('resumer');
var FormData = require('form-data');
var http = require('http');
var fs = require('fs');

var TestServer = require('./server');

// test subjects
var fetch = require('../index.js');
var Headers = require('../lib/headers.js');
var Response = require('../lib/response.js');
var Request = require('../lib/request.js');
var Body = require('../lib/body.js');
var FetchError = require('../lib/fetch-error.js');
// test with native promise on node 0.11, and bluebird for node 0.10
fetch.Promise = fetch.Promise || bluebird;

var url, opts, local, base;

describe('node-fetch', function() {

	before(function(done) {
		local = new TestServer();
		base = 'http://' + local.hostname + ':' + local.port;
		local.start(done);
	});

	after(function(done) {
		local.stop(done);
	});

	it('should allow cloning a json response, first log as text response, then return json object, when response is larger than Stream Buffer', function() {
		url = base + '/json/large';
		return fetch(url).then(function(res) {
			var r1 = res.clone();
			return r1.text().then(function(result) {
				expect(result).to.not.equal(null);
				return res.json().then(function(result) {
					expect(result).to.not.equal(null);
				});
			});
		});
	});


});
