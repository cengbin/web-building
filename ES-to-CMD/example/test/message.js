define('test/message', function (require, exports, module) {
  var user = require('test/user');

  var {name, sex, age, hobby} = user;

  module.exports = {
    message: `姓名:${name},性别:${sex},年龄:${age},业余爱好:${hobby}`
  }
});