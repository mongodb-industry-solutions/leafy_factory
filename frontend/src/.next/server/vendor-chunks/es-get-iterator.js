"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/es-get-iterator";
exports.ids = ["vendor-chunks/es-get-iterator"];
exports.modules = {

/***/ "(ssr)/./node_modules/es-get-iterator/node.js":
/*!**********************************************!*\
  !*** ./node_modules/es-get-iterator/node.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\n// this should only run in node >= 13.2, so it\n// does not need any of the intense fallbacks that old node/browsers do\n\nvar $iterator = Symbol.iterator;\nmodule.exports = function getIterator(iterable) {\n\t// alternatively, `iterable[$iterator]?.()`\n\tif (iterable != null && typeof iterable[$iterator] !== 'undefined') {\n\t\treturn iterable[$iterator]();\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXMtZ2V0LWl0ZXJhdG9yL25vZGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL3Rlc3QvRG9jdW1lbnRzL0dpdEh1Yi9sZWFmeV9mYWN0b3J5L2Zyb250ZW5kL3NyYy9ub2RlX21vZHVsZXMvZXMtZ2V0LWl0ZXJhdG9yL25vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyB0aGlzIHNob3VsZCBvbmx5IHJ1biBpbiBub2RlID49IDEzLjIsIHNvIGl0XG4vLyBkb2VzIG5vdCBuZWVkIGFueSBvZiB0aGUgaW50ZW5zZSBmYWxsYmFja3MgdGhhdCBvbGQgbm9kZS9icm93c2VycyBkb1xuXG52YXIgJGl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRJdGVyYXRvcihpdGVyYWJsZSkge1xuXHQvLyBhbHRlcm5hdGl2ZWx5LCBgaXRlcmFibGVbJGl0ZXJhdG9yXT8uKClgXG5cdGlmIChpdGVyYWJsZSAhPSBudWxsICYmIHR5cGVvZiBpdGVyYWJsZVskaXRlcmF0b3JdICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBpdGVyYWJsZVskaXRlcmF0b3JdKCk7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/es-get-iterator/node.js\n");

/***/ })

};
;