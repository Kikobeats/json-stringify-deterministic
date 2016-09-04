# json-stringify-deterministic

<p align="center">
  <br>
  <img src="https://i.imgur.com/Mh13XWB.gif" alt="json-stringify-deterministic">
  <br>
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/json-stringify-deterministic.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/json-stringify-deterministic/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/json-stringify-deterministic)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/json-stringify-deterministic.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/json-stringify-deterministic)
[![Dependency status](https://img.shields.io/david/Kikobeats/json-stringify-deterministic.svg?style=flat-square)](https://david-dm.org/Kikobeats/json-stringify-deterministic)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/json-stringify-deterministic.svg?style=flat-square)](https://david-dm.org/Kikobeats/json-stringify-deterministic#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/json-stringify-deterministic.svg?style=flat-square)](https://www.npmjs.org/package/json-stringify-deterministic)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

**NOTE:** more badges availables in [shields.io](https://shields.io/)

> deterministic version of JSON.stringify() so you can get a consistent hash from stringified results.

## Install

```bash
$ npm install json-stringify-deterministic --save
```

## Usage

```js
const jsonStringifyDeterministic = require('json-stringify-deterministic')

jsonStringifyDeterministic('do something')
//=> return something
```

## API

### jsonStringifyDeterministic(input, [options])

#### input

*Required*<br>
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`
Default: `false`

Lorem ipsum.

## License

MIT © [Kiko Beats](https://github.com/Kikobeats).
