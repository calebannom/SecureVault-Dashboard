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

Wildcard Feature: Breadcrumb Trail
Feature: When a file is selected, a breadcrumb trail appears showing the full folder path from root to the selected file (e.g. 01_Legal_Department > Active_Cases > Doe_vs_MegaCorp > Case_Summary_Draft_v3.docx).

The gap I identified: The requirements specified file selection and a Properties Panel showing Name, Type, and Size — but provided no way for users to understand where in the folder hierarchy a selected file lives. For a law firm with thousands of deeply nested case files, a user who selects a file has zero positional context unless they manually trace back up the tree.

Business value: Lawyers and compliance officers work under time pressure with billable hours. Knowing that a file lives under Legal → Smith_Estate_Dispute → Correspondence vs Legal → Doe_vs_MegaCorp → Discovery_Phase is critical context — not just a nice-to-have. The breadcrumb eliminates the need to mentally reconstruct the path, reducing navigation cognitive load and file management errors.

Implementation: The findPath() function in Breadcrumb.jsx uses depth-first recursive search to traverse the full data tree and reconstruct the ancestor chain from root to the selected node. The last item in the path is highlighted in cyan (#3DD9D6) to distinguish the selected file from its parent folders.

Bonus Feature: Search with Auto-Expand
A live search bar filters the file tree and automatically expands parent folders to reveal matching results. Typing "payroll" instantly surfaces all payroll-related files across any depth, with the exact folder path auto-expanded for context. Clearing the search restores the original tree state.

Features
Recursive folder tree rendering from JSON (handles arbitrary nesting depth)
Expand/collapse folders on click
File selection with distinct visual state (cyan highlight + left border accent)
Properties Panel showing Name, Type, and Size of selected file
Breadcrumb trail showing full path to selected file
Full keyboard navigation: Up/Down to move focus, Right to expand, Left to collapse, Enter to select
Live search with automatic folder expansion to reveal matches
Hover state on tree items
Dark mode design system: cyber-secure aesthetic using JetBrains Mono + Inter typefaces

```
