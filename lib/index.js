'use strict'

var DEFAULTS = require('./defaults')
var isArray = Array.isArray
var objectKeys = Object.keys

function stringifyDeterministic (obj, opts) {
  opts = opts || {}

  if (typeof opts === 'function') opts = { compare: opts }

  var space = opts.space || DEFAULTS.space
  var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : DEFAULTS.cycles
  var replacer = opts.replacer || DEFAULTS.replacer
  var jsonStringify = opts.stringify || DEFAULTS.stringify

  var compare = opts.compare && (function (f) {
    return function (node) {
      return function (a, b) {
        var aobj = { key: a, value: node[a]}
        var bobj = { key: b, value: node[b]}
        return f(aobj, bobj)
      }
    }
  })(opts.compare)

  var seen = []
  return (function stringify (parent, key, node, level) {
    var indent = space ? ('\n' + new Array(level + 1).join(space)) : ''
    var colonSeparator = space ? ': ' : ':'

    if (node && node.toJSON && typeof node.toJSON === 'function') {
      node = node.toJSON()
    }

    node = replacer.call(parent, key, node)

    if (node === undefined) {
      return
    }
    if (typeof node !== 'object' || node === null) {
      return jsonStringify(node)
    }
    if (isArray(node)) {
      var out = []
      for (var i = 0; i < node.length; i++) {
        var item = stringify(node, i, node[i], level + 1) || jsonStringify(null)
        out.push(indent + space + item)
      }
      return '[' + out.join(',') + indent + ']'
    } else {
      if (seen.indexOf(node) !== -1) {
        if (cycles) return jsonStringify('__cycle__')
        throw new TypeError('Converting circular structure to JSON')
      }
      else seen.push(node)

      var keys = objectKeys(node).sort(compare && compare(node))
      var out = []
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var value = stringify(node, key, node[key], level + 1)

        if (!value) continue

        var keyValue = jsonStringify(key)
          + colonSeparator
          + value

        out.push(indent + space + keyValue)
      }
      seen.splice(seen.indexOf(node), 1)
      return '{' + out.join(',') + indent + '}'
    }
  })({ '': obj }, '', obj, 0)
}

module.exports = stringifyDeterministic
