var DDG = require('../lib/ddg');

exports.testConstructor = {

  'constructor sets app name' : function (test) {
    var ddg = new DDG('test-app');
    test.equal(ddg.appName, 'test-app');
    test.done();
  },

  'constructor sets default config' : function (test) {
    var ddg = new DDG('test-app');
    test.deepEqual(ddg.config, { hostname: 'api.duckduckgo.com', port: 80 });
    test.done();
  },

  'constructor sets custom config' : function (test) {
    var ddg = new DDG('test-app', { port: 443 });
    test.deepEqual(ddg.config, { hostname: 'api.duckduckgo.com', port: 443 });
    test.done();
  }

};

exports.testInstantAnswer = {

  'returns result of request' : function (test) {
    var ddg = new DDG('test-app');

    ddg.query = function () { return 'super' };

    test.equal(ddg.instantAnswer('superman'), 'super');
    test.done();
  },

  'builds query string' : function (test) {
    var ddg = new DDG('test-app');
    var opts = {skip_disambig: '1', pretty: '0', no_html: '1', no_redirect: '1'};

    ddg.query = function () { return 'super' };
    ddg.instantAnswer('superman', opts);

    test.equal(ddg.queryString, "/?q=superman&pretty=0&no_html=1&no_redirect=1&skip_disambig=1&format=json&t=test-app");
    test.done();
  }
};