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

eval("\n\n// this should only run in node >= 13.2, so it\n// does not need any of the intense fallbacks that old node/browsers do\n\nvar $iterator = Symbol.iterator;\nmodule.exports = function getIterator(iterable) {\n\t// alternatively, `iterable[$iterator]?.()`\n\tif (iterable != null && typeof iterable[$iterator] !== 'undefined') {\n\t\treturn iterable[$iterator]();\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXMtZ2V0LWl0ZXJhdG9yL25vZGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2dpby5yb2RyaWd1ZXovRG9jdW1lbnRzL2dpdGh1Yl9yZXBvc2l0b3JpZXMvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL2VzLWdldC1pdGVyYXRvci9ub2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8gdGhpcyBzaG91bGQgb25seSBydW4gaW4gbm9kZSA+PSAxMy4yLCBzbyBpdFxuLy8gZG9lcyBub3QgbmVlZCBhbnkgb2YgdGhlIGludGVuc2UgZmFsbGJhY2tzIHRoYXQgb2xkIG5vZGUvYnJvd3NlcnMgZG9cblxudmFyICRpdGVyYXRvciA9IFN5bWJvbC5pdGVyYXRvcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0SXRlcmF0b3IoaXRlcmFibGUpIHtcblx0Ly8gYWx0ZXJuYXRpdmVseSwgYGl0ZXJhYmxlWyRpdGVyYXRvcl0/LigpYFxuXHRpZiAoaXRlcmFibGUgIT0gbnVsbCAmJiB0eXBlb2YgaXRlcmFibGVbJGl0ZXJhdG9yXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gaXRlcmFibGVbJGl0ZXJhdG9yXSgpO1xuXHR9XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/es-get-iterator/node.js\n");

/***/ })

};
;