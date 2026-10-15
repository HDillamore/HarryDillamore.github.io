/**
 * @file portfolio.js
 * @brief Core client-side interaction pipeline and animation controllers.
 * @author Harry Dillamore
 * @version 1.1.0
 */

/**
 * @class PortfolioUI
 * @brief Master controller for DOM transitions, intersection observers, and UI modal states.
 * 
 * Implemented as a modular namespace to isolate DOM queries and maintain high frame timing
 * across hardware acceleration barriers.
 */
const PortfolioUI = {
  /**
   * @brief Global configuration values for UI event listeners and observers.
   * @type {Object}
   */
  config: {
    /**
     * @brief Intersection ratio required before triggering CSS visibility classes.
     * @type {number}
     */
    threshold: 0.12,

    /**
     * @brief Target query selector for scroll-animated containers.
     * @type {string}
     */
    fadeSelector: '.fade-in',

    /**
     * @brief Target query selector for interactive project showcases.
     * @type {string}
     */
    projectRowSelector: '.project-row'
  },

  /**
   * @brief Internal flag preventing duplicate observer attachment.
   * @type {boolean}
   */
  isInitialized: false,

  /**
   * @fn initScrollObserver
   * @memberof PortfolioUI
   * @brief Binds an IntersectionObserver to lazy-animate elements into view.
   * @details Identifies all elements matching `config.fadeSelector`. Once an element crosses
   *          the specified `config.threshold`, the `.visible` CSS class is attached and the 
   *          element is unobserved to eliminate unnecessary draw/layout thrashing.
   * 
   * @note Requires modern browser support for IntersectionObserver (fallback: elements remain static).
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
   * @brief Enables touch and keyboard toggling for auxiliary project wing panels.
   * @details Translates hover-driven wing animations to mobile taps and accessible
   *          keyboard navigation (Space / Enter triggers).
   * @return {void}
   */
  initProjectInteractions: function () {
    const rows = document.querySelectorAll(this.config.projectRowSelector);

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
  },

  /**
   * @fn initImageModal
   * @memberof PortfolioUI
   * @brief Instantiates a dynamic full-viewport lightbox overlay for project graphics.
   * @param {string} [imageSelector='.project-image'] Target query selector for clickable preview images.
   * @return {void}
   */
  initImageModal: function (imageSelector = '.project-image') {
    const images = document.querySelectorAll(imageSelector);
    if (!images.length) return;

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
  },

  /**
   * @fn init
   * @memberof PortfolioUI
   * @brief Main bootstrap procedure initializing all UI subroutines sequentially.
   * @return {void}
   */
  init: function () {
    if (this.isInitialized) return;
    this.initScrollObserver();
    this.initProjectInteractions();
    this.initImageModal();
    this.isInitialized = true;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PortfolioUI.init();
});