# Setup & Deployment Guide

This guide explains how the site is deployed, how GitHub Pages is configured, and where to find the generated documentation.

---

## 1. How the GitHub Actions Workflow Works

The site deploys automatically using the workflow file at `.github/workflows/pages.yml`. 

Whenever changes are pushed to the `main` branch, GitHub runs the following steps:
1. **Checks out the repository**: Pulls the project files onto a temporary Ubuntu runner.
2. **Installs Doxygen**: Installs Doxygen and Graphviz to build the documentation.
3. **Generates Docs**: Runs `doxygen Doxyfile`, parsing code comments from `src/` into HTML files located in `docs_build/html/`.
4. **Prepares the Site (`_site/`)**:
   - Copies `index.html`, assets, and `src/` to the root of a folder named `_site`.
   - Copies the generated documentation from `docs_build/html/` into `_site/docs/`.
5. **Deploys to Pages**: Uploads `_site/` directly to GitHub Pages.

---

## 2. Enabling GitHub Pages in the Repository

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages** (under "Code and automation").
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

---

## 3. Where the Docs Appear on the Live Site

- **Portfolio Site**: `https://hdillamore.github.io/`
- **Generated Documentation**: `https://hdillamore.github.io/docs/`

The documentation can also be accessed directly via the **API Docs** link in the portfolio's top navigation bar.