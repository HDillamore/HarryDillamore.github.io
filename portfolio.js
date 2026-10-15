/**
 * @file portfolio.js
 * @brief Core front-end script powering UI animations, project wing interactions, and image modals.
 * @author Harry Dillamore
 * @version 1.1.0
 */

/**
 * @namespace PortfolioUI
 * @brief Modular controller for portfolio layout behaviors, responsive interactions, and DOM animations.
 */
const PortfolioUI = {
  /**
   * @brief Global configuration values for UI event listeners and observers.
   * @type {Object}
   * @property {number} threshold - Viewport intersection ratio required to trigger scroll fade-in.
   * @property {string} fadeSelector - Query selector for scroll-animated elements.
   * @property {string} projectRowSelector - Query selector for project card rows.
   */
  config: {
    threshold: 0.12,
    fadeSelector: '.fade-in',
    projectRowSelector: '.project-row'
  },

  /**
   * @brief Tracks whether the module has executed initialization.
   * @type {boolean}
   */
  isInitialized: false,

  /**
   * @brief Initializes the IntersectionObserver for scroll-triggered entry animations.
   * @details Finds all elements matching `config.fadeSelector`. As each enters the viewport,
   *          it receives the `visible` class and is unobserved to eliminate layout overhead.
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
   * @brief Configures touch and keyboard interactions for project wing cards.
   * @details Allows keyboard accessibility (Enter/Space) and mobile touch toggle
   *          to open/close the auxiliary wing details on touch screens.
   * @return {void}
   */
  initProjectInteractions: function () {
    const rows = document.querySelectorAll(this.config.projectRowSelector);

    rows.forEach((row) => {
      // Keyboard support for accessibility
      row.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          row.classList.toggle('active-focus');
        }
      });

      // Mobile touch toggle support
      row.addEventListener('click', (event) => {
        // Prevent toggle if clicking a direct anchor link
        if (event.target.tagName.toLowerCase() === 'a') return;
        row.classList.toggle('active-focus');
      });
    });
  },

  /**
   * @brief Binds a lightweight click-to-enlarge modal for project showcase images.
   * @param {string} imageSelector - Query selector for preview images.
   * @return {void}
   */
  initImageModal: function (imageSelector = '.project-image') {
    const images = document.querySelectorAll(imageSelector);
    if (!images.length) return;

    // Create modal backdrop dynamically
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
   * @brief Master bootstrap function to fire all UI subsystems on load.
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

// Mount after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  PortfolioUI.init();
});s