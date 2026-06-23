# SecureVault Explorer

A high-performance, recursive file explorer UI built for SecureVault Inc. — an enterprise cloud security platform serving law firms and banks.

## Live Demo

[https://sv-dashboard.netlify.app/](https://sv-dashboard.netlify.app/)

## Design File

[Figma Design System](https://www.figma.com/design/Q4DauQE0qzT1LQ865fWnCz/SecureVault-Design-System?node-id=0-1&t=0BvPsnuPgJlXVKu3-1)

## Setup Instructions

```bash
git clone https://github.com/calebannom/SecureVault-Dashboard.git
cd SecureVault-Dashboard
npm install
npm run dev

Open http://localhost:5173 in your browser.

Tech Stack
 *React 18
 *Vite 5
 *Vanilla CSS (no component libraries)

Recursive Strategy
The folder structure from data.json is processed using a recursive flattenVisible() function in App.jsx. This function traverses the nested JSON tree depth-first, collecting only currently visible nodes (respecting which folders are open or closed) into a flat array for rendering.
This approach separates the recursive data-processing logic from the rendering layer, which enables flat keyboard navigation (Up/Down arrows moving linearly through visible items) across arbitrarily deep folder structures. The strategy was stress-tested to 20 levels of nesting without any UI breakdown or performance issues.

Wildcard Feature: Search with Auto-Expand
Inovation-Clause Feature: A live search bar that filters the file tree and automatically expands parent folders to reveal matching results.

Why I chose this: SecureVault's primary users are lawyers and compliance officers managing thousands of deeply nested case files. Without search, finding a specific document requires manually clicking through multiple folder levels — a slow, frustrating experience for power users under time pressure.

Business value: This feature directly addresses the core problem statement: making nested files easy to navigate. A lawyer searching "deposition" or "contract" instantly sees every matching file across all departments, with the exact folder path auto-expanded for context. This reduces file-finding time from minutes to seconds, which is measurable productivity value for a billable-hour profession.

Implementation: The filterTree() and nodeMatches() functions recursively traverse the full data tree on every keystroke, collecting IDs of folders that contain matches. These IDs are merged with the user's manually-opened folders to produce effectiveOpenIds — the set of folders that should appear open during a search. Clearing the search restores the original tree state.

Features
 *Recursive folder tree rendering from JSON (handles arbitrary nesting depth)
 *Expand/collapse folders on click
 *File selection with distinct visual state (cyan highlight + left border accent)
 *Properties Panel showing Name, Type, and Size of selected file
 *Full keyboard navigation: Up/Down to move focus, Right to expand, Left to collapse, Enter to select
 *Live search with automatic folder expansion to reveal matches
 *"No results found" state for empty searches
 *Dark mode design system: cyber-secure aesthetic using JetBrains Mono + Inter typefaces
```
