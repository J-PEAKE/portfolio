/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/canvasSetup.js":
/*!*******************************!*\
  !*** ./src/js/canvasSetup.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addBodiesToWorld: () => (/* binding */ addBodiesToWorld),\n/* harmony export */   createEngine: () => (/* binding */ createEngine),\n/* harmony export */   createRenderer: () => (/* binding */ createRenderer)\n/* harmony export */ });\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matter-js */ \"./node_modules/matter-js/build/matter.js\");\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Engine = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().Engine),\n  Render = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().Render),\n  World = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().World);\nvar createEngine = function createEngine() {\n  var engine = Engine.create();\n  return {\n    engine: engine,\n    world: engine.world\n  };\n};\nvar createRenderer = function createRenderer(engine) {\n  return Render.create({\n    element: document.getElementById('container1'),\n    engine: engine,\n    canvas: document.getElementById('canvas'),\n    options: {\n      width: 300,\n      height: 400,\n      wireframes: false,\n      background: 'transparent'\n    }\n  });\n};\nvar addBodiesToWorld = function addBodiesToWorld(bodies) {\n  World.add(engine.world, bodies);\n};\n\n//# sourceURL=webpack://portfolio/./src/js/canvasSetup.js?");

/***/ }),

/***/ "./src/js/events.js":
/*!**************************!*\
  !*** ./src/js/events.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEvents: () => (/* binding */ setupEvents)\n/* harmony export */ });\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matter-js */ \"./node_modules/matter-js/build/matter.js\");\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Events = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().Events),\n  Body = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().Body);\nvar setupEvents = function setupEvents(engine, backgroundBox, initialAngle, color1, color2, threshold90, threshold180, threshold270, threshold360) {\n  var angularVelocity = 0.0;\n  var angularDamping = 0.98;\n  var rotationEnabled = true;\n  var disableScroll = function disableScroll() {\n    document.body.style.overflow = 'hidden';\n  };\n  var enableScroll = function enableScroll() {\n    document.body.style.overflow = 'auto';\n  };\n  disableScroll();\n  var handleAngleEvents = function handleAngleEvents(currentAngle) {\n    if (currentAngle >= threshold90 && currentAngle < threshold90 + 0.1) {\n      console.log('Hit 90 degrees');\n    } else if (currentAngle >= threshold180 && currentAngle < threshold180 + 0.1) {\n      console.log('Hit 180 degrees');\n      document.body.style.backgroundColor = color2;\n    } else if (currentAngle >= threshold270 && currentAngle < threshold270 + 0.1) {\n      console.log('Hit 270 degrees');\n    } else if (currentAngle >= threshold360 && currentAngle < threshold360 + 0.1) {\n      console.log('Hit 360 degrees');\n      enableScroll();\n      rotationEnabled = false;\n      angularVelocity = 0.0;\n    }\n  };\n  Events.on(engine, 'beforeUpdate', function () {\n    if (rotationEnabled && Math.abs(angularVelocity) > 0.0001) {\n      Body.rotate(backgroundBox, angularVelocity);\n      angularVelocity *= angularDamping;\n      var currentAngle = backgroundBox.angle - initialAngle;\n      var absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));\n      var interpolationFactor;\n      if (absoluteAngle <= Math.PI) {\n        interpolationFactor = absoluteAngle / Math.PI;\n      } else {\n        interpolationFactor = (2 * Math.PI - absoluteAngle) / Math.PI;\n      }\n      var r = Math.round(parseInt(color1.substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(color2.substring(1, 3), 16) * interpolationFactor);\n      var g = Math.round(parseInt(color1.substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(color2.substring(3, 5), 16) * interpolationFactor);\n      var b = Math.round(parseInt(color1.substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(color2.substring(5, 7), 16) * interpolationFactor);\n      var interpolatedColor = \"rgb(\".concat(r, \", \").concat(g, \", \").concat(b, \")\");\n      document.body.style.backgroundColor = interpolatedColor;\n      handleAngleEvents(absoluteAngle);\n      if (absoluteAngle >= 2 * Math.PI) {\n        document.body.style.backgroundColor = color1;\n        initialAngle = backgroundBox.angle;\n        angularVelocity = 0.0;\n        rotationEnabled = false;\n      }\n    }\n  });\n  window.addEventListener('wheel', function (event) {\n    if (rotationEnabled) {\n      var currentAngle = backgroundBox.angle - initialAngle;\n      var absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));\n      if (absoluteAngle <= 2 * Math.PI) {\n        if (event.deltaY > 0) {\n          angularVelocity += event.deltaY * 0.0001;\n        } else if (event.deltaY < 0 && currentAngle > 0) {\n          angularVelocity += event.deltaY * 0.0001;\n        } else {\n          event.preventDefault();\n        }\n      } else {\n        event.preventDefault();\n      }\n    } else {\n      event.preventDefault();\n    }\n  }, {\n    passive: false\n  });\n  var isDragging = false;\n  var lastMouseX, lastMouseY;\n  var startDrag = function startDrag(event) {\n    isDragging = true;\n    lastMouseX = event.clientX || event.touches[0].clientX;\n    lastMouseY = event.clientY || event.touches[0].clientY;\n  };\n  var endDrag = function endDrag() {\n    isDragging = false;\n  };\n  var drag = function drag(event) {\n    if (!isDragging || !rotationEnabled) return;\n    var mouseX = event.clientX || event.touches[0].clientX;\n    var mouseY = event.clientY || event.touches[0].clientY;\n    var deltaX = mouseX - lastMouseX;\n    var deltaY = mouseY - lastMouseY;\n    angularVelocity += (deltaX + deltaY) * 0.0005;\n    lastMouseX = mouseX;\n    lastMouseY = mouseY;\n  };\n  window.addEventListener('mousedown', startDrag);\n  window.addEventListener('mouseup', endDrag);\n  window.addEventListener('mousemove', drag);\n  window.addEventListener('touchstart', startDrag);\n  window.addEventListener('touchend', endDrag);\n  window.addEventListener('touchmove', drag);\n};\n\n//# sourceURL=webpack://portfolio/./src/js/events.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvasSetup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasSetup */ \"./src/js/canvasSetup.js\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ \"./src/js/events.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shapes */ \"./src/js/shapes.js\");\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n\n\n\n\n// Define colors and thresholds\nvar color1 = '#222222';\nvar color2 = '#1C5D99';\nvar threshold90 = Math.PI / 2;\nvar threshold180 = Math.PI;\nvar threshold270 = 3 * Math.PI / 2;\nvar threshold360 = 2 * Math.PI;\nvar initialAngle = Math.PI / 4;\nvar _createEngine = (0,_canvasSetup__WEBPACK_IMPORTED_MODULE_0__.createEngine)(),\n  engine = _createEngine.engine,\n  world = _createEngine.world;\nvar render = (0,_canvasSetup__WEBPACK_IMPORTED_MODULE_0__.createRenderer)(engine);\nvar circles = (0,_shapes__WEBPACK_IMPORTED_MODULE_2__.createCircles)();\nvar box = (0,_shapes__WEBPACK_IMPORTED_MODULE_2__.createBox)();\n(0,_canvasSetup__WEBPACK_IMPORTED_MODULE_0__.addBodiesToWorld)([_shapes__WEBPACK_IMPORTED_MODULE_2__.backgroundBox, box].concat(_toConsumableArray(circles)));\n(0,_events__WEBPACK_IMPORTED_MODULE_1__.setupEvents)(engine, _shapes__WEBPACK_IMPORTED_MODULE_2__.backgroundBox, initialAngle, color1, color2, threshold90, threshold180, threshold270, threshold360);\nrender.run();\n\n//# sourceURL=webpack://portfolio/./src/js/main.js?");

