(function(modules) {

  ...

	// The require function
	function __webpack_require__(moduleId) {

		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.l = true;

		// Return the exports of the module
		return module.exports;
	}

  ...

	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
})
({"./src/main.ts":(function(module, exports, __webpack_require__) {

    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    var __importDefault = (this && this.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./message.js */ "./src/message.js")],
      __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, message_js_1) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      message_js_1 = __importDefault(message_js_1);
      console.log(message_js_1.default);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


}),

"./src/message.js":(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./name.js */ "./src/name.js");


/* harmony default export */ __webpack_exports__["default"] = ('hello ' + _name_js__WEBPACK_IMPORTED_MODULE_0__["nikename"]);

}),

"./src/name.js":(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nikename", function() { return nikename; });
var nikename = 'A Bin';

})

});