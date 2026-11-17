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

  it('reads a toJSON getter once and calls it with this set', function () {
    let reads = 0
    const value = {
      name: 'n',
      get toJSON () {
        reads += 1
        return function (key) {
          return this.name + ':' + key
        }
      }
    }

    // cycles:true skips the JSON.stringify cycle probe, which reads toJSON on its own.
    stringify({ b: value }, { cycles: true }).should.be.equal('{"b":"n:b"}')
    reads.should.be.equal(1)
  })

  it('calls toJSON when its call property is null', function () {
    const toJSON = function (key) {
      return this.name + ':' + key
    }
    toJSON.call = null
    const value = { name: 'n', toJSON }
    stringify({ b: value }).should.be.equal('{"b":"n:b"}')
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
