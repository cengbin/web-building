(function () {
  let proto = Array.prototype

  /**
   * 洗牌算法 打乱数组
   * @return 打乱后的数组
   * */
  proto.shuffle = function () {
    var i, t, m = this.length
    while (m) {
      i = Math.floor(Math.random() * m--)
      t = this[m]
      this[m] = this[i]
      this[i] = t
    }
    return this
  }

  /**
   * 获取数组中的 最小值|最大值
   * @param {string} str {'min'|'max'}
   * @return 数组中的一个值
   * */
  proto.getValue = function (str) {
    var arr = this
    var value = arr[0]
    for (var i = 1; i < arr.length; i++) {
      if (str === 'min' && value > arr[i]) {
        value = arr[i]
      } else if (str === 'max' && value < arr[i]) {
        value = arr[i]
      }
    }
    return value
  }
}());