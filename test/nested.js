'use strict'

const stringify = require('..')

describe('nested', function () {
  it('nested', function () {
    const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 }
    stringify(obj).should.be.equal('{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}')
  })

  it('cyclic (default)', function () {
    const one = { a: 1 }
    const two = { a: 2, one: one }
    one.two = two
    try {
      stringify(one)
    } catch (ex) {
      ex.toString()
        .startsWith('TypeError: Converting circular structure to JSON')
        .should.be.true()
    }
  })

  it('cyclic (specifically allowed)', function () {
    const one = { a: 1 }
    const two = { a: 2, one: one }
    one.two = two
    stringify(one, { cycles: true }).should.be.equal(
      '{"a":1,"two":{"a":2,"one":"[Circular]"}}'
    )
  })

  it('repeated non-cyclic value', function () {
    const one = { x: 1 }
    const two = { a: one, b: one }
    stringify(two).should.be.equal('{"a":{"x":1},"b":{"x":1}}')
  })

  it('acyclic but with reused obj-property pointers', function () {
    const x = { a: 1 }
    const y = { b: x, c: x }
    stringify(y).should.be.equal('{"b":{"a":1},"c":{"a":1}}')
  })
})
