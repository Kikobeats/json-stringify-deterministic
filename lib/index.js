'use strict'

const DEFAULTS = require('./defaults')
const { isArray, isRegex, isBoolean, isFunction, isObject, keys } = require('./util')

function getSerializer (obj) {
  if (!obj) return obj
  if (obj.toJSON && isFunction(obj.toJSON)) return obj.toJSON()
  if (isRegex(obj)) return obj.toString()
  return obj
}

function stringifyDeterministic (obj, opts = DEFAULTS) {
  if (isFunction(opts)) opts = { compare: opts }

  const space = opts.space || DEFAULTS.space
  const cycles = isBoolean(opts.cycles) ? opts.cycles : DEFAULTS.cycles
  const replacer = opts.replacer || DEFAULTS.replacer
  const stringify = opts.stringify || DEFAULTS.stringify

  const compare = opts.compare && (function (f) {
    return function (node) {
      return function (a, b) {
        const aobj = {key: a, value: node[a]}
        const bobj = {key: b, value: node[b]}
        return f(aobj, bobj)
      }
    }
  })(opts.compare)

  // Detect circular structure in obj and raise error efficiently.
  if (!cycles) stringify(obj)

  const seen = []

  return (function _deterministic (parent, key, node, level) {
    const indent = space ? ('\n' + new Array(level + 1).join(space)) : ''
    const colonSeparator = space ? ': ' : ':'

    node = getSerializer(node)
    node = replacer.call(parent, key, node)

    if (node === undefined) return

    if (!isObject(node) || node === null) return stringify(node)

    if (isArray(node)) {
      const out = []
      for (let i = 0; i < node.length; i++) {
        const item = _deterministic(node, i, node[i], level + 1) || stringify(null)
        out.push(indent + space + item)
      }
      return '[' + out.join(',') + indent + ']'
    } else {
      if (cycles) {
        if (seen.indexOf(node) !== -1) {
          return stringify('[Circular]')
        } else {
          seen.push(node)
        }
      }

      const nodeKeys = keys(node).sort(compare && compare(node))
      const out = []
      for (let i = 0; i < nodeKeys.length; i++) {
        const key = nodeKeys[i]
        const value = _deterministic(node, key, node[key], level + 1)

        if (!value) continue

        const keyValue = stringify(key) + colonSeparator + value
        out.push(indent + space + keyValue)
      }
      seen.splice(seen.indexOf(node), 1)
      return '{' + out.join(',') + indent + '}'
    }
  })({ '': obj }, '', obj, 0)
}

module.exports = stringifyDeterministic
