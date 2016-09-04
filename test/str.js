'use strict'

var stringify = require('..')

describe('str', function () {
  it('simple object', function () {
    var obj = { c: 6, b: [4, 5], a: 3, z: null }
    stringify(obj).should.be.equal('{"a":3,"b":[4,5],"c":6,"z":null}')
  })

  it('object with undefined', function () {
    var obj = { a: 3, z: undefined }
    stringify(obj).should.be.equal('{"a":3}')
  })

  it('array with undefined', function () {
    var obj = [4, undefined, 6]
    stringify(obj).should.be.equal('[4,null,6]')
  })

  it('object with empty string', function () {
    var obj = { a: 3, z: '' }
    stringify(obj).should.be.equal('{"a":3,"z":""}')
  })

  it('array with empty string', function () {
    var obj = [4, '', 6]
    stringify(obj).should.be.equal('[4,"",6]')
  })
})
