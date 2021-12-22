'use strict'

const stringify = require('..')

describe('space', function () {
  it('space parameter', function () {
    const obj = { one: 1, two: 2 }
    stringify(obj, { space: '  ' }).should.be.equal('' +
      '{\n' +
      '  "one": 1,\n' +
      '  "two": 2\n' +
      '}'
    )
  })

  it('space parameter (with tabs)', function () {
    const obj = { one: 1, two: 2 }
    stringify(obj, { space: '\t' }).should.be.equal('' +
      '{\n' +
      '\t"one": 1,\n' +
      '\t"two": 2\n' +
      '}'
    )
  })

  it('space parameter (nested objects)', function () {
    const obj = { one: 1, two: { b: 4, a: [2, 3] } }
    stringify(obj, { space: '  ' }).should.be.equal('' +
      '{\n' +
      '  "one": 1,\n' +
      '  "two": {\n' +
      '    "a": [\n' +
      '      2,\n' +
      '      3\n' +
      '    ],\n' +
      '    "b": 4\n' +
      '  }\n' +
      '}'
    )
  })

  it('space parameter (same as native)', function () {
    // for this test, properties need to be in alphabetical order
    const obj = { one: 1, two: { a: [2, 3], b: 4 } }
    stringify(obj, { space: '  ' }).should.be.equal(JSON.stringify(obj, null, '  '))
  })
})
