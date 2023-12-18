define('build/message' ,function (require, exports, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.message = void 0;

var _user = require('build/user');

var message = "\u59D3\u540D:".concat(_user.name, ",\u6027\u522B:").concat(_user.sex, ",\u5E74\u9F84:").concat(_user.age, ",\u4E1A\u4F59\u7231\u597D:").concat(_user.hobby);
exports.message = message;
})
