"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-string";
exports.ids = ["vendor-chunks/is-string"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-string/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-string/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bound */ \"(ssr)/./node_modules/call-bound/index.js\");\n\n/** @type {(receiver: ThisParameterType<typeof String.prototype.valueOf>, ...args: Parameters<typeof String.prototype.valueOf>) => ReturnType<typeof String.prototype.valueOf>} */\nvar $strValueOf = callBound('String.prototype.valueOf');\n\n/** @type {import('.')} */\nvar tryStringObject = function tryStringObject(value) {\n\ttry {\n\t\t$strValueOf(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */\nvar $toString = callBound('Object.prototype.toString');\nvar strClass = '[object String]';\nvar hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ \"(ssr)/./node_modules/has-tostringtag/shams.js\")();\n\n/** @type {import('.')} */\nmodule.exports = function isString(value) {\n\tif (typeof value === 'string') {\n\t\treturn true;\n\t}\n\tif (!value || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryStringObject(value) : $toString(value) === strClass;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc3RyaW5nL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDREQUFZOztBQUVwQyxXQUFXLHFLQUFxSztBQUNoTDs7QUFFQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsV0FBVyx3S0FBd0s7QUFDbkw7QUFDQTtBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDRFQUF1Qjs7QUFFcEQsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL3Rlc3QvRG9jdW1lbnRzL0dpdEh1Yi9sZWFmeV9mYWN0b3J5L2Zyb250ZW5kL3NyYy9ub2RlX21vZHVsZXMvaXMtc3RyaW5nL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYm91bmQnKTtcblxuLyoqIEB0eXBlIHsocmVjZWl2ZXI6IFRoaXNQYXJhbWV0ZXJUeXBlPHR5cGVvZiBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2Y+LCAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2Y+KSA9PiBSZXR1cm5UeXBlPHR5cGVvZiBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2Y+fSAqL1xudmFyICRzdHJWYWx1ZU9mID0gY2FsbEJvdW5kKCdTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbnZhciB0cnlTdHJpbmdPYmplY3QgPSBmdW5jdGlvbiB0cnlTdHJpbmdPYmplY3QodmFsdWUpIHtcblx0dHJ5IHtcblx0XHQkc3RyVmFsdWVPZih2YWx1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG4vKiogQHR5cGUgeyhyZWNlaXZlcjogVGhpc1BhcmFtZXRlclR5cGU8dHlwZW9mIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc+LCAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nPikgPT4gUmV0dXJuVHlwZTx0eXBlb2YgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZz59ICovXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgc3RyQ2xhc3MgPSAnW29iamVjdCBTdHJpbmddJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiBoYXNUb1N0cmluZ1RhZyA/IHRyeVN0cmluZ09iamVjdCh2YWx1ZSkgOiAkdG9TdHJpbmcodmFsdWUpID09PSBzdHJDbGFzcztcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-string/index.js\n");

/***/ })

};
;