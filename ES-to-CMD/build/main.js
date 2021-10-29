define('build/main' ,function (require, exports, module) {
"use strict";

var _message = require('build/message');

console.log(_message.message);
document.write(_message.message);
})
