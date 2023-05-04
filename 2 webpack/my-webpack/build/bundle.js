(function (modules) {
  var installedModules = {};

  function require (moduleId) {

    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = installedModules[moduleId] = {
      i: moduleId,
      exports: {}
    };

    var factory = modules[moduleId];

    factory.call(module.exports, module, module.exports, require);

    return module.exports;
  }

  require('src/main.js');
})({
  'src/main.js': function (module, exports, require) {
    "use strict";

var _message = _interopRequireDefault(require("src/message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msg = _message.default;
console.log(msg);
  },
  'src/message.js': function (module, exports, require) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _name = require("src/name.js");

var _math = _interopRequireDefault(require("src/math.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = "hello ".concat(_name.nikename);

exports.default = _default;
  },
  'src/name.js': function (module, exports, require) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nikename = void 0;

var _math = _interopRequireDefault(require("src/math.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nikename = '曾彬';
exports.nikename = nikename;
  },
  'src/math.js': function (module, exports, require) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a + b;
}
  },
  }
);