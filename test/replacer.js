'use strict'

var stringify = require('..')

describe('replacer', function () {
  it('replace root', function () {
    var obj = { a: 1, b: 2, c: false }
    var replacer = function (key, value) { return 'one'; }

    stringify(obj, { replacer: replacer }).should.be.equal('"one"')
  })

  it('replace numbers', function () {
    var obj = { a: 1, b: 2, c: false }
    var replacer = function (key, value) {
      if (value === 1) return 'one'
      if (value === 2) return 'two'
      return value
    }

    stringify(obj, { replacer: replacer }).should.be.equal('{"a":"one","b":"two","c":false}')
  })

  it('replace with object', function () {
    var obj = { a: 1, b: 2, c: false }
    var replacer = function (key, value) {
      if (key === 'b') return { d: 1 }
      if (value === 1) return 'one'
      return value
    }

    stringify(obj, { replacer: replacer }).should.be.equal('{"a":"one","b":{"d":"one"},"c":false}')
  })

  it('replace with undefined', function () {
    var obj = { a: 1, b: 2, c: false }
    var replacer = function (key, value) {
      if (value === false) return
      return value
    }

    stringify(obj, { replacer: replacer }).should.be.equal('{"a":1,"b":2}')
  })

  it('replace with array', function () {
    var obj = { a: 1, b: 2, c: false }
    var replacer = function (key, value) {
      if (key === 'b') return ['one', 'two']
      return value
    }

    stringify(obj, { replacer: replacer }).should.be.equal('{"a":1,"b":["one","two"],"c":false}')
  })

  it('replace array item', function () {
    var obj = { a: 1, b: 2, c: [1, 2] }
    var replacer = function (key, value) {
      if (value === 1) return 'one'
      if (value === 2) return 'two'
      return value
    }

    stringify(obj, { replacer: replacer }).should.be.equal('{"a":"one","b":"two","c":["one","two"]}')
  })
})
