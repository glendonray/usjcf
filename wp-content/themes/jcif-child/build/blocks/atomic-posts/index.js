/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/atomic-posts/atomic-posts.js"
/*!****************************************************!*\
  !*** ./src/js/blocks/atomic-posts/atomic-posts.js ***!
  \****************************************************/
() {

class AtomicPostsBlock {
  constructor(blockElement) {
    this.blockElement = blockElement;
    this.init();
  }
  init() {
    console.log(this);
    console.log("Atomic Posts Working");
    this.ajaxUrl = this.blockElement.data("ajax-url");
    this.ajaxNonce = this.blockElement.data("ajax-nonce");
    this.postType = this.blockElement.data("post-type");
    this.defaultTaxQuery = JSON.stringify(this.blockElement.data("default-tax-query"));
    this.hasTaxQuery = this.blockElement.data("has-tax-query");
    this.postCount = this.blockElement.data("post-count");
    this.filterTerm = this.blockElement.find(".atomic-posts-filter").data("filter-term");
    this.filterTax = this.blockElement.find(".atomic-posts-filter").data("filter-tax");
    this.maxPages = this.blockElement.find(".atomic-posts").data("max-pages");
    this.enableLink = this.blockElement.data("enable-link");
    console.log("filterTerm = ", this.filterTerm);
    console.log("filterTax = ", this.filterTax);
    console.log("defaultTaxQuery = ", this.defaultTaxQuery);
    this.loader = this.blockElement.find(".filter-loader-wrapper");
    this.filter = this.blockElement.find(".atomic-posts-filter");
    this.setupEventListeners();
    this.postAjax();
  }
  setupEventListeners() {
    const that = this;

    // Find the Search input and detect any input
    this.blockElement.find(".atomic-posts-search").on("input", function () {
      that.searchValue = this.value;
      // Run post ajax
      that.postAjax(that.filterTax, that.filterTerm);
    });

    // Find the Filter dropdown list and detect clicks on it
    this.filter.find(".filter-list").on("click", function () {
      console.log("filter working");
      // If the list is already open then removde the "open" class
      if ($(this).hasClass("filter-list-open")) {
        $(this).removeClass("filter-list-open");
        // If the list is not already open then add the "open" class to it
      } else {
        $(this).addClass("filter-list-open");
      }
    });
    this.filter.find(".filter-link").on("click", function () {
      if ($(this).hasClass("active")) {
        return;
      }
      that.filter.find(".filter-item").removeClass("active");
      that.filter.find(".filter-link").removeClass("active");
      $(this).parent("li").addClass("active");
      $(this).addClass("active");
      that.filterTerm = $(this).data("term");
      that.filterTax = $(this).data("tax");
      console.log("Filter tax is ", that.filterTax);
      console.log("Filter term is ", that.filterTerm);
      that.postAjax(that.filterTax, that.filterTerm);
    });
  }
  postAjax() {
    this.loader.show();
    $.ajax({
      type: "POST",
      url: this.ajaxUrl,
      dataType: "json",
      data: {
        action: "filter_atomic_posts",
        nonce: this.ajaxNonce,
        postType: this.postType,
        term: this.filterTerm,
        tax: this.filterTax,
        defaultTaxQuery: this.defaultTaxQuery,
        filterTerm: this.filterTerm,
        filterTax: this.filterTax,
        maxPages: this.maxPages,
        searchValue: this.searchValue,
        hasTaxQuery: this.hasTaxQuery,
        postCount: this.postCount,
        enableLink: this.enableLink
      },
      success: res => {
        console.log(res);
        this.blockElement.find(".atomic-posts-pagination-wrapper").pagination({
          dataSource: res.post_data,
          totalNumber: res.post_count,
          pageSize: this.postCount,
          showPageNumbers: true,
          prevText: "Prev",
          nextText: "Next",
          autoHidePrevious: true,
          autoHideNext: true,
          callback: (data, pagination) => {
            var dataHtml = "";
            $.each(data, function (index, item) {
              dataHtml += item;
            });
            this.blockElement.find(".atomic-posts").html(dataHtml);
          }
        });
        this.loader.hide();
        console.log(res);
      },
      error: (result, error, syn) => {
        console.log("ERROR");
        console.log(result);
        console.log(error);
        console.log(syn);
      }
    });
  }
}

// Initialize for each block instance
$(".atomic-posts-block").each(function () {
  new AtomicPostsBlock($(this));
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
/*!*********************************************!*\
  !*** ./src/js/blocks/atomic-posts/index.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _atomic_posts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atomic-posts.js */ "./src/js/blocks/atomic-posts/atomic-posts.js");
/* harmony import */ var _atomic_posts_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_atomic_posts_js__WEBPACK_IMPORTED_MODULE_0__);
/* global jQuery */

})();

/******/ })()
;
//# sourceMappingURL=index.js.map