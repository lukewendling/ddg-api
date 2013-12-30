'use strict';

var url = require('url');
var http;

// Constructor
// appName: tell DDG the name of your app
// opts (optional): 'session' options. change the value to 443 for SSL
var DDG = function (appName, opts) {
  var config;
  
  this.appName = appName;

  if (opts === undefined || opts === null) {
    opts = {};
  }

  config = {
    hostname: opts.hostname || 'api.duckduckgo.com',
    port: opts.port || 80
  };

  http = require(config.port === 443 ? 'https' : 'http');

  this.config = config;

  return this;
};

// query instant answer api
// term: search term
// opts (optional): per-request options like 'skip_disambig'
// callback (optional)
DDG.prototype.instantAnswer = function (term, opts, callback) {
  if (opts === undefined || opts === null) {
    opts = {};
  }

  // log response to console by default
  if (callback === undefined || callback === null) {
    callback = function (err, response) { console.log(response); };
  }

  this.searchTerm = term;
  
  return this.query(this.buildReqParams(opts), callback);
};

DDG.prototype.buildReqParams = function (opts) {
  return {
    hostname: this.config.hostname,
    port: this.config.port,
    path: this.buildQueryString(opts)
  };
};

DDG.prototype.buildQueryString = function (opts) {
  var pathParts, params, queryString;

  // per-request params
  params = {
    q: this.searchTerm,
    pretty: opts.pretty || '1',
    no_html: opts.no_html || '0',
    no_redirect: opts.no_redirect || '0',
    skip_disambig: opts.skip_disambig || '0'
  };

  // per 'session' params
  params.format = 'json';
  params.t = this.appName;

  pathParts = {
    pathname: '/',
    query: params
  };

  this.queryString = url.format(pathParts);
  return this.queryString;
};

DDG.prototype.query = function (params, callback) {
  var req = http.request(params, function (res) {
    var data = [];
    res
      .on('data', function (chunk) { data.push(chunk); })
      .on('end', function () {
        data = data.join('').trim();
        var result;
        try {
          result = JSON.parse(data);
        } catch (exp) {
          result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
        }
        callback(null, result);
      });
  });
  req.end();

  req.on('error', function (e) {
    callback(e);
  });
};

module.exports = DDG;