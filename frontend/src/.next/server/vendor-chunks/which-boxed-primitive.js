"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/which-boxed-primitive";
exports.ids = ["vendor-chunks/which-boxed-primitive"];
exports.modules = {

/***/ "(ssr)/./node_modules/which-boxed-primitive/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/which-boxed-primitive/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isString = __webpack_require__(/*! is-string */ \"(ssr)/./node_modules/is-string/index.js\");\nvar isNumber = __webpack_require__(/*! is-number-object */ \"(ssr)/./node_modules/is-number-object/index.js\");\nvar isBoolean = __webpack_require__(/*! is-boolean-object */ \"(ssr)/./node_modules/is-boolean-object/index.js\");\nvar isSymbol = __webpack_require__(/*! is-symbol */ \"(ssr)/./node_modules/is-symbol/index.js\");\nvar isBigInt = __webpack_require__(/*! is-bigint */ \"(ssr)/./node_modules/is-bigint/index.js\");\n\n/** @type {import('.')} */\n// eslint-disable-next-line consistent-return\nmodule.exports = function whichBoxedPrimitive(value) {\n\t// eslint-disable-next-line eqeqeq\n\tif (value == null || (typeof value !== 'object' && typeof value !== 'function')) {\n\t\treturn null;\n\t}\n\tif (isString(value)) {\n\t\treturn 'String';\n\t}\n\tif (isNumber(value)) {\n\t\treturn 'Number';\n\t}\n\tif (isBoolean(value)) {\n\t\treturn 'Boolean';\n\t}\n\tif (isSymbol(value)) {\n\t\treturn 'Symbol';\n\t}\n\tif (isBigInt(value)) {\n\t\treturn 'BigInt';\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hpY2gtYm94ZWQtcHJpbWl0aXZlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGVBQWUsbUJBQU8sQ0FBQywwREFBVztBQUNsQyxlQUFlLG1CQUFPLENBQUMsd0VBQWtCO0FBQ3pDLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFtQjtBQUMzQyxlQUFlLG1CQUFPLENBQUMsMERBQVc7QUFDbEMsZUFBZSxtQkFBTyxDQUFDLDBEQUFXOztBQUVsQyxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy90ZXN0L0RvY3VtZW50cy9HaXRIdWIvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL3doaWNoLWJveGVkLXByaW1pdGl2ZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc1N0cmluZyA9IHJlcXVpcmUoJ2lzLXN0cmluZycpO1xudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnaXMtbnVtYmVyLW9iamVjdCcpO1xudmFyIGlzQm9vbGVhbiA9IHJlcXVpcmUoJ2lzLWJvb2xlYW4tb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCdpcy1zeW1ib2wnKTtcbnZhciBpc0JpZ0ludCA9IHJlcXVpcmUoJ2lzLWJpZ2ludCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoQm94ZWRQcmltaXRpdmUodmFsdWUpIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAodmFsdWUgPT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdHJldHVybiAnU3RyaW5nJztcblx0fVxuXHRpZiAoaXNOdW1iZXIodmFsdWUpKSB7XG5cdFx0cmV0dXJuICdOdW1iZXInO1xuXHR9XG5cdGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG5cdFx0cmV0dXJuICdCb29sZWFuJztcblx0fVxuXHRpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG5cdFx0cmV0dXJuICdTeW1ib2wnO1xuXHR9XG5cdGlmIChpc0JpZ0ludCh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ0JpZ0ludCc7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/which-boxed-primitive/index.js\n");

/***/ })

};
;