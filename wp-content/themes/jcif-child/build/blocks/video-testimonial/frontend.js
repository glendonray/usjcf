/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./src/blocks/video-testimonial/frontend.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


// Video Testimonial Block Frontend Functionality
document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const videoTestimonialBlocks = document.querySelectorAll(".video-testimonial-block");
  if (!isMobile) {
    videoTestimonialBlocks.forEach(initBlock);
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initBlock(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "300px 0px"
    });
    videoTestimonialBlocks.forEach(block => observer.observe(block));
  }
  function initBlock(block) {
    // Get block attributes from data attributes
    const videos = JSON.parse(block.dataset.videos || "[]");
    const selectedVideo = parseInt(block.dataset.selectedVideo || "0");
    const thumbnailsContainer = block.querySelector("[data-video-thumbnails]");
    const playerContainer = block.querySelector("[data-video-player]");

    // Populate video thumbnails
    if (thumbnailsContainer && videos.length > 0) {
      thumbnailsContainer.innerHTML = "";
      videos.forEach((video, index) => {
        const displayTitle = video.customTitle || video.title;
        const thumbnailButton = document.createElement("button");
        thumbnailButton.className = `video-thumbnail ${selectedVideo === index ? "selected" : ""}`;
        thumbnailButton.setAttribute("data-video-index", index);
        thumbnailButton.setAttribute("data-video-url", video.url);
        thumbnailButton.setAttribute("data-video-title", displayTitle);
        thumbnailButton.setAttribute("aria-label", `Select video: ${displayTitle}`);

        // Use poster image if available, otherwise fall back to thumbnail
        const displayImage = video.posterImage?.url || video.thumbnail;
        if (displayImage && displayImage !== "") {
          thumbnailButton.style.backgroundImage = `url(${displayImage})`;
          thumbnailButton.style.backgroundSize = "cover";
          thumbnailButton.style.backgroundPosition = "center";
          // Add a subtle play icon overlay for video thumbnails
          thumbnailButton.innerHTML = `
						<div class="video-thumbnail-overlay">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5v14l11-7z"/>
							</svg>
						</div>
					`;
        } else {
          // Fallback: show a generic video icon
          thumbnailButton.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    `;
        }

        // Add click handler
        thumbnailButton.addEventListener("click", function () {
          // Update selected state
          thumbnailsContainer.querySelectorAll(".video-thumbnail").forEach(t => t.classList.remove("selected"));
          this.classList.add("selected");

          // Update video player
          updateVideoPlayer(playerContainer, video);
        });
        thumbnailsContainer.appendChild(thumbnailButton);
      });
    }

    // Initialize video player with selected video
    if (playerContainer && videos.length > 0 && videos[selectedVideo]) {
      updateVideoPlayer(playerContainer, videos[selectedVideo]);
    } else if (playerContainer) {
      // Show placeholder if no videos
      playerContainer.innerHTML = `
                <div class="video-placeholder">
                    <div class="video-placeholder-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <p>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No video selected", "video-testimonial")}</p>
                </div>
            `;
    }
  }
  function updateVideoPlayer(container, video) {
    if (!container || !video) return;
    const displayTitle = video.customTitle || video.title;
    if (video.type === "youtube") {
      const displayImage = video.posterImage?.url || video.thumbnail;
      container.innerHTML = `
                <h3 class="video-title-display">${displayTitle}</h3>
                <div class="video-player-container video-player-youtube">
                    <div class="video-youtube-poster" style="${displayImage ? `background-image:url(${displayImage});` : ""}background-size:cover;background-position:center;width:100%;aspect-ratio:16/9;">
                        <div class="video-play-overlay">
                            <button class="video-play-button" aria-label="Play ${displayTitle}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="65" viewBox="0 0 66 65" fill="none">
                                    <circle cx="32.9995" cy="32.7778" r="23.5" fill="white"/>
                                    <path d="M32.9998 0.743896C15.2867 0.743896 0.96582 15.0648 0.96582 32.7778C0.96582 50.4909 15.2867 64.8118 32.9998 64.8118C50.7128 64.8118 65.0337 50.4909 65.0337 32.7778C65.0337 15.0648 50.7128 0.743896 32.9998 0.743896ZM24.0055 46.1315V19.4242C24.0055 17.7648 25.873 16.7946 27.2567 17.6945L47.0454 31.0482C48.2913 31.8779 48.2913 33.6778 47.0454 34.5075L27.2567 47.8611C25.873 48.7611 24.0055 47.7909 24.0055 46.1315Z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
      const playButton = container.querySelector(".video-play-button");
      const posterEl = container.querySelector(".video-youtube-poster");
      const playerContainer = container.querySelector(".video-player-container");
      if (playButton && posterEl && playerContainer) {
        playButton.addEventListener("click", function () {
          const autoplayUrl = video.url.includes("?") ? `${video.url}&autoplay=1` : `${video.url}?autoplay=1`;
          posterEl.remove();
          const iframe = document.createElement("iframe");
          iframe.src = autoplayUrl;
          iframe.title = displayTitle;
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          iframe.style.cssText = "width:100%;aspect-ratio:16/9;";
          playerContainer.appendChild(iframe);
        });
      }
      return;
    }

    // Use poster image if available, otherwise fall back to thumbnail
    const displayImage = video.posterImage?.url || video.thumbnail;
    container.innerHTML = `
            <h3 class="video-title-display">${displayTitle}</h3>
            <div class="video-player-container">
                <video
                    class="video-player"
                    preload="metadata"
                    poster="${displayImage || ""}"
                    aria-label="${displayTitle}"
                >
                    <source src="${video.url}" type="video/mp4">
                    ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Your browser does not support the video tag.", "video-testimonial")}
                </video>
                <div class="video-play-overlay">
                    <button class="video-play-button" aria-label="Play ${displayTitle}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="66" height="65" viewBox="0 0 66 65" fill="none">
                            <circle cx="32.9995" cy="32.7778" r="23.5" fill="white"/>
                            <path d="M32.9998 0.743896C15.2867 0.743896 0.96582 15.0648 0.96582 32.7778C0.96582 50.4909 15.2867 64.8118 32.9998 64.8118C50.7128 64.8118 65.0337 50.4909 65.0337 32.7778C65.0337 15.0648 50.7128 0.743896 32.9998 0.743896ZM24.0055 46.1315V19.4242C24.0055 17.7648 25.873 16.7946 27.2567 17.6945L47.0454 31.0482C48.2913 31.8779 48.2913 33.6778 47.0454 34.5075L27.2567 47.8611C25.873 48.7611 24.0055 47.7909 24.0055 46.1315Z" fill="#008AD8"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

    // Add click handler to play video
    const playButton = container.querySelector(".video-play-button");
    const videoElement = container.querySelector(".video-player");
    const overlay = container.querySelector(".video-play-overlay");
    if (playButton && videoElement && overlay) {
      playButton.addEventListener("click", function () {
        overlay.style.display = "none";
        videoElement.controls = true;
        videoElement.play();
      });

      // Show overlay again when video is paused
      videoElement.addEventListener("pause", function () {
        overlay.style.display = "flex";
      });

      // Hide overlay when video starts playing
      videoElement.addEventListener("play", function () {
        overlay.style.display = "none";
      });
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map