var DDG = require('../lib/ddg');

exports.testConstructor = {

  setUp: function (callback) {
    this.ddg = new DDG('test-app');
    callback();
  },

  'constructor sets app name' : function (test) {
    test.equal(this.ddg.appName, 'test-app');
    test.done();
  },

  'constructor sets default config' : function (test) {
    test.deepEqual(this.ddg.config, { hostname: 'api.duckduckgo.com', port: 80 });
    test.done();
  },

  'constructor sets custom config' : function (test) {
    var ddg = new DDG('test-app', { port: 443 });
    test.deepEqual(ddg.config, { hostname: 'api.duckduckgo.com', port: 443 });
    test.done();
  }

};

exports.testInstantAnswer = {

  setUp: function (callback) {
    this.ddg = new DDG('test-app');
    callback();
  },

  'returns result of request' : function (test) {
    this.ddg.query = function () { return 'super' };

    test.equal(this.ddg.instantAnswer('superman'), 'super');
    test.done();
  },

  'builds query string' : function (test) {
    var opts = {skip_disambig: '1', pretty: '0', no_html: '1', no_redirect: '1'};

    this.ddg.query = function () { return 'super' };
    this.ddg.instantAnswer('superman', opts);

    test.equal(this.ddg.queryString, "/?q=superman&pretty=0&no_html=1&no_redirect=1&skip_disambig=1&format=json&t=test-app");
    test.done();
  }
};