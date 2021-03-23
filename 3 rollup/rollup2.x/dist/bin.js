(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MyBundle = {}));
}(this, (function (exports) { 'use strict';

  function plus (a, b) {
    return a + b;
  }

  console.log('name模块调用plus(3,3)=', plus(3, 3));

  let a$1 = 1;
  console.log(a$1);

  const nikename = 'A Bin';

  console.log('message模块调用plus(2,2)=', plus(2, 2));

  let a = 1;
  console.log(a);

  var message = `hello ${nikename}`;

  console.log(message);

  exports.message = message;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
