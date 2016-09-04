'use strict'

module.exports = {
  isArray: Array.isArray,

  isObject: function isObject (v) {
    return typeof v === 'object'
  },

  isFunction: function isFunction (v) {
    return typeof v === 'function'
  },

  isBoolean: function isBoolean (v) {
    return typeof v === 'boolean'
  },

  keys: Object.keys

}
