import {type, isWindow, isDocument, isFunction, isObject, isArray} from './require'
import {setAttribute} from './domapi'
import {camelize, dasherize, maybeAddPx} from './utils'

var document = window.document,
  docElem = document.documentElement,
  body = document.body,
  tempParent = document.createElement('div'),
  emptyArr = [],
  filter = emptyArr.filter,
  slice = emptyArr.slice,
  //eslint-disable-next-line
  forEach = emptyArr.forEach,
  simpleSelectorRE = /^[\w-]*$/,
  fragmentRE = /^\s*<(\w+|!)[^>]*>/, //判断字符串是否为标签
  singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, //判断是否为标签的形式（如<div></div>）
  tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
  table = document.createElement('table'),
  tableRow = document.createElement('tr'),
  containers = {
    'tr': document.createElement('tbody'),
    'tbody': table, 'thead': table, 'tfoot': table,
    'td': tableRow, 'th': tableRow,
    '*': document.createElement('div')
  }

// 去除数组中重复出现的元素，返回新数组
function uniq(array) {
  return filter.call(array, function (item, idx) {
    return array.indexOf(item) === idx
  })
}

// 过滤数组中值为null undefined的元素，返回新数组
function compact(array) {
  return filter.call(array, function (item) {
    return item != null
  })
}

function matches(element, selector) {
  if (!selector || !element || element.nodeType !== 1) return false
  // matches 方法用于检测元素( element )是否匹配特定的选择器( selector )
  var matchesSelector = element.matches || element.webkitMatchesSelector ||
    element.mozMatchesSelector || element.oMatchesSelector ||
    element.matchesSelector
  if (matchesSelector) return matchesSelector.call(element, selector)

  var math,
    parent = element.parentNode,
    temp = !parent

  if (temp) (parent = tempParent).appendChild(element)

  math = ~qsa(parent, selector).indexOf(element)

  temp && tempParent.removeChild(element)
  return math
}

function filtered(nodes, selector) {
  return (selector === null || !selector) ? $(nodes) : $(nodes).filter(selector)
}

function funcArg(context, arg, idx, payload) {
  return isFunction(arg) ? arg.call(context, idx, payload) : arg
}

// 判断是否为类数组
function likeArray(obj) {
  var length = !!obj && 'length' in obj && obj.length

  // length === 0 其实就是将其看作为空数组
  // 最后一种情况必须要满足三个条件：
  // 1.length 必须为数字
  // 2.length 必须大于 0 ，表示有元素存在于类数组中
  // 3.key length - 1 必须存在于 obj 中。我们都知道，数组最后的 index 值为 length -1 ，这里也是检查最后一个 key 是否存在。
  return !isFunction(obj) && !isWindow(obj) &&
    (isArray(obj) || length === 0 || (typeof length == 'number' && length > 0 && (length - 1) in obj))
}

//eslint-disable-next-line
function fragment(html, name, properties) {
  var dom, container

  // A special case optimization for a single tag
  if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

  if (!dom) {
    if (html.replace) html = html.replace(tagExpanderRE, '<$1></$2>')
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    container = containers[name]
    container.innerHTML = '' + html
    dom = $.each(slice.call(container.childNodes), function () {
      container.removeChild(this)
    })
  }

  return dom
}

function qsa(element, selector) {
  var found,
    maybeID = (selector[0] === '#'), // ID
    maybeClass = !maybeID && selector[0] === '.', // class
    nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // 将id或class前面的符号去掉
    isSimple = simpleSelectorRE.test(nameOnly) // 是否为单个选择器

  return (element.getElementById && isSimple && maybeID)
    //eslint-disable-next-line
    ? ((found = element.getElementById(nameOnly)) ? [found] : [])
    : (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) // 1 元素节点, 9 Document节点, 11 DocumentFragment节点
      ? []
      : slice.call(
        isSimple && !maybeID && element.getElementsByClassName
          ? (maybeClass ? element.getElementsByClassName(nameOnly) : element.getElementsByTagName(selector))
          : element.querySelectorAll(selector)
      )
}

