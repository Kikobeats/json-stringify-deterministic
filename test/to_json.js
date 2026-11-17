'use strict'

const stringify = require('..')

describe('toJSON', function () {
  it('function', function () {
    const obj = {
      one: 1,
      two: 2,
      toJSON: function () {
        return { one: 1 }
      }
    }
    stringify(obj).should.be.equal('{"one":1}')
  })

  it('string', function () {
    const obj = {
      one: 1,
      two: 2,
      toJSON: function () {
        return 'one'
      }
    }
    stringify(obj).should.be.equal('"one"')
  })

  it('array', function () {
    const obj = {
      one: 1,
      two: 2,
      toJSON: function () {
        return ['one']
      }
    }
    stringify(obj).should.be.equal('["one"]')
  })

  it('receives the property key like JSON.stringify', function () {
    const value = {
      toJSON: function (key) {
        return 'key:' + key
      }
    }
    const obj = { b: value, a: [value] }
    stringify(obj).should.be.equal(JSON.stringify({ a: obj.a, b: obj.b }))
    stringify(value).should.be.equal(JSON.stringify(value))
  })

  describe('non-function toJSON is serialized as a regular field', function () {
    const values = ['label', 42, true, null, { nested: 1 }, ['x']]

    values.forEach(function (toJSON) {
      it(JSON.stringify(toJSON), function () {
        const obj = { toJSON, other: 1 }
        stringify(obj).should.be.equal(JSON.stringify({ other: 1, toJSON }))
      })
    })

    it('undefined', function () {
      const obj = { toJSON: undefined, other: 1 }
      stringify(obj).should.be.equal('{"other":1}')
    })

    it('nested', function () {
      const obj = { record: { toJSON: 'label' } }
      stringify(obj).should.be.equal('{"record":{"toJSON":"label"}}')
    })
  })
})
