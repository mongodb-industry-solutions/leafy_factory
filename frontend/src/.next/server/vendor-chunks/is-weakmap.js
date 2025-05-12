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

eval("\n\nvar $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;\nvar $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;\n\nvar exported;\n\nif (!$WeakMap) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $WeakMap ? $WeakMap.prototype.has : null;\nvar $setHas = $WeakSet ? $WeakSet.prototype.has : null;\nif (!exported && !$mapHas) {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\n/** @type {import('.')} */\nmodule.exports = exported || function isWeakMap(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$mapHas.call(x, $mapHas);\n\t\tif ($setHas) {\n\t\t\ttry {\n\t\t\t\t$setHas.call(x, $setHas);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\t// @ts-expect-error TS can't figure out that $WeakMap is always truthy here\n\t\treturn x instanceof $WeakMap; // core-js workaround, pre-v3\n\t} catch (e) {}\n\treturn false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtd2Vha21hcC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9naW8ucm9kcmlndWV6L0RvY3VtZW50cy9naXRodWJfcmVwb3NpdG9yaWVzL2xlYWZ5X2ZhY3RvcnkvZnJvbnRlbmQvc3JjL25vZGVfbW9kdWxlcy9pcy13ZWFrbWFwL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyICRXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgV2Vha01hcC5wcm90b3R5cGUgPyBXZWFrTWFwIDogbnVsbDtcbnZhciAkV2Vha1NldCA9IHR5cGVvZiBXZWFrU2V0ID09PSAnZnVuY3Rpb24nICYmIFdlYWtTZXQucHJvdG90eXBlID8gV2Vha1NldCA6IG51bGw7XG5cbnZhciBleHBvcnRlZDtcblxuaWYgKCEkV2Vha01hcCkge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0ZXhwb3J0ZWQgPSBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuXHRcdC8vIGBXZWFrTWFwYCBpcyBub3QgcHJlc2VudCBpbiB0aGlzIGVudmlyb25tZW50LlxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxudmFyICRtYXBIYXMgPSAkV2Vha01hcCA/ICRXZWFrTWFwLnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyICRzZXRIYXMgPSAkV2Vha1NldCA/ICRXZWFrU2V0LnByb3RvdHlwZS5oYXMgOiBudWxsO1xuaWYgKCFleHBvcnRlZCAmJiAhJG1hcEhhcykge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0ZXhwb3J0ZWQgPSBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuXHRcdC8vIGBXZWFrTWFwYCBkb2VzIG5vdCBoYXZlIGEgYGhhc2AgbWV0aG9kXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlZCB8fCBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuXHRpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHRyeSB7XG5cdFx0JG1hcEhhcy5jYWxsKHgsICRtYXBIYXMpO1xuXHRcdGlmICgkc2V0SGFzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQkc2V0SGFzLmNhbGwoeCwgJHNldEhhcyk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGNhbid0IGZpZ3VyZSBvdXQgdGhhdCAkV2Vha01hcCBpcyBhbHdheXMgdHJ1dGh5IGhlcmVcblx0XHRyZXR1cm4geCBpbnN0YW5jZW9mICRXZWFrTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12M1xuXHR9IGNhdGNoIChlKSB7fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-weakmap/index.js\n");

/***/ })

};
;