function Bin(doms) {
  var i = 0
  var len = doms ? doms.length : 0
  for (i; i < len; i++) {
    this[i] = doms[i]
  }
  this.length = len
}

// 定义$对象的原型对象
Bin.prototype = {
  constructor: Bin,
  indexOf: emptyArr.indexOf,
  method: function () {
    return this
  },
  each: function (callback) {
    emptyArr.every.call(this, function (el, idx) {
      return callback.call(el, idx, el) !== false
    })
    return this
  },
  pluck: function (property) {
    return $.map(this, function (ele) {
      return ele[property]
    })
  },
  map: function (fn) {
    return $($.map(this, function (el, i) {
      return fn.call(el, el, i)
    }))
  },
  slice: function () {
    // arguments是类数组，此处用调用slice方法需要使用apply
    return $(slice.apply(this, arguments))
  },
  eq: function (idx) {
    return idx === -1 ? this.slice(-1) : this.slice(idx, idx + 1)
  },
  filter: function (selector) {
    return $(filter.call(this, function (element) {
      return matches(element, selector)
    }))
  },
  not: function (selector) {
    var nodes = []
    var excludes = (typeof selector === 'string'
      ? this.filter(selector)
      : [])
    $.each(this, function (idx, ele) {
      if (excludes.indexOf(ele) < 0) nodes.push(ele)
    })

    return $(nodes)
  },
  parent: function (selector) {
    return filtered(uniq(this.pluck('parentNode')), selector)
  },
  children: function (selector) {
    return filtered(this.map(function (element) {
      return $.map(element.childNodes, function (node) {
        if (node.nodeType == 1) return node
      })
    }), selector)
  },
  attr: function (name, value) {
    var result
    return (typeof name == 'string' && !(1 in arguments))
      ? (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined)
      : this.each(function () {
        if (this.nodeType !== 1) {
          return
        }

        if (isObject(name))
          for (var key in name) setAttribute(this, key, name[key])
        else
          setAttribute(this, name, value)
      })
  },
  offset: function () {
    if (!this.length) return null

    if (docElem !== this[0] && !$.contains(docElem, this[0])) return {top: 0, left: 0}

    var obj = this[0].getBoundingClientRect()
    var clientTop = docElem.clientTop || body.clientTop || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,
      scrollTop = window.pageYOffset && docElem.scrollTop || body.scrollTop,
      scrollLeft = window.pageXOffset && docElem.scrollLeft || body.scrollLeft,
      left = obj.left + scrollLeft - clientLeft,
      top = obj.top + scrollTop - clientTop

    return {
      left: left,
      top: top,
      width: obj.width,
      height: obj.height
    }
  },
  css: function (property, value) {
    // 一个参数，{strig | array}获取属性
    if (arguments.length < 2) {
      var element = this[0]
      if (!element) return

      if (typeof property === 'string') {
        return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
      } else if (isArray(property)) {
        var props = {}
        var styleDeclaration = getComputedStyle(element, '')
        $.each(property, function (idx, prop) {
          props[prop] = element.style[camelize(prop)] || styleDeclaration.getPropertyValue(prop)
        })
        return props
      }
    }

    //设置属性
    var css = ''
    if (type(property) === 'string') {
      if (!value && value !== 0)
        this.each(function () {
          this.style.removeProperty(dasherize(value))
        })
      else
        css = dasherize(property) + ':' + maybeAddPx(property, value)
    } else {
      for (var key in property)
        if (!property[key] && property[key] !== 0)
          this.each(function () {
            this.style.removeProperty(dasherize(key))
          })
        else
          css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
    }

    return this.each(function () {
      this.style.cssText += ';' + css
    })
  },
  index: function (element) {
    return element ? this.indexOf(element) : this.parent().children().indexOf(this[0])
  },
  hasClass(selector) {
    var rclass = /[\n\t\r]/g
    var className = ' ' + selector + ' '

    return emptyArr.some.call(this, function (ele) {
      return (' ' + ele.className + ' ').replace(rclass, ' ').indexOf(className) > -1
    })
  },
  addClass: function (value) {
    if (!value) return this

    var rspace = /\s+/,
      classNames,
      i,
      cl,
      setClass

    return this.each(function () {
      if (value && typeof value === 'string') {
        classNames = value.split(rspace)
        if (!this.className && classNames.length === 1) {
          this.className = value
        } else {
          setClass = ' ' + this.className + ' '
          for (i = 0 , cl = classNames.length; i < cl; i++) {
            if (!~setClass.indexOf(' ' + classNames[i] + ' ')) {
              setClass += classNames[i] + ' '
            }
          }
          this.className = setClass.trim()
        }
      }
    })
  },
  removeClass(value) {
    var rspace = /\s+/
    var rclass = /[\n\t\r]/g
    var classNames,
      className,
      c,
      cl

    return this.each(function () {
      if (this.nodeType === 1 && this.className) {
        if ((value && typeof value === 'string') || value === undefined) {
          classNames = (value || '').split(rspace)

          if (value) {
            className = (' ' + this.className + ' ').replace(rclass, ' ')
            for (c = 0, cl = classNames.length; c < cl; c++) {
              className = className.replace(' ' + classNames[c] + ' ', ' ')
            }
            this.className = className.trim()

          } else {
            this.className = ''
          }
        }
      }
    })
  },
  toggleClass: function (value) {
    if (!value) return

    var rspace = /\s+/
    // toggle individual class names
    var className,
      i = 0,
      classNames = value.split(rspace)

    return this.each(function () {
      var $this = $(this)
      while ((className = classNames[i++])) {
        $this.hasClass(className)
          ? $this.removeClass(className)
          : $this.addClass(className)
      }
    })
  }
}

