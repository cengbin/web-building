/**
 * 解析url
 * @param {String} url 需要解析的地址
 * @return {Object} 解析url后的对象
 *
 * @example parseURL(window.location.href)
 * */
function parseURL (url) {
  var a = document.createElement('a');
  a.href = url;
  return {
    origin: a.origin,
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: parseQuery(a.search),
    file: (a.pathname.match(/([^/?#]+)$/i) || [, ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^/])/, '/$1'),
    relative: (a.href.match(/tps?:\/[^/]+(.+)/) || [, ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  };
}

function parseQuery (query) {
  var ret = {},
    seg = query.trim().replace(/^(\?|#|&)/, '').split('&'),
    i = 0,
    len = seg.length,
    s;
  for (; i < len; i++) {
    if (!seg[i]) {
      continue;
    }
    s = seg[i].split('=');
    ret[s[0]] = s[1];
  }
  return ret;
}

/**
 * 为url添加变量.
 * @param {String} url
 * @param {String|Object} name
 *    为字符串类型时参数作为新增参数的名称，第三个参数不能缺省
 *    为对象类型时参数为要增加的参数集合，属性为参数名称，值为参数值
 * @param {String} value 变量值
 * @return {String} 新的url
 * */
function urlAddParam (url, name, value) {
  // 分割url，arr[1] 为头部，arr[2]为参数，arr[3]为hash
  var arr = url.match(/([^\?#]*\??)([^#]*)?(#.*)?/)
  var prefix = arr[1]
  var param = arr[2]

  if (param) {
    prefix += param + '&'
  } else if (arr[1].indexOf('?') === -1) {
    prefix += '?'
  }
  var newParam = ''
  if (typeof name === 'object') {
    for (var key in name) {
      newParam += '&' + key + '=' + encodeURIComponent(name[key])
    }
    newParam = newParam.substr(1)
  } else {
    newParam = name + '=' + encodeURIComponent(value)
  }
  return prefix + newParam + (arr[3] || '')
}