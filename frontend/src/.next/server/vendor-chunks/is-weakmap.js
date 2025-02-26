"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-weakmap";
exports.ids = ["vendor-chunks/is-weakmap"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-weakmap/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-weakmap/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("\n\nvar $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;\nvar $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;\n\nvar exported;\n\nif (!$WeakMap) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $WeakMap ? $WeakMap.prototype.has : null;\nvar $setHas = $WeakSet ? $WeakSet.prototype.has : null;\nif (!exported && !$mapHas) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\n/** @type {import('.')} */\nmodule.exports = exported || function isWeakMap(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$mapHas.call(x, $mapHas);\n\t\tif ($setHas) {\n\t\t\ttry {\n\t\t\t\t$setHas.call(x, $setHas);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\t// @ts-expect-error TS can't figure out that $WeakMap is always truthy here\n\t\treturn x instanceof $WeakMap; // core-js workaround, pre-v3\n\t} catch (e) {}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtd2Vha21hcC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy90ZXN0L0RvY3VtZW50cy9HaXRIdWIvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL2lzLXdlYWttYXAvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJFdlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrTWFwLnByb3RvdHlwZSA/IFdlYWtNYXAgOiBudWxsO1xudmFyICRXZWFrU2V0ID0gdHlwZW9mIFdlYWtTZXQgPT09ICdmdW5jdGlvbicgJiYgV2Vha1NldC5wcm90b3R5cGUgPyBXZWFrU2V0IDogbnVsbDtcblxudmFyIGV4cG9ydGVkO1xuXG5pZiAoISRXZWFrTWFwKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRleHBvcnRlZCA9IGZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG5cdFx0Ly8gYFdlYWtNYXBgIGlzIG5vdCBwcmVzZW50IGluIHRoaXMgZW52aXJvbm1lbnQuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG52YXIgJG1hcEhhcyA9ICRXZWFrTWFwID8gJFdlYWtNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgJHNldEhhcyA9ICRXZWFrU2V0ID8gJFdlYWtTZXQucHJvdG90eXBlLmhhcyA6IG51bGw7XG5pZiAoIWV4cG9ydGVkICYmICEkbWFwSGFzKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRleHBvcnRlZCA9IGZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG5cdFx0Ly8gYFdlYWtNYXBgIGRvZXMgbm90IGhhdmUgYSBgaGFzYCBtZXRob2Rcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVkIHx8IGZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG5cdGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dHJ5IHtcblx0XHQkbWFwSGFzLmNhbGwoeCwgJG1hcEhhcyk7XG5cdFx0aWYgKCRzZXRIYXMpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdCRzZXRIYXMuY2FsbCh4LCAkc2V0SGFzKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgZmlndXJlIG91dCB0aGF0ICRXZWFrTWFwIGlzIGFsd2F5cyB0cnV0aHkgaGVyZVxuXHRcdHJldHVybiB4IGluc3RhbmNlb2YgJFdlYWtNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYzXG5cdH0gY2F0Y2ggKGUpIHt9XG5cdHJldHVybiBmYWxzZTtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-weakmap/index.js\n");

/***/ })

};
;