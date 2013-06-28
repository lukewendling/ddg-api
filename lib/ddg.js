var url = require('url');
var http;

var DDG = function (appName, opts) {
  var config;
  
  this.appName = appName;

  if (opts === undefined || opts === null) {
    opts = {};
  }

  config = {
    format: opts.format || 'json',
    hostname: opts.hostname || 'api.duckduckgo.com',
    port: opts.port || 443
  };

  if (config.port === 443) {
    http = require('https');
  } else {
    http = require('http');
  }

  this.config = config;

  return this;
};

DDG.prototype.instantAnswer = function (q, opts, cb) {
  var params;

  if (opts === undefined || opts === null) {
    opts = {};
  }

  // log response to console by default
  if (cb === undefined || cb === null) {
    cb = function (err, response) { console.log(response) };
  }

  params = {
    q: q,
    pretty: opts.pretty || '1',
    no_html: opts.no_html || '0',
    no_redirect: opts.no_redirect || '0',
    skip_disambig: opts.skip_disambig || '0'
  };

  console.log(params);
  this.get(params, cb);
};

DDG.prototype.get = function (params, cb) {
  var req, pathParts, options;

  params.format = this.config.format;
  params.t = this.appName;

  pathParts = {
    pathname: '/',
    query: params
  };

  options = {
    hostname: this.config.hostname,
    port: this.config.port,
    path: url.format(pathParts)
  };

  req = http.request(options, function (res) {
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
        cb(null, result);
      });
  });
  req.end();

  req.on('error', function (e) {
    cb(e);
  });
};

module.exports = DDG;