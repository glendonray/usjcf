/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/footer/custom/console.js"
/*!*****************************************!*\
  !*** ./src/js/footer/custom/console.js ***!
  \*****************************************/
() {

// Avoid `console` errors in browsers that lack a console.
// eslint-disable-next-line no-console
if (!(window.console && console.log)) {
  (function () {
    const noop = function () {};
    const methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    let length = methods.length;
    const console = window.console = {};
    while (length--) {
      console[methods[length]] = noop;
    }
  })();
}

/***/ },

/***/ "./src/js/footer/custom/header-scrolled.js"
/*!*************************************************!*\
  !*** ./src/js/footer/custom/header-scrolled.js ***!
  \*************************************************/
() {

/**
 * jQuery plugin to monitor scroll distance and add class to an element after document scrolls to a position.
 * This is used for sticky headers, primarily. The "scrolled" state can then be styled in CSS.
 */
(function ($) {
  $.fn.scrollclass = function (options) {
    const opts = $.extend({}, $.fn.scrollclass.defaults, options);
    const $this = this;
    let state2 = false;
    $(document).scroll(function () {
      if (false === state2 && $(this).scrollTop() > opts.pos) {
        state2 = true;
        $this.addClass(opts.class);
      } else if ($(this).scrollTop() < opts.pos) {
        state2 = false;
        $this.removeClass(opts.class);
      }
    }).trigger('scroll');
  };

  // default options
  $.fn.scrollclass.defaults = {
    class: 'scrolled',
    pos: 50
  };
})(jQuery);

/**
 * Use scrollclass plugin on #site-header if it exists.
 */
jQuery(document).ready(function ($) {
  const $header = $('#site-header');
  if (0 < $header.length) {
    $header.scrollclass({
      pos: $header.outerHeight()
    });
  }
});

/***/ },

/***/ "./src/js/footer/custom/scripts.js"
/*!*****************************************!*\
  !*** ./src/js/footer/custom/scripts.js ***!
  \*****************************************/
() {

var waitForEl = function (selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function () {
      waitForEl(selector, callback);
    }, 100);
  }
};
waitForEl(".wpgmza_infowindow_description", function () {
  jQuery(document).ready(function ($) {
    $(".wpgmza_infowindow_description").html($(".wpgmza_infowindow_description").text().substring(0, 130) + "...");
    $(".wpgmza_map").click(function () {
      $(".wpgmza_infowindow_description").html($(".wpgmza_infowindow_description").text().substring(0, 130) + "...");
    });
  });
});

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/scripts.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_footer_custom_console_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/footer/custom/console.js */ "./src/js/footer/custom/console.js");
/* harmony import */ var _js_footer_custom_console_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_footer_custom_console_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_footer_custom_header_scrolled_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/footer/custom/header-scrolled.js */ "./src/js/footer/custom/header-scrolled.js");
/* harmony import */ var _js_footer_custom_header_scrolled_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_footer_custom_header_scrolled_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_footer_custom_scripts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/footer/custom/scripts.js */ "./src/js/footer/custom/scripts.js");
/* harmony import */ var _js_footer_custom_scripts_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_footer_custom_scripts_js__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Footer scripts — loaded at the bottom of the page.
 * These are concatenated and output to dist/scripts.js
 * Depends on jQuery (enqueued separately via wp_enqueue_script).
 */

/* global jQuery */

// Custom



})();

/******/ })()
;
//# sourceMappingURL=scripts.js.map