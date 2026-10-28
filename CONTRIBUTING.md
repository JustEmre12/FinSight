# FinSight collaboration and contribution guide

1. Select a GitHub Issue, verify its acceptance criteria and current stage.
2. Use a feature branch from main. Link issue references in commits/PRs.
3. Never commit private financial data, credentials, API keys or local environment files.
4. Open a PR documenting behavior, tests and screenshots for UI. A teammate should review it.
5. Update the Issue stage label as work progresses, removing the previous stage label. Only one stage label should be active.
6. Mark code tasks Done only when functionality is reviewed and tested. Documentary tasks marked Done mean the **deliverable exists**, not that feature code exists.
7. Ask the team to confirm responsibility before assigning Issues to Github accounts.

## Workflow statuses
stage:backlog → stage:ready → stage:in-progress → stage:in-review → stage:done. Use stage:blocked for dependencies and stage:future for outside-MVP options.

## Branches and review
Use small reviewable changes, e.g. feature/stock-search or docs/research. Update requirements/diagrams when behavior changes. Test invalid input, missing data, delayed quotes and potential AI errors. Disclose assumptions and costs.

## Kanban
The repo's [Kanban overview](docs/KANBAN.md) groups Issues by seven stages. A **native GitHub Projects board** can also be created in the GitHub UI with matching Status columns; the connected GitHub tool does not expose creation of Project boards.

See the [team charter](docs/TEAM_CHARTER.md) for role proposals, meetings and decisions.
