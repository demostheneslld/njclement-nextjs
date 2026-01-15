# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 15 app using the App Router.
- `src/app/` contains route segments, layouts, and page components (e.g., `src/app/team/page.tsx`).
- `src/components/` holds reusable UI and layout components (PascalCase filenames).
- `src/config/` centralizes constants, biomes, and PDF setup.
- `src/actions/` and `src/app/actions/` contain server actions and utilities.
- `src/contexts/` contains React context providers.
- `public/` holds static assets (images, biomes, logos).
- Tests live in `tests/unit/` and `tests/e2e/`.

## Build, Test, and Development Commands
This repo standardizes on Bun. Use Bun for all installs and scripts.
- `bun install`: Install dependencies from `package.json`.
- `bun run dev`: Start local dev server.
- `bun run build`: Production build (static + server output).
- `bun run start`: Run the production server from `.next`.
- `bun run lint`: ESLint checks (Next.js config).
- `bun run test`: Unit tests (Jest).
- `bun run test:e2e`: Playwright E2E tests via `bunx`.

Node version: use `.nvmrc` (currently Node 22). Example: `nvm use`.

When to run:
- Run `bun run lint` and `bun run build` before opening a PR or after dependency/framework upgrades.
- CI runs lint, tests, and build; keep the local run clean to avoid CI surprises.

Build note:
- Next 16 uses Turbopack. Local builds may require permission to bind a port (environment/sandbox dependent).

E2E tests:
- CI runs a smoke-only Playwright suite (single Chromium project) capped at ~2 minutes.
- Full E2E scenarios live in `tests/e2e/extended/` for manual runs.

## Coding Style & Naming Conventions
- TypeScript + React with functional components.
- Use existing Tailwind utility patterns and design tokens in `src/app/globals.css`.
- Components: PascalCase (`TeamCard.tsx`), hooks: `useX`.
- Prefer `next/image` for images and `next/dynamic` for heavy client-only modules.
- Follow ESLint rules from `eslint-config-next`; format implicitly via lint.

## Testing Guidelines
- Unit tests: Jest in `tests/unit/*.test.ts`.
- E2E tests: Playwright in `tests/e2e/*.spec.ts`.
- Keep tests focused on visible behavior and API output; no explicit coverage threshold is defined.

## Commit & Pull Request Guidelines
Recent history shows no strict commit message standard (e.g., `fix`, `skills`).
Use short, imperative commit messages (e.g., “add team page”, “fix pdf export”).
PRs: include a brief description, key changes, and UI screenshots when touching layout or styling.

## Collaboration & Review Notes
- Prefer decisions that keep rendering separate from content; treat UI as a view layer.
- When closing a task, consider optimization opportunities only if the implementation is veering off in an odd direction; suggest a concrete optional improvement (ideally grounded in existing skills or best practices).

## Content & Rendering Separation (Core Principle)
Keep anything that is not strictly rendering in configuration so content can evolve independently of UI.
- Store copy, labels, navigation items, and data in `src/config/` (or similar) and reference them from components.
- Components should focus on layout, structure, and styling; avoid embedding business copy directly in JSX unless it is purely presentational.
- If new sections are added, create/extend config entries first, then render them.

## Design & Engineering Principles
- Favor SOLID‑inspired design: single responsibility, clear boundaries, and dependency inversion where appropriate.
- Prefer composable patterns (small components, hooks, utilities) over large multi-purpose modules.
- Keep side effects isolated and explicit (e.g., data fetching in server components/actions).
- Choose simple patterns first; introduce abstraction only when it reduces duplication or complexity.

## Configuration & Environment
- Add local secrets to `.env.local` (see `.env.example` for keys).
- Biome/theme preference uses cookies; avoid localStorage for theme state.
