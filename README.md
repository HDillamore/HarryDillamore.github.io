# Harry Dillamore — Game Developer Portfolio & Auto-Docs Engine

A modern, responsive personal portfolio website showcasing game development work across Unreal Engine 5, Unity, and Raylib/C. The repository features an automated CI/CD pipeline built with GitHub Actions that compiles code documentation via Doxygen on every push and deploys both the portfolio and documentation directly to GitHub Pages.

- **Live Portfolio URL**: [https://hdillamore.github.io/HarryDillamore.github.io/](https://hdillamore.github.io/HarryDillamore.github.io/)
- **Live Documentation URL**: [https://hdillamore.github.io/HarryDillamore.github.io/docs/index.html](https://hdillamore.github.io/HarryDillamore.github.io/docs/index.html)

---

## Purpose of the Site

The purpose of this site is to serve as a central technical hub and professional portfolio. It features:
- A clean, responsive landing page with contact endpoints (GitHub, LinkedIn, itch.io, direct email).
- Interactive project showcases featuring technical art (Parallax Occlusion Mapping shaders), gameplay systems, and low-level graphics experiments.
- Bilateral responsive card layouts ("wings") adapting smoothly between wide desktop screens and touch-enabled mobile devices.
- Auto-generated architectural and API documentation for client-side JavaScript controllers and upcoming engine subsystems.

---

## Local Documentation Build Instructions

You can build and preview the documentation locally before pushing commits.

### Prerequisites (Fedora Linux / RPM-based distros)

Install Doxygen and Graphviz via `dnf`:

```bash
sudo dnf install -y doxygen graphviz
```
Building the Docs

 Open a terminal in the root directory of this repository.

Run Doxygen:
```Bash
doxygen Doxyfile
```
Open the generated documentation in your browser:
```Bash
xdg-open docs_build/html/index.html
```
