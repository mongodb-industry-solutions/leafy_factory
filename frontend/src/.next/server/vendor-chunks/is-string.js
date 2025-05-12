"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-string";
exports.ids = ["vendor-chunks/is-string"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-string/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-string/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\n/** @type {(receiver: ThisParameterType<typeof String.prototype.valueOf>, ...args: Parameters<typeof String.prototype.valueOf>) => ReturnType<typeof String.prototype.valueOf>} */\nvar $strValueOf = callBound('String.prototype.valueOf');\n\n/** @type {import('.')} */\nvar tryStringObject = function tryStringObject(value) {\n\ttry {\n\t\t$strValueOf(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */\nvar $toString = callBound('Object.prototype.toString');\nvar strClass = '[object String]';\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\n\n/** @type {import('.')} */\nmodule.exports = function isString(value) {\n\tif (typeof value === 'string') {\n\t\treturn true;\n\t}\n\tif (!value || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryStringObject(value) : $toString(value) === strClass;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc3RyaW5nL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZOztBQUVwQyxXQUFXLHFLQUFxSztBQUNoTDs7QUFFQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsV0FBVyx3S0FBd0s7QUFDbkw7QUFDQTtBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDRFQUF1Qjs7QUFFcEQsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2dpby5yb2RyaWd1ZXovRG9jdW1lbnRzL2dpdGh1Yl9yZXBvc2l0b3JpZXMvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL2lzLXN0cmluZy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG5cbi8qKiBAdHlwZSB7KHJlY2VpdmVyOiBUaGlzUGFyYW1ldGVyVHlwZTx0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mPiwgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mPikgPT4gUmV0dXJuVHlwZTx0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mPn0gKi9cbnZhciAkc3RyVmFsdWVPZiA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG52YXIgdHJ5U3RyaW5nT2JqZWN0ID0gZnVuY3Rpb24gdHJ5U3RyaW5nT2JqZWN0KHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0JHN0clZhbHVlT2YodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xuLyoqIEB0eXBlIHsocmVjZWl2ZXI6IFRoaXNQYXJhbWV0ZXJUeXBlPHR5cGVvZiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nPiwgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZz4pID0+IFJldHVyblR5cGU8dHlwZW9mIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc+fSAqL1xudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIHN0ckNsYXNzID0gJ1tvYmplY3QgU3RyaW5nXSc7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSByZXF1aXJlKCdoYXMtdG9zdHJpbmd0YWcvc2hhbXMnKSgpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gaGFzVG9TdHJpbmdUYWcgPyB0cnlTdHJpbmdPYmplY3QodmFsdWUpIDogJHRvU3RyaW5nKHZhbHVlKSA9PT0gc3RyQ2xhc3M7XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-string/index.js\n");

/***/ })

};
;