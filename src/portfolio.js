/**
 * @file portfolio.js
 * @brief Core client-side execution engine for the Harry Dillamore portfolio site.
 * @author Harry Dillamore
 * @version 1.2.0
 */

/**
 * @class PortfolioUI
 * @brief Singleton UI controller managing component lifecycles, event listeners, and layout states.
 */

/**
 * @var {Object} PortfolioUI.config
 * @memberof PortfolioUI
 * @brief Runtime threshold values and CSS target selectors for DOM queries.
 */

/**
 * @var {number} PortfolioUI.threshold
 * @memberof PortfolioUI
 * @brief Viewport intersection ratio required to trigger visibility.
 * @note Set to 0.12 (12% of the element must enter the viewport).
 */

/**
 * @var {string} PortfolioUI.fadeSelector
 * @memberof PortfolioUI
 * @brief CSS class selector identifying elements pending scroll entry animations.
 * @note Default value: '.fade-in'
 */

/**
 * @var {string} PortfolioUI.projectRowSelector
 * @memberof PortfolioUI
 * @brief CSS class selector identifying primary project display cards.
 * @note Default value: '.project-row'
 */

/**
 * @var {boolean} PortfolioUI.isInitialized
 * @memberof PortfolioUI
 * @brief Guard flag indicating whether event listeners and observers have executed.
 * @default false
 */

const PortfolioUI = {
  config: {
    threshold: 0.12,
    fadeSelector: '.fade-in',
    projectRowSelector: '.project-row'
  },

  isInitialized: false,

  /**
   * @fn initScrollObserver
   * @memberof PortfolioUI
   * @brief Discovers deferred elements and registers them to an IntersectionObserver instance.
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
   * @param {string} [imageSelector='.project-image'] Query selector identifying clickable artwork.
   * @return {boolean} True if initialized, false if no images exist.
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