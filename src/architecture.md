# Portfolio Engine Architecture & Subsystems {#mainpage}

## 1. System Overview
The Harry Dillamore portfolio is a zero-dependency, lightweight web portfolio developed specifically to showcase gameplay programming, shaders, and low-level technical art (Unreal Engine 5, Unity, Raylib/C).

The front-end architecture is intentionally structured into two distinct layers:
1. **Presentation & Layout (`index.html`)**: Semantic markup, CSS Custom Properties (`--accent`, `--border`), and a responsive grid adapting desktop card extensions to compact viewports.
2. **Dynamic UI Subsystems (`src/portfolio.js`)**: Isolated vanilla JavaScript logic controlling view triggers, keyboard/touch accessibility, and runtime image zoom modals.

---

## 2. Subsystem Breakdown

### 2.1 Viewport Observer System
- **File**: `portfolio.js`
- **Method**: `PortfolioUI.initScrollObserver()`
- **Mechanism**: Attaches a single browser-native `IntersectionObserver` across all nodes matching `.fade-in`.
- **Performance Strategy**: Rather than listening to raw window `scroll` events (which fire dozens of times per second and cause browser paint stutter), the observer lets the GPU compute view thresholds asynchronously. As soon as a node reaches 12% visibility (`threshold: 0.12`), it is detached via `unobserve()` to reclaim memory.

### 2.2 Responsive Wing Interactions
- **Desktop (> 1080px)**: CSS `:hover` and `:focus-within` triggers slide auxiliary cards ("wings") out bilaterally from the main card container via CSS bezier transitions.
- **Mobile / Touch (<= 1080px)**: CSS hover states fail on touch screens. The JavaScript layer attaches a click listener that toggles the `.active-focus` class, causing wings to expand downwards in a clean 2-column mobile grid.

### 2.3 Runtime Lightbox Subsystem
- **Method**: `PortfolioUI.initImageModal()`
- **Mechanism**: Scans for `.project-image` nodes, constructs a modal overlay dynamically in memory, and attaches it to `document.body`.
- **Keyboard Navigation**: Listens to the `Escape` key globally to close modal views without requiring accurate pointer clicks.

---

## 3. Class Index & References
- For detailed function declarations, parameter tables, and return types, see the **[PortfolioUI](class_portfolio_u_i.html)** class page.
- For complete raw source code with line-by-line docstrings, inspect the **[portfolio.js](portfolio_8js.html)** file entry.