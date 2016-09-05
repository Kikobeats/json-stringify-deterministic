'use strict'

var stringify = require('..')

describe('compare', function () {
  it('custom comparison function', function () {
    var obj = { c: 8, b: [{z: 6, y: 5, x: 4}, 7], a: 3 }
    var s = stringify(obj, function (a, b) {
      return a.key < b.key ? 1 : -1
    })

    s.should.be.equal('{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}')
  })
})
