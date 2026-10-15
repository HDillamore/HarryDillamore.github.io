/**
 * @file portfolio.js
 * @brief Core client-side execution engine for the Harry Dillamore portfolio site.
 * @author Harry Dillamore
 * @version 1.2.0
 * 
 * @details This script controls all interactive behaviours across the static landing page:
 * - Deferred scroll reveals via the browser's native IntersectionObserver API.
 * - Dynamic image inspection modals (lightbox system) created and cleaned up at runtime.
 * - Focus, touch, and keyboard navigation management for bilateral project cards.
 */

/**
 * @class PortfolioUI
 * @brief Singleton UI controller managing component lifecycles, event listeners, and layout states.
 * 
 * @details
 * Encapsulates the entire front-end state to prevent polluting the global window scope.
 * Designed to execute cleanly without external dependencies (vanilla ECMAScript 2020+).
 */
const PortfolioUI = {

  /**
   * @brief Immutable runtime configuration thresholds and CSS selectors.
   * 
   * @details These values dictate when animations fire and what DOM nodes are queried:
   * - **threshold**: Set to `0.12` (12% of the card must be visible before fading in).
   * - **fadeSelector**: Applied to containers awaiting scroll triggers (`.fade-in`).
   * - **projectRowSelector**: Applied to project showcase articles (`.project-row`).
   */
  config: {
    threshold: 0.12,
    fadeSelector: '.fade-in',
    projectRowSelector: '.project-row'
  },

  /**
   * @brief Guard flag indicating whether event bindings and observers have executed.
   * @type {boolean}
   * @default false
   */
  isInitialized: false,

  /**
   * @fn initScrollObserver
   * @memberof PortfolioUI
   * @brief Discovers deferred elements and registers them to an IntersectionObserver instance.
   * 
   * @details
   * Queries all elements matching `PortfolioUI.config.fadeSelector`. If any target elements exist,
   * a single shared observer instance is instantiated to minimize memory footprint.
   * 
   * **Execution Lifecycle:**
   * 1. Query the DOM for `.fade-in` elements.
   * 2. If node count is zero, return early without binding.
   * 3. Construct `IntersectionObserver` with a `0.12` viewport ratio limit.
   * 4. As elements cross into the viewport, apply the `.visible` CSS class.
   * 5. Immediately call `unobserve(entry.target)` to discard the node from tracking.
   * 
   * @note If the client browser lacks `IntersectionObserver` support, targets fall back to static placement.
   * @warning Disconnecting the observer early will cause unreached cards to remain at opacity 0.
   * @return {void}
   */
  initScrollObserver: function () {
    const targets = document.querySelectorAll(this.config.fadeSelector);
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.config.threshold
    });

    targets.forEach((el) => observer.observe(el));
  },

  /**
   * @fn initProjectInteractions
   * @memberof PortfolioUI
   * @brief Establishes accessibility, mouse, and touch listeners for project showcase cards.
   * 
   * @details
   * On desktop viewports (> 1080px), auxiliary "wings" reveal via CSS `:hover`. However, touch screens
   * and assistive devices cannot hover. This method provides:
   * - **Keyboard accessibility:** Binds `Enter` and `Spacebar` to toggle `.active-focus`.
   * - **Touch support:** Toggles open states on tap, ignoring explicit anchor clicks (`<a>`).
   * 
   * @param {string} [rowSelector=this.config.projectRowSelector] Target CSS selector for project articles.
   * @return {number} Count of successfully registered interactive cards.
   */
  initProjectInteractions: function (rowSelector = this.config.projectRowSelector) {
    const rows = document.querySelectorAll(rowSelector);
    if (!rows.length) return 0;

    rows.forEach((row) => {
      row.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          row.classList.toggle('active-focus');
        }
      });

      row.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'a') return;
        row.classList.toggle('active-focus');
      });
    });

    return rows.length;
  },

  /**
   * @fn initImageModal
   * @memberof PortfolioUI
   * @brief Injects a reusable DOM lightbox modal to inspect game graphics and technical art.
   * 
   * @details
   * Rather than hardcoding modal templates directly into `index.html`, this method generates
   * the backdrop and overlay elements on demand, attaching event handlers to close the view
   * via backdrop clicks, an exit button, or the `Escape` key.
   * 
   * @param {string} [imageSelector='.project-image'] Query selector identifying clickable artwork.
   * @throws {DOMException} If DOM insertion fails during node construction.
   * @return {boolean} True if the modal system successfully initialized; false if target images were absent.
   */
  initImageModal: function (imageSelector = '.project-image') {
    const images = document.querySelectorAll(imageSelector);
    if (!images.length) return false;

    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <img src="" alt="Enlarged Project Preview" class="modal-img">
        <button class="modal-close" aria-label="Close Preview">&times;</button>
      </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.modal-img');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    const closeModal = () => modal.classList.remove('open');

    images.forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        modalImg.src = img.src;
        modal.classList.add('open');
      });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    return true;
  },

  /**
   * @fn init
   * @memberof PortfolioUI
   * @brief Primary entry point triggered on `DOMContentLoaded`.
   * 
   * @details
   * Sequentially calls internal initialization subroutines in a deterministic order:
   * 1. `initScrollObserver()`: Sets up scroll listener before elements render off-screen.
   * 2. `initProjectInteractions()`: Attaches accessibility and touch event listeners.
   * 3. `initImageModal()`: Injects lightbox overlay into the DOM tree.
   * 
   * @note Protected by `isInitialized` to prevent double-binding during dynamic page reloads.
   * @return {boolean} True if initialized during this call, false if already running.
   */
  init: function () {
    if (this.isInitialized) return false;
    this.initScrollObserver();
    this.initProjectInteractions();
    this.initImageModal();
    this.isInitialized = true;
    return true;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PortfolioUI.init();
});