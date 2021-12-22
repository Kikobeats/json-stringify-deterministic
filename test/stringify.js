'use strict'

const stringify = require('..')

describe('stringify', function () {
  it('simple object', function () {
    const obj = { c: 6, b: [4, 5], a: 3, z: null }
    stringify(obj).should.be.equal('{"a":3,"b":[4,5],"c":6,"z":null}')
  })

  describe('undefined', function () {
    it('in object', function () {
      const obj = { a: 3, z: undefined }
      stringify(obj).should.be.equal('{"a":3}')
    })

    it('in array', function () {
      const obj = [4, undefined, 6]
      stringify(obj).should.be.equal('[4,null,6]')
    })
  })

  describe('empty string', function () {
    it('in object', function () {
      const obj = { a: 3, z: '' }
      stringify(obj).should.be.equal('{"a":3,"z":""}')
    })

    it('in array', function () {
      const obj = [4, '', 6]
      stringify(obj).should.be.equal('[4,"",6]')
    })
  })

  describe('regex', function () {
    it('in object', function () {
      const obj = { a: 3, z: /foobar/ }
      stringify(obj).should.be.equal('{"a":3,"z":"/foobar/"}')
    })

    it('in array', function () {
      const obj = [4, undefined, /foobar/]
      stringify(obj).should.be.equal('[4,null,"/foobar/"]')
    })
  })
})