/***/ }),

/***/ "./src/js/shapes.js":
/*!**************************!*\
  !*** ./src/js/shapes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   backgroundBox: () => (/* binding */ backgroundBox),\n/* harmony export */   createBox: () => (/* binding */ createBox),\n/* harmony export */   createCircles: () => (/* binding */ createCircles)\n/* harmony export */ });\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matter-js */ \"./node_modules/matter-js/build/matter.js\");\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Bodies = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().Bodies),\n  Body = (matter_js__WEBPACK_IMPORTED_MODULE_0___default().Body);\nvar createCircles = function createCircles() {\n  var circleA = Bodies.circle(150, 30, 16, {\n    restitution: 0.7,\n    render: {\n      fillStyle: '#ffffff',\n      strokeStyle: '#ffffff'\n    }\n  });\n  var circleB = Bodies.circle(150, 50, 24, {\n    restitution: 0.7,\n    render: {\n      fillStyle: '#ffffff',\n      strokeStyle: '#ffffff'\n    }\n  });\n  var circleC = Bodies.circle(150, 80, 32, {\n    restitution: 0.7,\n    render: {\n      fillStyle: '#ffffff',\n      strokeStyle: '#ffffff'\n    }\n  });\n  return [circleA, circleB, circleC];\n};\nvar createBox = function createBox() {\n  var boxWidth = 200;\n  var boxHeight = 200;\n  var thickness = 20;\n  var boxCenterX = 150;\n  var boxCenterY = 200;\n  var halfWidth = boxWidth / 2;\n  var halfHeight = boxHeight / 2;\n  var boxTop = Bodies.rectangle(boxCenterX, boxCenterY - halfHeight + thickness / 2, boxWidth, thickness, {\n    isStatic: true,\n    render: {\n      fillStyle: 'transparent'\n    }\n  });\n  var boxBottom = Bodies.rectangle(boxCenterX, boxCenterY + halfHeight - thickness / 2, boxWidth, thickness, {\n    isStatic: true,\n    render: {\n      fillStyle: 'transparent'\n    }\n  });\n  var boxLeft = Bodies.rectangle(boxCenterX - halfWidth + thickness / 2, boxCenterY, thickness, boxHeight, {\n    isStatic: true,\n    render: {\n      fillStyle: 'transparent'\n    }\n  });\n  var boxRight = Bodies.rectangle(boxCenterX + halfWidth - thickness / 2, boxCenterY, thickness, boxHeight, {\n    isStatic: true,\n    render: {\n      fillStyle: 'transparent'\n    }\n  });\n  return Body.create({\n    parts: [boxTop, boxBottom, boxLeft, boxRight],\n    isStatic: true,\n    collisionFilter: {\n      group: 0,\n      category: 0x0001,\n      mask: 0xFFFFFFFF\n    }\n  });\n};\nvar backgroundBox = Bodies.rectangle(150, 200, 170, 170, {\n  isStatic: true,\n  isSensor: true,\n  // Makes the body non-collidable\n  render: {\n    fillStyle: '#1C5D99'\n  }\n});\n\n//# sourceURL=webpack://portfolio/./src/js/shapes.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_matter-js_build_matter_js"], () => (__webpack_require__("./src/js/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;