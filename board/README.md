# FinSight Interactive Kanban — Read-Only Dashboard

[Open the GitHub Issues Kanban summary](../docs/KANBAN.md) · [Browse all GitHub Issues](https://github.com/JustEmre12/FinSight/issues)

The [index.html](index.html) file is a **static dashboard** that fetches this repository's public GitHub Issues and groups them by the seven stage labels: Product Backlog, Ready, In Progress, In Review, Done, Blocked and Future.

It supports viewing and filtering Issues, but it does **not** edit GitHub, move cards or replace a native GitHub Projects board. The source of truth is each Issue's `stage:` label. “Done” records written deliverables unless verified implementation is explicitly linked.

## How to view it

Open `index.html` locally in a browser (network access to the public GitHub API is required), or publish the repository through GitHub Pages and visit the `/FinSight/board/` path. **GitHub Pages is not enabled for this repository as of October 30, 2026**, so the source file is not yet a publicly hosted dashboard.

To update an Issue, open its GitHub page and change the stage label. To get a **native editable drag-and-drop Projects board**, a repository collaborator with sufficient access must create one in the GitHub Projects interface and add the existing Issues.

[Contribution workflow](../CONTRIBUTING.md) · [Sprint 6 design tasks](../docs/SPRINT6_DESIGN_REVIEW.md)
