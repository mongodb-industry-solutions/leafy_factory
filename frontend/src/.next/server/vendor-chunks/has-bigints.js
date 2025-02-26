"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-bigints";
exports.ids = ["vendor-chunks/has-bigints"];
exports.modules = {

/***/ "(ssr)/./node_modules/has-bigints/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-bigints/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("\n\nvar $BigInt = typeof BigInt !== 'undefined' && BigInt;\n\n/** @type {import('.')} */\nmodule.exports = function hasNativeBigInts() {\n\treturn typeof $BigInt === 'function'\n\t\t&& typeof BigInt === 'function'\n\t\t&& typeof $BigInt(42) === 'bigint' // eslint-disable-line no-magic-numbers\n\t\t&& typeof BigInt(42) === 'bigint'; // eslint-disable-line no-magic-numbers\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzLWJpZ2ludHMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7O0FBRUEsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDIiwic291cmNlcyI6WyIvVXNlcnMvdGVzdC9Eb2N1bWVudHMvR2l0SHViL2xlYWZ5X2ZhY3RvcnkvZnJvbnRlbmQvc3JjL25vZGVfbW9kdWxlcy9oYXMtYmlnaW50cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciAkQmlnSW50ID0gdHlwZW9mIEJpZ0ludCAhPT0gJ3VuZGVmaW5lZCcgJiYgQmlnSW50O1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNOYXRpdmVCaWdJbnRzKCkge1xuXHRyZXR1cm4gdHlwZW9mICRCaWdJbnQgPT09ICdmdW5jdGlvbidcblx0XHQmJiB0eXBlb2YgQmlnSW50ID09PSAnZnVuY3Rpb24nXG5cdFx0JiYgdHlwZW9mICRCaWdJbnQoNDIpID09PSAnYmlnaW50JyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1hZ2ljLW51bWJlcnNcblx0XHQmJiB0eXBlb2YgQmlnSW50KDQyKSA9PT0gJ2JpZ2ludCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/has-bigints/index.js\n");

/***/ })

};
;