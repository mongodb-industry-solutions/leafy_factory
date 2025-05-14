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

eval("\n\nvar define = __webpack_require__(/*! define-data-property */ \"(ssr)/./node_modules/define-data-property/index.js\");\nvar hasDescriptors = __webpack_require__(/*! has-property-descriptors */ \"(ssr)/./node_modules/has-property-descriptors/index.js\")();\nvar functionsHaveConfigurableNames = (__webpack_require__(/*! functions-have-names */ \"(ssr)/./node_modules/functions-have-names/index.js\").functionsHaveConfigurableNames)();\n\nvar $TypeError = __webpack_require__(/*! es-errors/type */ \"(ssr)/./node_modules/es-errors/type.js\");\n\n/** @type {import('.')} */\nmodule.exports = function setFunctionName(fn, name) {\n\tif (typeof fn !== 'function') {\n\t\tthrow new $TypeError('`fn` is not a function');\n\t}\n\tvar loose = arguments.length > 2 && !!arguments[2];\n\tif (!loose || functionsHaveConfigurableNames) {\n\t\tif (hasDescriptors) {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'name', name, true, true);\n\t\t} else {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'name', name);\n\t\t}\n\t}\n\treturn fn;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2V0LWZ1bmN0aW9uLW5hbWUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLGdGQUFzQjtBQUMzQyxxQkFBcUIsbUJBQU8sQ0FBQyx3RkFBMEI7QUFDdkQscUNBQXFDLHNJQUE4RDs7QUFFbkcsaUJBQWlCLG1CQUFPLENBQUMsOERBQWdCOztBQUV6QyxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDLElBQUk7QUFDSixxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvZ2lvLnJvZHJpZ3Vlei9Eb2N1bWVudHMvZ2l0aHViX3JlcG9zaXRvcmllcy9sZWFmeV9mYWN0b3J5L2Zyb250ZW5kL3NyYy9ub2RlX21vZHVsZXMvc2V0LWZ1bmN0aW9uLW5hbWUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLWRhdGEtcHJvcGVydHknKTtcbnZhciBoYXNEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJ2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpKCk7XG52YXIgZnVuY3Rpb25zSGF2ZUNvbmZpZ3VyYWJsZU5hbWVzID0gcmVxdWlyZSgnZnVuY3Rpb25zLWhhdmUtbmFtZXMnKS5mdW5jdGlvbnNIYXZlQ29uZmlndXJhYmxlTmFtZXMoKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXRGdW5jdGlvbk5hbWUoZm4sIG5hbWUpIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgZm5gIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdH1cblx0dmFyIGxvb3NlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgISFhcmd1bWVudHNbMl07XG5cdGlmICghbG9vc2UgfHwgZnVuY3Rpb25zSGF2ZUNvbmZpZ3VyYWJsZU5hbWVzKSB7XG5cdFx0aWYgKGhhc0Rlc2NyaXB0b3JzKSB7XG5cdFx0XHRkZWZpbmUoLyoqIEB0eXBlIHtQYXJhbWV0ZXJzPGRlZmluZT5bMF19ICovIChmbiksICduYW1lJywgbmFtZSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlZmluZSgvKiogQHR5cGUge1BhcmFtZXRlcnM8ZGVmaW5lPlswXX0gKi8gKGZuKSwgJ25hbWUnLCBuYW1lKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZuO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/set-function-name/index.js\n");

/***/ })

};
;