'use strict'

const stringify = require('..')

describe('replacer', function () {
  it('replace root', function () {
    const obj = { a: 1, b: 2, c: false }
    const replacer = function (key, value) {
      return 'one'
    }

    stringify(obj, { replacer }).should.be.equal('"one"')
  })

  it('replace numbers', function () {
    const obj = { a: 1, b: 2, c: false }
    const replacer = function (key, value) {
      if (value === 1) return 'one'
      if (value === 2) return 'two'
      return value
    }

    stringify(obj, { replacer }).should.be.equal(
      '{"a":"one","b":"two","c":false}'
    )
  })

  it('replace with object', function () {
    const obj = { a: 1, b: 2, c: false }
    const replacer = function (key, value) {
      if (key === 'b') return { d: 1 }
      if (value === 1) return 'one'
      return value
    }

    stringify(obj, { replacer }).should.be.equal(
      '{"a":"one","b":{"d":"one"},"c":false}'
    )
  })

  it('replace with undefined', function () {
    const obj = { a: 1, b: 2, c: false }
    const replacer = function (key, value) {
      if (value === false) return
      return value
    }

    stringify(obj, { replacer }).should.be.equal('{"a":1,"b":2}')
  })

  it('replace with array', function () {
    const obj = { a: 1, b: 2, c: false }
    const replacer = function (key, value) {
      if (key === 'b') return ['one', 'two']
      return value
    }

    stringify(obj, { replacer }).should.be.equal(
      '{"a":1,"b":["one","two"],"c":false}'
    )
  })

  it('replace array item', function () {
    const obj = { a: 1, b: 2, c: [1, 2] }
    const replacer = function (key, value) {
      if (value === 1) return 'one'
      if (value === 2) return 'two'
      return value
    }

    stringify(obj, { replacer }).should.be.equal(
      '{"a":"one","b":"two","c":["one","two"]}'
    )
  })

  it('replace array item by string index', function () {
    const replacer = function (key, value) {
      return key === '0' ? 'updated' : value
    }

    stringify(['original'], { replacer }).should.be.equal(
      JSON.stringify(['original'], replacer)
    )
    stringify(['original'], { replacer }).should.be.equal(
      '["updated"]'
    )
  })

  describe('receives the same keys as JSON.stringify', function () {
    const recordKeys = function (serialize) {
      const keys = []
      serialize(function (key, value) {
        keys.push(typeof key + ':' + key)
        return value
      })
      return keys
    }

    const fixtures = {
      'flat array': ['a', 'b', 'c'],
      'nested arrays': [[1, [2, 3]], [4]],
      'array inside object': { a: [1, 2], b: { c: [3] } },
      'objects inside array': [{ a: 1 }, { b: [2] }],
      'sparse array': [1, , 3], // eslint-disable-line no-sparse-arrays
      'array with undefined and null': [undefined, null, 0],
      'array longer than ten items': Array.from({ length: 12 }, (_, i) => i),
      'empty array': []
    }

    const optionSets = {
      'default options': {},
      'space and cycles': { space: '  ', cycles: true }
    }

    Object.keys(optionSets).forEach(function (optionsName) {
      describe(optionsName, function () {
        Object.keys(fixtures).forEach(function (name) {
          it(name, function () {
            const input = fixtures[name]
            const actual = recordKeys(replacer =>
              stringify(
                input,
                Object.assign({ replacer }, optionSets[optionsName])
              )
            )
            const expected = recordKeys(replacer =>
              JSON.stringify(input, replacer)
            )

            actual.should.be.eql(expected)
          })
        })
      })
    })
  })

  it('calls the replacer with the array as `this`', function () {
    const input = ['a', ['b']]
    const holders = []
    const replacer = function (key, value) {
      if (key !== '') holders.push(this[key] === value && Array.isArray(this))
      return value
    }

    stringify(input, { replacer })

    holders.should.be.eql([true, true, true])
  })

  it('replacer returning an array gets string indices for its items', function () {
    const replacer = function (key, value) {
      if (key === 'list') return ['x', 'y']
      return key === '1' ? 'second' : value
    }

    stringify({ list: null }, { replacer }).should.be.equal(
      JSON.stringify({ list: null }, replacer)
    )
  })
})
