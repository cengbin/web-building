/**
 *将 word-word 的形式的字符串转换成 wordWord 的形式， - 可以为一个或多个。
 * */
export function camelize(str) {
  // console.log('cameliza param str is:',str)
  return str.replace(/-+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : ''
  })
}

/**
 * 将驼峰式的写法转换成连字符 - 的写法。
 * */
export function dasherize(str) {
  return str.replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

let cssNumber = {
  'column-count': 1,
  'columns': 1,
  'font-weight': 1,
  'line-height': 1,
  'opacity': 1,
  'z-index': 1,
  'zoom': 1
}

/**
 * 数值是否添加单位
 * */
export function maybeAddPx(name, value) {
  return (typeof value === 'number' && !cssNumber[dasherize(name)]) ? value + 'px' : value
}