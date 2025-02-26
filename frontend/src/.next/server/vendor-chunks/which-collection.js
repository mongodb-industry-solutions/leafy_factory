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

eval("\n\nvar isMap = __webpack_require__(/*! is-map */ \"(ssr)/./node_modules/is-map/index.js\");\nvar isSet = __webpack_require__(/*! is-set */ \"(ssr)/./node_modules/is-set/index.js\");\nvar isWeakMap = __webpack_require__(/*! is-weakmap */ \"(ssr)/./node_modules/is-weakmap/index.js\");\nvar isWeakSet = __webpack_require__(/*! is-weakset */ \"(ssr)/./node_modules/is-weakset/index.js\");\n\n/** @type {import('.')} */\nmodule.exports = function whichCollection(/** @type {unknown} */ value) {\n\tif (value && typeof value === 'object') {\n\t\tif (isMap(value)) {\n\t\t\treturn 'Map';\n\t\t}\n\t\tif (isSet(value)) {\n\t\t\treturn 'Set';\n\t\t}\n\t\tif (isWeakMap(value)) {\n\t\t\treturn 'WeakMap';\n\t\t}\n\t\tif (isWeakSet(value)) {\n\t\t\treturn 'WeakSet';\n\t\t}\n\t}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hpY2gtY29sbGVjdGlvbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsb0RBQVE7QUFDNUIsWUFBWSxtQkFBTyxDQUFDLG9EQUFRO0FBQzVCLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZO0FBQ3BDLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZOztBQUVwQyxXQUFXLGFBQWE7QUFDeEIscURBQXFELFNBQVM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy90ZXN0L0RvY3VtZW50cy9HaXRIdWIvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL3doaWNoLWNvbGxlY3Rpb24vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNNYXAgPSByZXF1aXJlKCdpcy1tYXAnKTtcbnZhciBpc1NldCA9IHJlcXVpcmUoJ2lzLXNldCcpO1xudmFyIGlzV2Vha01hcCA9IHJlcXVpcmUoJ2lzLXdlYWttYXAnKTtcbnZhciBpc1dlYWtTZXQgPSByZXF1aXJlKCdpcy13ZWFrc2V0Jyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoQ29sbGVjdGlvbigvKiogQHR5cGUge3Vua25vd259ICovIHZhbHVlKSB7XG5cdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0aWYgKGlzTWFwKHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuICdNYXAnO1xuXHRcdH1cblx0XHRpZiAoaXNTZXQodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ1NldCc7XG5cdFx0fVxuXHRcdGlmIChpc1dlYWtNYXAodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ1dlYWtNYXAnO1xuXHRcdH1cblx0XHRpZiAoaXNXZWFrU2V0KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuICdXZWFrU2V0Jztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/which-collection/index.js\n");

/***/ })

};
;