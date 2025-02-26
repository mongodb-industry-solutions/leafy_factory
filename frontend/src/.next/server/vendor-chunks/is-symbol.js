"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-symbol";
exports.ids = ["vendor-chunks/is-symbol"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-symbol/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-symbol/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\nvar $toString = callBound('Object.prototype.toString');\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"(ssr)/./node_modules/has-symbols/index.js\")();\nvar safeRegexTest = __webpack_require__(/*! safe-regex-test */ \"(ssr)/./node_modules/safe-regex-test/index.js\");\n\nif (hasSymbols) {\n\tvar $symToStr = callBound('Symbol.prototype.toString');\n\tvar isSymString = safeRegexTest(/^Symbol\\(.*\\)$/);\n\n\t/** @type {(value: object) => value is Symbol} */\n\tvar isSymbolObject = function isRealSymbolObject(value) {\n\t\tif (typeof value.valueOf() !== 'symbol') {\n\t\t\treturn false;\n\t\t}\n\t\treturn isSymString($symToStr(value));\n\t};\n\n\t/** @type {import('.')} */\n\tmodule.exports = function isSymbol(value) {\n\t\tif (typeof value === 'symbol') {\n\t\t\treturn true;\n\t\t}\n\t\tif (!value || typeof value !== 'object' || $toString(value) !== '[object Symbol]') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\treturn isSymbolObject(value);\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t};\n} else {\n\t/** @type {import('.')} */\n\tmodule.exports = function isSymbol(value) {\n\t\t// this environment does not support Symbols.\n\t\treturn  false && 0;\n\t};\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc3ltYm9sL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsOERBQWE7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsc0VBQWlCOztBQUU3QztBQUNBO0FBQ0E7O0FBRUEsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0EsU0FBUyxNQUFLLElBQUksQ0FBSztBQUN2QjtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvdGVzdC9Eb2N1bWVudHMvR2l0SHViL2xlYWZ5X2ZhY3RvcnkvZnJvbnRlbmQvc3JjL25vZGVfbW9kdWxlcy9pcy1zeW1ib2wvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG52YXIgc2FmZVJlZ2V4VGVzdCA9IHJlcXVpcmUoJ3NhZmUtcmVnZXgtdGVzdCcpO1xuXG5pZiAoaGFzU3ltYm9scykge1xuXHR2YXIgJHN5bVRvU3RyID0gY2FsbEJvdW5kKCdTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nJyk7XG5cdHZhciBpc1N5bVN0cmluZyA9IHNhZmVSZWdleFRlc3QoL15TeW1ib2xcXCguKlxcKSQvKTtcblxuXHQvKiogQHR5cGUgeyh2YWx1ZTogb2JqZWN0KSA9PiB2YWx1ZSBpcyBTeW1ib2x9ICovXG5cdHZhciBpc1N5bWJvbE9iamVjdCA9IGZ1bmN0aW9uIGlzUmVhbFN5bWJvbE9iamVjdCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUudmFsdWVPZigpICE9PSAnc3ltYm9sJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gaXNTeW1TdHJpbmcoJHN5bVRvU3RyKHZhbHVlKSk7XG5cdH07XG5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8ICR0b1N0cmluZyh2YWx1ZSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gaXNTeW1ib2xPYmplY3QodmFsdWUpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG59IGVsc2Uge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG5cdFx0Ly8gdGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IFN5bWJvbHMuXG5cdFx0cmV0dXJuIGZhbHNlICYmIHZhbHVlO1xuXHR9O1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-symbol/index.js\n");

/***/ })

};
;