"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-bigint";
exports.ids = ["vendor-chunks/is-bigint"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-bigint/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-bigint/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar hasBigInts = __webpack_require__(/*! has-bigints */ \"(ssr)/./node_modules/has-bigints/index.js\")();\n\nif (hasBigInts) {\n\tvar bigIntValueOf = BigInt.prototype.valueOf;\n\t/** @type {(value: object) => value is BigInt} */\n\tvar tryBigInt = function tryBigIntObject(value) {\n\t\ttry {\n\t\t\tbigIntValueOf.call(value);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t}\n\t\treturn false;\n\t};\n\n\t/** @type {import('.')} */\n\tmodule.exports = function isBigInt(value) {\n\t\tif (\n\t\t\tvalue === null\n\t\t\t|| typeof value === 'undefined'\n\t\t\t|| typeof value === 'boolean'\n\t\t\t|| typeof value === 'string'\n\t\t\t|| typeof value === 'number'\n\t\t\t|| typeof value === 'symbol'\n\t\t\t|| typeof value === 'function'\n\t\t) {\n\t\t\treturn false;\n\t\t}\n\t\tif (typeof value === 'bigint') {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn tryBigInt(value);\n\t};\n} else {\n\t/** @type {import('.')} */\n\tmodule.exports = function isBigInt(value) {\n\t\treturn  false && 0;\n\t};\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtYmlnaW50L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLDhEQUFhOztBQUV0QztBQUNBO0FBQ0EsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRixZQUFZLGFBQWE7QUFDekI7QUFDQSxTQUFTLE1BQUssSUFBSSxDQUFLO0FBQ3ZCO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy90ZXN0L0RvY3VtZW50cy9HaXRIdWIvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL2lzLWJpZ2ludC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNCaWdJbnRzID0gcmVxdWlyZSgnaGFzLWJpZ2ludHMnKSgpO1xuXG5pZiAoaGFzQmlnSW50cykge1xuXHR2YXIgYmlnSW50VmFsdWVPZiA9IEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZjtcblx0LyoqIEB0eXBlIHsodmFsdWU6IG9iamVjdCkgPT4gdmFsdWUgaXMgQmlnSW50fSAqL1xuXHR2YXIgdHJ5QmlnSW50ID0gZnVuY3Rpb24gdHJ5QmlnSW50T2JqZWN0KHZhbHVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGJpZ0ludFZhbHVlT2YuY2FsbCh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQmlnSW50KHZhbHVlKSB7XG5cdFx0aWYgKFxuXHRcdFx0dmFsdWUgPT09IG51bGxcblx0XHRcdHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCdcblx0XHRcdHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG5cdFx0XHR8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG5cdFx0XHR8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG5cdFx0XHR8fCB0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnXG5cdFx0XHR8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcblx0XHQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnlCaWdJbnQodmFsdWUpO1xuXHR9O1xufSBlbHNlIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0JpZ0ludCh2YWx1ZSkge1xuXHRcdHJldHVybiBmYWxzZSAmJiB2YWx1ZTtcblx0fTtcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-bigint/index.js\n");

/***/ })

};
;