"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-shared-array-buffer";
exports.ids = ["vendor-chunks/is-shared-array-buffer"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-shared-array-buffer/index.js":
/*!******************************************************!*\
  !*** ./node_modules/is-shared-array-buffer/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\n/** @type {undefined | ((thisArg: SharedArrayBuffer) => number)} */\nvar $byteLength = callBound('SharedArrayBuffer.prototype.byteLength', true);\n\n/** @type {import('.')} */\nmodule.exports = $byteLength\n\t? function isSharedArrayBuffer(obj) {\n\t\tif (!obj || typeof obj !== 'object') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\t// @ts-expect-error TS can't figure out this closed-over variable is non-nullable, and it's fine that `obj` might not be a SAB\n\t\t\t$byteLength(obj);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t}\n\t: function isSharedArrayBuffer(_obj) { // eslint-disable-line no-unused-vars\n\t\treturn false;\n\t};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc2hhcmVkLWFycmF5LWJ1ZmZlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw0REFBWTs7QUFFcEMsV0FBVyxzREFBc0Q7QUFDakU7O0FBRUEsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL3Rlc3QvRG9jdW1lbnRzL0dpdEh1Yi9sZWFmeV9mYWN0b3J5L2Zyb250ZW5kL3NyYy9ub2RlX21vZHVsZXMvaXMtc2hhcmVkLWFycmF5LWJ1ZmZlci9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJvdW5kJyk7XG5cbi8qKiBAdHlwZSB7dW5kZWZpbmVkIHwgKCh0aGlzQXJnOiBTaGFyZWRBcnJheUJ1ZmZlcikgPT4gbnVtYmVyKX0gKi9cbnZhciAkYnl0ZUxlbmd0aCA9IGNhbGxCb3VuZCgnU2hhcmVkQXJyYXlCdWZmZXIucHJvdG90eXBlLmJ5dGVMZW5ndGgnLCB0cnVlKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gJGJ5dGVMZW5ndGhcblx0PyBmdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKG9iaikge1xuXHRcdGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGNhbid0IGZpZ3VyZSBvdXQgdGhpcyBjbG9zZWQtb3ZlciB2YXJpYWJsZSBpcyBub24tbnVsbGFibGUsIGFuZCBpdCdzIGZpbmUgdGhhdCBgb2JqYCBtaWdodCBub3QgYmUgYSBTQUJcblx0XHRcdCRieXRlTGVuZ3RoKG9iaik7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdDogZnVuY3Rpb24gaXNTaGFyZWRBcnJheUJ1ZmZlcihfb2JqKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-shared-array-buffer/index.js\n");

/***/ })

};
;