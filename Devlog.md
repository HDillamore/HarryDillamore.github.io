## Initial Plan and Objectives

I wanted to create a clean, concise website to display my portfolio using HTML, CSS and Javascript. I wanted the site to look professionally made in order to demonstrate web development skills. I planned to host the site using github pages, and utilise Github actions in order to create auto documentation of the website's script using Doxygen. I plan for the site to be easy to update with different work as I develop my skills and experience.

## Execution and Development

I started by creating a simple website layout that I was happy with, including a brief personal introduction and links to various points of contact (Github, LinkedIn, Itch.io, email). I created the initial code in `index.html` with the use of generative AI (Google Gemini flash 3.8). This helped with rapid development and implementation of the ideas I had. I then added some minimal animations to the site - one was a fade in effect which starts the content with `opacity: 0` and `transform: translateY(18px)` then JavaScript uses a `IntersectionObserver` to wait until the content is 12% on screen and fades in the card. I also added an effect which fades in extra information on each section on the wings of the central card. After the site was complete, I added the Doxygen automatic documentation.

## Challenges and Adaptations

I had no previous experience with either GitHub actions or Doxygen, so I had to start by gaining a general understanding of them. I found that GitHub actions is used to run commands each time code is pushed to the repository, and that Doxygen is a compilation tool which looks for comment blocks and turns them into HTML documentation pages. Because of my unfamiliarity, I also did not understand that Doxygen was a tool mainly geared towards pure coding file types like C++ or C. To begin with the Doxyfile did not include .JS file types as a target until I added it to the `FILE_PATTERNS`.

The Github Actions build failed because it was looking for a `portfolio.js` file, within a `src` folder. But I had kept all my code within the root folder I resolved the issue by looking at the error provided by GitHub Actions and refactoring the structure to ensure that the files were all in the expected locations for the CI/CD pipeline to run.

## Critical Reflection and Lessons Learned

I produced a website and portfolio that I am pleased with and I think effectively shows off some of my completed work and my web development ability, as well as being something that I can add to and tweak in the future. The development was more reliant on AI than I would have liked in order to speed up the process, but I am happy with my understanding of the code and ability to make the changes that I want to it. I also learnt skills completely new to me with the use of Doxygen and GitHub Actions, and would like to research more into what I could use these systems for in future projects. Such as for automated builds of games or uploading new builds of games to Steam or Itch.