"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/set-function-name";
exports.ids = ["vendor-chunks/set-function-name"];
exports.modules = {

/***/ "(ssr)/./node_modules/set-function-name/index.js":
/*!*************************************************!*\
  !*** ./node_modules/set-function-name/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar define = __webpack_require__(/*! define-data-property */ \"(ssr)/./node_modules/define-data-property/index.js\");\nvar hasDescriptors = __webpack_require__(/*! has-property-descriptors */ \"(ssr)/./node_modules/has-property-descriptors/index.js\")();\nvar functionsHaveConfigurableNames = (__webpack_require__(/*! functions-have-names */ \"(ssr)/./node_modules/functions-have-names/index.js\").functionsHaveConfigurableNames)();\n\nvar $TypeError = __webpack_require__(/*! es-errors/type */ \"(ssr)/./node_modules/es-errors/type.js\");\n\n/** @type {import('.')} */\nmodule.exports = function setFunctionName(fn, name) {\n\tif (typeof fn !== 'function') {\n\t\tthrow new $TypeError('`fn` is not a function');\n\t}\n\tvar loose = arguments.length > 2 && !!arguments[2];\n\tif (!loose || functionsHaveConfigurableNames) {\n\t\tif (hasDescriptors) {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'name', name, true, true);\n\t\t} else {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'name', name);\n\t\t}\n\t}\n\treturn fn;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2V0LWZ1bmN0aW9uLW5hbWUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLGdGQUFzQjtBQUMzQyxxQkFBcUIsbUJBQU8sQ0FBQyx3RkFBMEI7QUFDdkQscUNBQXFDLHNJQUE4RDs7QUFFbkcsaUJBQWlCLG1CQUFPLENBQUMsOERBQWdCOztBQUV6QyxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDLElBQUk7QUFDSixxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvdGVzdC9Eb2N1bWVudHMvR2l0SHViL2xlYWZ5X2ZhY3RvcnkvZnJvbnRlbmQvc3JjL25vZGVfbW9kdWxlcy9zZXQtZnVuY3Rpb24tbmFtZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtZGF0YS1wcm9wZXJ0eScpO1xudmFyIGhhc0Rlc2NyaXB0b3JzID0gcmVxdWlyZSgnaGFzLXByb3BlcnR5LWRlc2NyaXB0b3JzJykoKTtcbnZhciBmdW5jdGlvbnNIYXZlQ29uZmlndXJhYmxlTmFtZXMgPSByZXF1aXJlKCdmdW5jdGlvbnMtaGF2ZS1uYW1lcycpLmZ1bmN0aW9uc0hhdmVDb25maWd1cmFibGVOYW1lcygpO1xuXG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldEZ1bmN0aW9uTmFtZShmbiwgbmFtZSkge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2BmbmAgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0fVxuXHR2YXIgbG9vc2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiAhIWFyZ3VtZW50c1syXTtcblx0aWYgKCFsb29zZSB8fCBmdW5jdGlvbnNIYXZlQ29uZmlndXJhYmxlTmFtZXMpIHtcblx0XHRpZiAoaGFzRGVzY3JpcHRvcnMpIHtcblx0XHRcdGRlZmluZSgvKiogQHR5cGUge1BhcmFtZXRlcnM8ZGVmaW5lPlswXX0gKi8gKGZuKSwgJ25hbWUnLCBuYW1lLCB0cnVlLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVmaW5lKC8qKiBAdHlwZSB7UGFyYW1ldGVyczxkZWZpbmU+WzBdfSAqLyAoZm4pLCAnbmFtZScsIG5hbWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZm47XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/set-function-name/index.js\n");

/***/ })

};
;