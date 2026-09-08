# Design Brief for This Portfolio

This file is instructions for the AI agent (Antigravity) working on this repo. Read this before touching layout, color, or content. The goal is not "a nice looking portfolio." The goal is a portfolio that could not be mistaken for a template, because the person behind it is a developer showing creative and technical range, not a business trying to look trustworthy.

## The core problem

Most AI-assisted portfolios converge on the same output: a dark navy or near-black background, a violet-to-blue gradient accent, Inter or Poppins, a hero with a name and a one-line tagline, a sticky navbar, a horizontal row of project cards with a hover lift, a skills section as a grid of icons, a contact form at the bottom. It is recognizable within two seconds because every AI tool defaults to it when given no strong direction. This brief exists to keep that from happening here.

If your first instinct for any section matches something you would find on a generic "developer portfolio template" site, that is a signal to throw it out and try a different structure, not to refine it.

## What to avoid, specifically

- No indigo/violet/blue gradient as the primary color story. That palette is the single most common AI-portfolio tell.
- No hero section that is just centered name, tagline, and two buttons.
- No default navbar-then-sections-then-footer skeleton unless you have a specific reason it serves the content better than an alternative structure.
- No glassmorphism cards, no generic "hover: translateY(-8px) + shadow" card treatment applied uniformly across every section.
- No stock skill-icon grids (the row of React/Node/Mongo logos in circles).
- No lorem-ipsum-shaped copy: no "Passionate developer who loves building things," no "Let's build something amazing together."
- No em dashes anywhere in written content. Use periods, commas, or restructure the sentence instead.
- No filler transition words for the sake of sounding polished ("Furthermore," "Moreover," "In today's digital landscape").

## What to aim for instead

Treat layout as something to be designed per project, not assembled from a component library in your head. Some directions worth considering, not as a checklist to combine but as examples of the kind of thinking that produces something distinct:

- A structure driven by how the work is actually organized rather than by convention. The projects span IoT, AI/ML, and backend/automation work. A layout that reflects that grouping (e.g. distinct visual zones or interaction models per category) will read as more intentional than one flat scroll of identical cards.
- Typography as a design decision, not a default. Pick a typeface pairing with a point of view (a technical monospace for code-adjacent content, a distinctive display face for section markers) rather than the safe system-font-stack choice.
- A color system built from one or two considered choices (could be near-monochrome with a single sharp accent, could be something unexpected like warm paper tones or a terminal-inspired palette) rather than a default dark theme with an accent gradient.
- Motion and interaction that responds to what's being shown, not a uniform hover effect applied everywhere. A backend/API project could reveal architecture on interaction rather than just scaling a card.
- Content that speaks like an engineer describing real systems: multi-tenant booking logic with RLS, JWT and refresh token handling, BullMQ-driven notifications, AI-based PDF extraction pipelines. Specific and technical reads as more credible than adjective-heavy summaries.

## Working method

1. Before writing any code, propose the overall structure and rationale in a sentence or two. Do not default to navbar-hero-projects-skills-footer without stating why that structure fits this content better than an alternative.
2. When choosing colors, typography, or layout, briefly note what you're deliberately avoiding and why, so the decision is traceable.
3. Prefer fewer, more considered sections over many generic ones.
4. If unsure whether something reads as generic, ask: would this exact section appear, with only the copy changed, on a template marketplace? If yes, redesign it.
5. Keep the current stack (vanilla JS + Vite) unless there's a concrete reason to change it. The goal is distinctive design, not a rewrite.

## Reference

Current site: https://github.com/huzaifa596/portfolio-wepsite