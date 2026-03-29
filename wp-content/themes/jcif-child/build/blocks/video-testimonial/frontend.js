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
document.addEventListener('DOMContentLoaded', function () {
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  let isMobile = mobileQuery.matches;
  let comboboxCounter = 0;
  const videoTestimonialBlocks = document.querySelectorAll('.video-testimonial-block');

  // Track initialized blocks so we can re-render thumbnails on breakpoint change
  const blockStates = new Map();
  let mobileObserver = null;
  if (!isMobile) {
    videoTestimonialBlocks.forEach(initBlock);
  } else {
    mobileObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initBlock(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '300px 0px'
    });
    videoTestimonialBlocks.forEach(block => mobileObserver.observe(block));
  }

  // Re-render thumbnails when crossing the mobile/desktop breakpoint
  mobileQuery.addEventListener('change', e => {
    isMobile = e.matches;

    // Re-render thumbnails for all already-initialized blocks
    blockStates.forEach(state => renderThumbnails(state));

    // If switching to desktop, initialize any blocks that were still lazy-waiting
    if (!isMobile) {
      if (mobileObserver) {
        mobileObserver.disconnect();
        mobileObserver = null;
      }
      videoTestimonialBlocks.forEach(block => {
        if (!blockStates.has(block)) initBlock(block);
      });
    }
  });
  function initBlock(block) {
    if (blockStates.has(block)) return;
    const videos = JSON.parse(block.dataset.videos || '[]');
    const selectedVideo = parseInt(block.dataset.selectedVideo || '0');
    const videoLayout = block.dataset.videoLayout || 'grid';
    const thumbnailsContainer = block.querySelector('[data-video-thumbnails]');
    const playerContainer = block.querySelector('[data-video-player]');
    const state = {
      block,
      videos,
      currentIndex: selectedVideo,
      videoLayout,
      thumbnailsContainer,
      playerContainer
    };
    blockStates.set(block, state);

    // Populate video thumbnails
    if (thumbnailsContainer && videos.length > 0) {
      renderThumbnails(state);
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
                    <p>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No video selected', 'video-testimonial')}</p>
                </div>
            `;
    }
  }
  function renderThumbnails(state) {
    const {
      videos,
      thumbnailsContainer
    } = state;
    if (!thumbnailsContainer || videos.length === 0) return;
    thumbnailsContainer.innerHTML = '';
    thumbnailsContainer.classList.remove('is-combobox');
    if (isMobile) {
      renderCombobox(state);
    } else {
      renderDesktopThumbnails(state);
    }
  }
  function renderCombobox(state) {
    const {
      videos,
      thumbnailsContainer,
      playerContainer
    } = state;
    thumbnailsContainer.classList.add('is-combobox');
    const listboxId = `video-combobox-listbox-${comboboxCounter++}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'video-combobox';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'video-combobox-input';
    input.setAttribute('aria-label', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a video', 'video-testimonial'));
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', listboxId);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a video…', 'video-testimonial'));
    const initialVideo = videos[state.currentIndex];
    if (initialVideo) {
      input.value = initialVideo.videoTitle || initialVideo.customTitle || initialVideo.title;
    }
    const listbox = document.createElement('ul');
    listbox.className = 'video-combobox-listbox';
    listbox.setAttribute('role', 'listbox');
    listbox.id = listboxId;
    let highlightedIndex = state.currentIndex;
    const optionItems = videos.map((video, index) => {
      const optionTitle = video.videoTitle || video.customTitle || video.title;
      const li = document.createElement('li');
      li.className = 'video-combobox-option';
      li.setAttribute('role', 'option');
      li.setAttribute('data-index', index);
      li.setAttribute('aria-selected', index === state.currentIndex ? 'true' : 'false');
      li.textContent = optionTitle;
      if (index === state.currentIndex) li.classList.add('is-selected');
      li.addEventListener('mousedown', function (e) {
        e.preventDefault(); // keep input focused
        selectOption(index);
      });
      return li;
    });
    optionItems.forEach(li => listbox.appendChild(li));
    let committedValue = input.value;
    function openListbox() {
      if (wrapper.getAttribute('aria-expanded') === 'true') return;
      wrapper.setAttribute('aria-expanded', 'true');
      input.value = '';
      filterOptions('');
    }
    function closeListbox() {
      wrapper.setAttribute('aria-expanded', 'false');
      input.value = committedValue;
    }
    function filterOptions(query) {
      const lower = query.toLowerCase().trim();
      optionItems.forEach(li => {
        li.hidden = lower !== '' && !li.textContent.toLowerCase().includes(lower);
      });
    }
    function highlightOption(index) {
      optionItems.forEach((li, i) => li.classList.toggle('is-highlighted', i === index));
      optionItems[index]?.scrollIntoView({
        block: 'nearest'
      });
      highlightedIndex = index;
    }

    // Selected video info display (title + subtitle below combobox)
    const selectedInfo = document.createElement('div');
    selectedInfo.className = 'video-combobox-selected-info';
    function updateSelectedInfo(video) {
      selectedInfo.innerHTML = '';
      if (!video) return;
      const title = video.videoTitle || video.title;
      if (title) {
        const titleEl = document.createElement('span');
        titleEl.className = 'video-combobox-selected-title';
        titleEl.textContent = title;
        selectedInfo.appendChild(titleEl);
      }
      if (video.videoSubtitle) {
        const subtitleEl = document.createElement('span');
        subtitleEl.className = 'video-combobox-selected-subtitle';
        subtitleEl.textContent = video.videoSubtitle;
        selectedInfo.appendChild(subtitleEl);
      }
    }

    // Show info for initially selected video
    updateSelectedInfo(videos[state.currentIndex]);
    function selectOption(index) {
      const video = videos[index];
      const title = video.videoTitle || video.customTitle || video.title;
      committedValue = title;
      optionItems.forEach((li, i) => {
        const active = i === index;
        li.setAttribute('aria-selected', active ? 'true' : 'false');
        li.classList.toggle('is-selected', active);
      });
      highlightedIndex = index;
      state.currentIndex = index;
      closeListbox();
      updateSelectedInfo(video);
      updateVideoPlayer(playerContainer, video);
      playerContainer?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
    input.addEventListener('focus', openListbox);
    input.addEventListener('click', openListbox);
    input.addEventListener('input', function () {
      openListbox();
      filterOptions(this.value);
    });
    input.addEventListener('blur', function () {
      setTimeout(closeListbox, 150);
    });
    input.addEventListener('keydown', function (e) {
      const visible = optionItems.filter(li => !li.hidden);
      const pos = visible.findIndex(li => li.classList.contains('is-highlighted'));
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = visible[Math.min(pos + 1, visible.length - 1)];
        if (next) highlightOption(optionItems.indexOf(next));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = visible[Math.max(pos - 1, 0)];
        if (prev) highlightOption(optionItems.indexOf(prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (visible[pos]) selectOption(optionItems.indexOf(visible[pos]));
      } else if (e.key === 'Escape') {
        closeListbox();
      }
    });

    // Add 'Selct Video' eyebrow inside .combobox, before input
    const eyebrow = document.createElement('span');
    eyebrow.className = 'video-testimonial-eyebrow';
    eyebrow.textContent = 'Select Video';
    wrapper.appendChild(eyebrow);
    wrapper.appendChild(input);
    wrapper.appendChild(listbox);
    thumbnailsContainer.appendChild(wrapper);
    thumbnailsContainer.appendChild(selectedInfo);
  }
  function renderDesktopThumbnails(state) {
    const {
      videos,
      videoLayout,
      thumbnailsContainer,
      playerContainer
    } = state;
    videos.forEach((video, index) => {
      const displayTitle = video.customTitle || video.title;
      const thumbnailButton = document.createElement('button');
      thumbnailButton.className = `video-thumbnail ${state.currentIndex === index ? 'selected' : ''}`;
      thumbnailButton.setAttribute('data-video-index', index);
      thumbnailButton.setAttribute('data-video-url', video.url);
      thumbnailButton.setAttribute('data-video-title', displayTitle);
      thumbnailButton.setAttribute('aria-label', `Select video: ${displayTitle}`);

      // Use poster image if available, otherwise fall back to thumbnail
      const displayImage = video.posterImage?.url || video.thumbnail;
      if (videoLayout === 'list') {
        // List layout: thumbnail + title + subtitle in a row
        const thumbSpan = document.createElement('span');
        thumbSpan.className = 'video-list-thumb';
        if (displayImage) {
          thumbSpan.style.backgroundImage = `url(${displayImage})`;
        }
        const infoSpan = document.createElement('span');
        infoSpan.className = 'video-list-info';
        const titleSpan = document.createElement('span');
        titleSpan.className = 'video-list-title';
        titleSpan.textContent = video.videoTitle || video.title;
        infoSpan.appendChild(titleSpan);
        if (video.videoSubtitle) {
          const subtitleSpan = document.createElement('span');
          subtitleSpan.className = 'video-list-subtitle';
          subtitleSpan.textContent = video.videoSubtitle;
          infoSpan.appendChild(subtitleSpan);
        }
        thumbnailButton.appendChild(thumbSpan);
        thumbnailButton.appendChild(infoSpan);
      } else {
        // Grid layout: square thumbnail buttons (existing behavior)
        if (displayImage && displayImage !== '') {
          thumbnailButton.style.backgroundImage = `url(${displayImage})`;
          thumbnailButton.style.backgroundSize = 'cover';
          thumbnailButton.style.backgroundPosition = 'center';
          thumbnailButton.innerHTML = `
              <div class="video-thumbnail-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            `;
        } else {
          thumbnailButton.innerHTML = `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            `;
        }
      }

      // Add click handler
      thumbnailButton.addEventListener('click', function () {
        // Update selected state
        thumbnailsContainer.querySelectorAll('.video-thumbnail').forEach(t => t.classList.remove('selected'));
        this.classList.add('selected');
        state.currentIndex = index;

        // Update video player
        updateVideoPlayer(playerContainer, video);
      });
      thumbnailsContainer.appendChild(thumbnailButton);
    });
  }
  function updateVideoPlayer(container, video) {
    if (!container || !video) return;
    const displayTitle = video.customTitle || video.title;
    if (video.type === 'youtube') {
      const displayImage = video.posterImage?.url || video.thumbnail;
      container.innerHTML = `
                <h3 class="video-title-display">${displayTitle}</h3>
                <div class="video-player-container video-player-youtube">
                    <div class="video-youtube-poster" style="${displayImage ? `background-image:url(${displayImage});` : ''}background-size:cover;background-position:center;width:100%;aspect-ratio:16/9;">
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
      const playButton = container.querySelector('.video-play-button');
      const posterEl = container.querySelector('.video-youtube-poster');
      const playerContainer = container.querySelector('.video-player-container');
      if (playButton && posterEl && playerContainer) {
        playButton.addEventListener('click', function () {
          const autoplayUrl = video.url.includes('?') ? `${video.url}&autoplay=1` : `${video.url}?autoplay=1`;
          posterEl.remove();
          const iframe = document.createElement('iframe');
          iframe.src = autoplayUrl;
          iframe.title = displayTitle;
          iframe.frameBorder = '0';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          iframe.style.cssText = 'width:100%;aspect-ratio:16/9;';
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
                    poster="${displayImage || ''}"
                    aria-label="${displayTitle}"
                >
                    <source src="${video.url}" type="video/mp4">
                    ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your browser does not support the video tag.', 'video-testimonial')}
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
    const playButton = container.querySelector('.video-play-button');
    const videoElement = container.querySelector('.video-player');
    const overlay = container.querySelector('.video-play-overlay');
    if (playButton && videoElement && overlay) {
      playButton.addEventListener('click', function () {
        overlay.style.display = 'none';
        videoElement.controls = true;
        videoElement.play();
      });

      // Show overlay again when video is paused
      videoElement.addEventListener('pause', function () {
        overlay.style.display = 'flex';
      });

      // Hide overlay when video starts playing
      videoElement.addEventListener('play', function () {
        overlay.style.display = 'none';
      });
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map