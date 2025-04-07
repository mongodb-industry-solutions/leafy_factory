"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/array-buffer-byte-length";
exports.ids = ["vendor-chunks/array-buffer-byte-length"];
exports.modules = {

/***/ "(ssr)/./node_modules/array-buffer-byte-length/index.js":
/*!********************************************************!*\
  !*** ./node_modules/array-buffer-byte-length/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\nvar $byteLength = callBound('ArrayBuffer.prototype.byteLength', true);\n\nvar isArrayBuffer = __webpack_require__(/*! is-array-buffer */ \"(ssr)/./node_modules/is-array-buffer/index.js\");\n\n/** @type {import('.')} */\nmodule.exports = function byteLength(ab) {\n\tif (!isArrayBuffer(ab)) {\n\t\treturn NaN;\n\t}\n\treturn $byteLength ? $byteLength(ab) : ab.byteLength;\n}; // in node < 0.11, byteLength is an own nonconfigurable property\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYXJyYXktYnVmZmVyLWJ5dGUtbGVuZ3RoL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDOztBQUVBLG9CQUFvQixtQkFBTyxDQUFDLHNFQUFpQjs7QUFFN0MsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHIiwic291cmNlcyI6WyIvVXNlcnMvdGVzdC9Eb2N1bWVudHMvR2l0SHViL2xlYWZ5X2ZhY3RvcnkvZnJvbnRlbmQvc3JjL25vZGVfbW9kdWxlcy9hcnJheS1idWZmZXItYnl0ZS1sZW5ndGgvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyICRieXRlTGVuZ3RoID0gY2FsbEJvdW5kKCdBcnJheUJ1ZmZlci5wcm90b3R5cGUuYnl0ZUxlbmd0aCcsIHRydWUpO1xuXG52YXIgaXNBcnJheUJ1ZmZlciA9IHJlcXVpcmUoJ2lzLWFycmF5LWJ1ZmZlcicpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBieXRlTGVuZ3RoKGFiKSB7XG5cdGlmICghaXNBcnJheUJ1ZmZlcihhYikpIHtcblx0XHRyZXR1cm4gTmFOO1xuXHR9XG5cdHJldHVybiAkYnl0ZUxlbmd0aCA/ICRieXRlTGVuZ3RoKGFiKSA6IGFiLmJ5dGVMZW5ndGg7XG59OyAvLyBpbiBub2RlIDwgMC4xMSwgYnl0ZUxlbmd0aCBpcyBhbiBvd24gbm9uY29uZmlndXJhYmxlIHByb3BlcnR5XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/array-buffer-byte-length/index.js\n");

/***/ })

};
;