# node-ddg-api - DuckDuckGo instant answer API node module

> Access the [DuckDuckGo](https://duckduckgo.com/api) API with [Nodejs](http://nodejs.org).

## Dependencies

Only depends on [optimist](https://npmjs.org/package/optimist) for the cli but the core has no dependencies.

## Installation

To install via NPM type the following: `npm install node-ddg-api`

(use `npm install -g node-ddg-api` to add node-ddg bin script to your path)

You can also install via git by cloning:

```shell
git clone https://github.com/lukewendling/ddg-api.git /path/to/project
```

## Usage

```js
var DDG = require('node-ddg-api').DDG;

var ddg = new DDG('my-app-name');

ddg.instantAnswer('superman', {skip_disambig: '0'}, function(err, response) {
  console.log(response);
});
```

```shell
node-ddg superman -t my-app-name --skip_disambig 0
```

## Running tests (after cloning)

```shell
npm install
npm test
```
