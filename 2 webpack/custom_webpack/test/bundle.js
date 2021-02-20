(function (modules) {
  function require (moduleId) {
    const factory = modules[moduleId]

    const module = {
      exports: {}
    }

    factory.call(module.exports, module, module.exports, require);

    return module.exports
  }

  require('src/main.js')
})({
  'src/main.js': function (module, exports, require) {
    "use strict";

    var _message = _interopRequireDefault(require("src/message.js"));

    function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : {default: obj}; }

    console.log(_message.default);
  },
  'src/message.js': function (module, exports, require) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _name = require("src/name.js");

    var _default = "hello ".concat(_name.nikename);

    exports.default = _default;
  },
  'src/name.js': function (module, exports, require) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.nikename = void 0;
    var nikename = 'A Bin';
    exports.nikename = nikename;
  },
});