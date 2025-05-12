"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ansi-regex";
exports.ids = ["vendor-chunks/ansi-regex"];
exports.modules = {

/***/ "(ssr)/./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("\nmodule.exports = ({ onlyFirst = false } = {})=>{\n    const pattern = [\n        '[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)',\n        '(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'\n    ].join('|');\n    return new RegExp(pattern, onlyFirst ? undefined : 'g');\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUViQSxPQUFPQyxPQUFPLEdBQUcsQ0FBQyxFQUFDQyxZQUFZLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxNQUFNQyxVQUFVO1FBQ2Y7UUFDQTtLQUNBLENBQUNDLElBQUksQ0FBQztJQUVQLE9BQU8sSUFBSUMsT0FBT0YsU0FBU0QsWUFBWUksWUFBWTtBQUNwRCIsInNvdXJjZXMiOlsiL1VzZXJzL2dpby5yb2RyaWd1ZXovRG9jdW1lbnRzL2dpdGh1Yl9yZXBvc2l0b3JpZXMvbGVhZnlfZmFjdG9yeS9mcm9udGVuZC9zcmMvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh7b25seUZpcnN0ID0gZmFsc2V9ID0ge30pID0+IHtcblx0Y29uc3QgcGF0dGVybiA9IFtcblx0XHQnW1xcXFx1MDAxQlxcXFx1MDA5Ql1bW1xcXFxdKCkjOz9dKig/Oig/Oig/Oig/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSspKnxbYS16QS1aXFxcXGRdKyg/OjtbLWEtekEtWlxcXFxkXFxcXC8jJi46PT8lQH5fXSopKik/XFxcXHUwMDA3KScsXG5cdFx0Jyg/Oig/OlxcXFxkezEsNH0oPzo7XFxcXGR7MCw0fSkqKT9bXFxcXGRBLVBSLVRaY2YtbnRxcnk9Pjx+XSkpJ1xuXHRdLmpvaW4oJ3wnKTtcblxuXHRyZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLCBvbmx5Rmlyc3QgPyB1bmRlZmluZWQgOiAnZycpO1xufTtcbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwib25seUZpcnN0IiwicGF0dGVybiIsImpvaW4iLCJSZWdFeHAiLCJ1bmRlZmluZWQiXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ansi-regex/index.js\n");

/***/ })

};
;