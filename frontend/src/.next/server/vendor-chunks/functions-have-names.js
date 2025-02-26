"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/functions-have-names";
exports.ids = ["vendor-chunks/functions-have-names"];
exports.modules = {

/***/ "(ssr)/./node_modules/functions-have-names/index.js":
/*!****************************************************!*\
  !*** ./node_modules/functions-have-names/index.js ***!
  \****************************************************/
/***/ ((module) => {

eval("\n\nvar functionsHaveNames = function functionsHaveNames() {\n\treturn typeof function f() {}.name === 'string';\n};\n\nvar gOPD = Object.getOwnPropertyDescriptor;\nif (gOPD) {\n\ttry {\n\t\tgOPD([], 'length');\n\t} catch (e) {\n\t\t// IE 8 has a broken gOPD\n\t\tgOPD = null;\n\t}\n}\n\nfunctionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {\n\tif (!functionsHaveNames() || !gOPD) {\n\t\treturn false;\n\t}\n\tvar desc = gOPD(function () {}, 'name');\n\treturn !!desc && !!desc.configurable;\n};\n\nvar $bind = Function.prototype.bind;\n\nfunctionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {\n\treturn functionsHaveNames() && typeof $bind === 'function' && function f() {}.bind().name !== '';\n};\n\nmodule.exports = functionsHaveNames;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZnVuY3Rpb25zLWhhdmUtbmFtZXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhFQUE4RTtBQUM5RTs7QUFFQSIsInNvdXJjZXMiOlsiL1VzZXJzL3Rlc3QvRG9jdW1lbnRzL0dpdEh1Yi9sZWFmeV9mYWN0b3J5L2Zyb250ZW5kL3NyYy9ub2RlX21vZHVsZXMvZnVuY3Rpb25zLWhhdmUtbmFtZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZnVuY3Rpb25zSGF2ZU5hbWVzID0gZnVuY3Rpb24gZnVuY3Rpb25zSGF2ZU5hbWVzKCkge1xuXHRyZXR1cm4gdHlwZW9mIGZ1bmN0aW9uIGYoKSB7fS5uYW1lID09PSAnc3RyaW5nJztcbn07XG5cbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmIChnT1BEKSB7XG5cdHRyeSB7XG5cdFx0Z09QRChbXSwgJ2xlbmd0aCcpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZ09QRFxuXHRcdGdPUEQgPSBudWxsO1xuXHR9XG59XG5cbmZ1bmN0aW9uc0hhdmVOYW1lcy5mdW5jdGlvbnNIYXZlQ29uZmlndXJhYmxlTmFtZXMgPSBmdW5jdGlvbiBmdW5jdGlvbnNIYXZlQ29uZmlndXJhYmxlTmFtZXMoKSB7XG5cdGlmICghZnVuY3Rpb25zSGF2ZU5hbWVzKCkgfHwgIWdPUEQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dmFyIGRlc2MgPSBnT1BEKGZ1bmN0aW9uICgpIHt9LCAnbmFtZScpO1xuXHRyZXR1cm4gISFkZXNjICYmICEhZGVzYy5jb25maWd1cmFibGU7XG59O1xuXG52YXIgJGJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcblxuZnVuY3Rpb25zSGF2ZU5hbWVzLmJvdW5kRnVuY3Rpb25zSGF2ZU5hbWVzID0gZnVuY3Rpb24gYm91bmRGdW5jdGlvbnNIYXZlTmFtZXMoKSB7XG5cdHJldHVybiBmdW5jdGlvbnNIYXZlTmFtZXMoKSAmJiB0eXBlb2YgJGJpbmQgPT09ICdmdW5jdGlvbicgJiYgZnVuY3Rpb24gZigpIHt9LmJpbmQoKS5uYW1lICE9PSAnJztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb25zSGF2ZU5hbWVzO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/functions-have-names/index.js\n");

/***/ })

};
;