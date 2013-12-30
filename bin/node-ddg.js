#!/usr/bin/env node

'use strict';

var DDG = require('../index').DDG,
  argv = require('optimist')
    .usage('Query DuckDuckGo Instant Answer API\nPass exact options as shown: https://duckduckgo.com/api\nUsage: $0 <searchterm> --t appname --pretty 1 --skip_disambig 1')
    .demand('t')
    .describe('t', 'Tell DDG the name of your app')
    .argv,
  ddg = new DDG(argv.t);

ddg.instantAnswer(argv._[0], argv);