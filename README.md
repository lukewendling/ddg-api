# node-ddg-api - DuckDuckGo instant answer API node module

> Access the [DuckDuckGo](https://duckduckgo.com/api) API with [Nodejs](http://nodejs.org).


## Installation

To install via NPM type the following: `npm install node-ddg-api`

You can also install via git by cloning:

```shell
git clone https://github.com/lukewendling/ddg-api.git /path/to/project`
```

## Usage

```js
var DDG = require('node-ddg-api').DDG;

var ddg = new DDG('my-app-name');

ddg.instantAnswer('superman', {skip_disambig: '0'}, function(err, response) {
  console.log(response);
});
```

```bash
node-ddg superman -t my-app-name --skip_disambig 0
```