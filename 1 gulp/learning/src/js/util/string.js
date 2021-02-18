(function () {
  let proto = String.prototype

  /**
   * 判断是否为空字符
   * */
  proto.isEmpty = function () {
    return this.trim().length === 0
  }

  /**
   * 在指定地方插入字符
   * @param {string} flg 要插入的字符串
   * @param {number} sn 要插入的位置
   * */
  proto.insertStr = function (flg, sn) {
    var a = this.slice(0, sn)
    var b = this.slice(sn)
    return a + flg + b
  }


  /**
   * 删除指定地方的字符
   * @param {number} sn 要删除的位置
   * @param {number} len 删除字符的长度
   * */
  proto.deleteStr = function (sn, len) {
    len = len || 1
    var arr = this.split('')
    arr.splice(sn - 1, len)
    return arr.join('')
  }

  /**
   * 随机A-Z|a-z|0-9 中的随机组合
   * @param {number} 随机组合的长度
   * @example String.prototype.randomString(); & ''.randomString();
   * @return {string} 随机组合的字符
   * */
  proto.randomStr = function (len) {
    len = len || 32
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
      maxPos = $chars.length,
      i = 0,
      pwd = ''
    for (i; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }

  /**
   * 将字符串中的指定字符全部替换成另一个字符
   * @param str 整个字符串
   * @param a 要被替换的字符
   * @param b 替换成这个字符
   * @param mm 匹配模式 (g:全局匹配 i:区分大小写 m:多行匹配)
   * */
  function strReplace (str, a, b, mm) {
    mm = mm || ''
    return str.replace(new RegExp(a, mm), b)
  }

  /**
   * 补位，给指定字符串前面补位，用指定的字符补位，默认为空格
   * @param str 指定字符
   * @param len 补几位
   * @param ch 补什么字符
   * */
  function leftpad (str, len, ch) {
    str = String(str)
    var i = -1
    if (!ch && ch !== 0) ch = ' '
    while (++i < len) {
      str = ch + str
    }
    return str
  }

  /**
   * 截取指定长度的中英文混合字符串
   * @param {String} str string to be intercepted
   * @param {Number} len intercept length (double in Chinese characters)
   * @return {String} 截取后的字符
   * */
  function sub (str, len) {
    var newLength = 0
    var newStr = ''
    // eslint-disable-next-line
    var chineseRegex = /[^\x00-\xff]/g
    var singleChar = ''
    var strLength = str.replace(chineseRegex, '**').length
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString()
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2
      } else {
        newLength++
      }
      if (newLength > len) {
        break
      }
      newStr += singleChar
    }

    if (strLength > len) {
      newStr += '...'
    }
    return newStr
  }

  /**
   * Intercept the mixed Chinese and English mixed strings of the specified length
   * @param {String} str string to be intercepted
   * @param {Number} n intercept length (double in Chinese characters)
   * @return {String} intercepted string
   */
  function subString2 (str, n) {
    // eslint-disable-next-line
    var r = /[ ^ \x00 - \xff ]/g
    var m
    if (str.replace(r, ' ** ').length > n) {
      m = Math.floor(n / 2)
      for (var i = m, l = str.length; i < l; i++) {
        if (str.substr(0, i).replace(r, ' ** ').length >= n) {
          return str.substr(0, i)
        }
      }
    }
    return str
  }
}());

