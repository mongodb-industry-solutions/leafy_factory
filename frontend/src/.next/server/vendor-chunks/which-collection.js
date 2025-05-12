"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/which-collection";
exports.ids = ["vendor-chunks/which-collection"];
exports.modules = {

/***/ "(ssr)/./node_modules/which-collection/index.js":
/*!************************************************!*\
  !*** ./node_modules/which-collection/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isMap = __webpack_require__(/*! is-map */ \"(ssr)/./node_modules/is-map/index.js\");\nvar isSet = __webpack_require__(/*! is-set */ \"(ssr)/./node_modules/is-set/index.js\");\nvar isWeakMap = __webpack_require__(/*! is-weakmap */ \"(ssr)/./node_modules/is-weakmap/index.js\");\nvar isWeakSet = __webpack_require__(/*! is-weakset */ \"(ssr)/./node_modules/is-weakset/index.js\");\n\n/** @type {import('.')} */\nmodule.exports = function whichCollection(/** @type {unknown} */ value) {\n\tif (value && typeof value === 'object') {\n\t\tif (isMap(value)) {\n\t\t\treturn 'Map';\n\t\t}\n\t\tif (isSet(value)) {\n\t\t\treturn 'Set';\n\t\t}\n\t\tif (isWeakMap(value)) {\n\t\t\treturn 'WeakMap';\n\t\t}\n\t\tif (isWeakSet(value)) {\n\t\t\treturn 'WeakSet';\n\t\t}\n\t}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hpY2gtY29sbGVjdGlvbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsb0RBQVE7QUFDNUIsWUFBWSxtQkFBTyxDQUFDLG9EQUFRO0FBQzVCLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZOztBQUVwQyxXQUFXLGFBQWE7QUFDeEIscURBQXFELFNBQVM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9naW8ucm9kcmlndWV6L0RvY3VtZW50cy9naXRodWJfcmVwb3NpdG9yaWVzL2xlYWZ5X2ZhY3RvcnkvZnJvbnRlbmQvc3JjL25vZGVfbW9kdWxlcy93aGljaC1jb2xsZWN0aW9uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzTWFwID0gcmVxdWlyZSgnaXMtbWFwJyk7XG52YXIgaXNTZXQgPSByZXF1aXJlKCdpcy1zZXQnKTtcbnZhciBpc1dlYWtNYXAgPSByZXF1aXJlKCdpcy13ZWFrbWFwJyk7XG52YXIgaXNXZWFrU2V0ID0gcmVxdWlyZSgnaXMtd2Vha3NldCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaENvbGxlY3Rpb24oLyoqIEB0eXBlIHt1bmtub3dufSAqLyB2YWx1ZSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdGlmIChpc01hcCh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiAnTWFwJztcblx0XHR9XG5cdFx0aWYgKGlzU2V0KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuICdTZXQnO1xuXHRcdH1cblx0XHRpZiAoaXNXZWFrTWFwKHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuICdXZWFrTWFwJztcblx0XHR9XG5cdFx0aWYgKGlzV2Vha1NldCh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiAnV2Vha1NldCc7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/which-collection/index.js\n");

/***/ })

};
;