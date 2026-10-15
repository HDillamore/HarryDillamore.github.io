/**
 * @file portfolio.js
 * @brief Core front-end script powering UI animations and dynamic interactivity.
 * @author Harry Dillamore
 * @version 1.0.0
 */

/**
 * @namespace PortfolioUI
 * @brief Modular controller for portfolio layout behaviors and element animations.
 */
const PortfolioUI = {
  /**
   * @brief Configuration thresholds and settings for layout observers.
   * @type {Object}
   * @property {number} threshold - Viewport intersection ratio required to trigger visibility.
   * @property {string} fadeSelector - CSS class target for scroll-triggered elements.
   */
  config: {
    threshold: 0.12,
    fadeSelector: '.fade-in'
  },

  /**
   * @brief Tracks whether intersection observers have been initialized.
   * @type {boolean}
   */
  isInitialized: false,

  /**
   * @brief Initializes the IntersectionObserver to handle smooth scroll reveal transitions.
   * @details Observes all DOM elements matching `config.fadeSelector`. When an element enters
   *          the viewport, adds the `visible` class and unobserves to optimize runtime performance.
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
    this.isInitialized = true;
  },

  /**
   * @brief Utility helper to dynamically register new interactive project cards.
   * @param {string} containerSelector - CSS selector for target element.
   * @return {boolean} True if element exists and was observed.
   */
  observeDynamicElement: function (containerSelector) {
    const el = document.querySelector(containerSelector);
    if (!el) return false;
    el.classList.add('visible');
    return true;
  }
};

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PortfolioUI.initScrollObserver();
});