function $(selector, context) {
  var doms
  if (!selector) {
    return new Bin()
  } else if (typeof selector === 'string') { // html标签文本，选择器
    selector = selector.trim()

    if (selector[0] === '<' && fragmentRE.test(selector)) {
      doms = fragment(selector, RegExp.$1, context)
      selector = null
    } else if (context !== undefined) {
      return '$(context).find(selector)'
    } else {
      doms = qsa(document, selector)
    }
  } else if (isFunction(selector)) { // 方法
    return '$(document).ready(selector)'
  } else if (selector instanceof Bin) { // $对象
    return selector
  } else {
    if (isArray(selector)) {// 数组
      doms = compact(selector)
    } else if (isObject(selector)) {// 纯对象 {}
      doms = [selector]
      selector = null
    } else {
      doms = qsa(document, selector)
    }
  }
  return new Bin(doms)
}

$.map = function (elements, callback) {
  var value, values = [], i, key
  if (likeArray(elements)) {
    for (i = 0; i < elements.length; i++) {
      value = callback(elements[i], i)
      if (value != null) values.push(value)
    }
  } else {
    for (key in elements) {
      value = callback[elements[key], i]
      if (value != null) values.push(value)
    }
  }
  return [].concat(...values)
}

$.each = function (elements, callback) {
  var i, key
  if (likeArray(elements)) {
    for (i = 0; i < elements.length; i++)
      if (callback.call(elements[i], i, elements[i]) === false) return elements
  } else {
    for (key in elements)
      if (callback.call(elements[key], key, elements[key]) === false) return elements
  }

  return elements
}

$.contains = document.documentElement.contains ?
  function (parent, node) {
    return parent !== node && parent.contains(node)
  } :
  function (parent, node) {
    while (node && (node = node.parentNode))
      if (node === parent) return true
    return false
  }

$.fn = Bin.prototype

// Generate the `width` and `height` functions
;['width', 'height'].forEach(function (dimension) {
  var dimensionProperty =
    dimension.replace(/./, function (m) {
      return m[0].toUpperCase()
    })

  $.fn[dimension] = function (value) {
    var offset, el = this[0]
    if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
      isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
    else return this.each(function (idx) {
      el = $(this)
      el.css(dimension, funcArg(this, value, idx, el[dimension]()))
    })
  }
})

export {$ as default}
