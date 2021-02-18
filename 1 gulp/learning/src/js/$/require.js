let toString = Object.prototype.toString
let class2type = {}
//eslint-disable-next-line
'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name, i) {
  class2type['[object ' + name + ']'] = name.toLowerCase()
})

export function type(obj) {
  return obj == null
    ? String(obj)
    : class2type[toString.call(obj)] || 'object'
}

export function isWindow(obj) {
  return obj != null && obj === obj.window
}

export function isDocument(obj) {
  return obj != null && obj.nodeType == obj.DOCUMENT_NODE
}

export function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

export function isObject(obj) {
  return type(obj) === 'object'
}

export function isFunction(value) {
  return type(value) === 'function'
}

export function isArray(value) {
  return type(value) === 'array'
}
