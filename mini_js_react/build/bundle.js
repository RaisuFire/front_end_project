/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function createElement(type, props, ...children) {\n  return {\n    type,\n    props: {\n      ...props,\n      children: children.map(child => typeof child === \"object\" ? child : createTextElement(child))\n    }\n  };\n}\nfunction createTextElement(text) {\n  return {\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\nfunction render(element, container) {\n  console.log(\"element: \", element);\n  const dom = element.type == \"TEXT_ELEMENT\" ? document.createTextNode(\"\") : document.createElement(element.type);\n  const isProperty = key => key !== \"children\";\n  Object.keys(element.props).filter(isProperty).forEach(name => {\n    dom[name] = element.props[name];\n  });\n  element.props.children.forEach(child => render(child, dom));\n  container.appendChild(dom);\n}\nconst Didact = {\n  createElement,\n  render\n};\n\n/** @jsx Didact.createElement */\nconst element = Didact.createElement(\"div\", {\n  style: \"background: salmon\"\n}, Didact.createElement(\"h1\", null, \"Hello World\"), Didact.createElement(\"h2\", {\n  style: \"text-align:right\"\n}, \"from Didact\"));\nconst container = document.getElementById(\"root\");\nDidact.render(element, container);\n\n//# sourceURL=webpack://didact-2/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;