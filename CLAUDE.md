# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager:** Use Bun instead of npm for all commands

**Primary Development:**

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run test` - Run all Jest tests
- `bunx jest tests/buildPdf.test.ts` - Run specific test file

**End-to-End Testing:**

- `bun run test:e2e` - Run all Playwright tests
- `bun run test:e2e:ui` - Run Playwright tests with UI mode
- `bun run test:e2e:headed` - Run Playwright tests in headed mode
- `bun run test:e2e:debug` - Run Playwright tests in debug mode
- `bunx playwright test navigation.spec.ts` - Run specific test file
- `bunx playwright test --project chromium` - Run on specific browser

**Docker Development:**

- `./scripts/docker_local.sh` - Local development with Docker (simulates deployment)
- `./scripts/docker_build.sh` - Build Docker image
- `./scripts/docker_push.sh` - Push Docker image

## Architecture Overview

This is a Next.js 15 personal portfolio site with a sophisticated design system and biome theming. The architecture follows modern React patterns with TypeScript throughout.

### Key Architectural Patterns

- **App Router**: Uses Next.js 13+ app router in `/src/app/`
- **Component Structure**: Organized into `/ui/` and `/structure/` subdirectories
- **Design System**: Comprehensive design tokens and utility classes in CSS variables
- **Biome Theming**: Dynamic theme switching with React Context
- **Server Actions**: Located in `/src/actions/` for server-side functionality
- **Type Safety**: Strict TypeScript with interfaces in `/src/types/`

### Core Systems

**Design System ("Misty Forest"):**

- Design tokens defined in `src/app/globals.css` as CSS variables
- Utility classes exposed through Tailwind configuration
- Glass effect components with backdrop blur
- Biome-based theming with dynamic background images

**Biome Context System:**

- `BiomeProvider` wraps entire app in `layout.tsx`
- Dynamic theme switching with smooth transitions
- CSS classes applied to document element for global theming
- Background images set on body element via CSS classes

**Component Architecture:**

- Glass cards use `backdrop-blur-xl` for proper glass effects
- Sections with `background="transparent"` allow biome backgrounds to show through
- Logo component uses SVG masking with accent color inheritance
- Form components have both standard and glass variants

## Important Implementation Details

### Design System Integration

- All design tokens are CSS variables exposed to Tailwind
- Use utility classes like `text-high`, `bg-glass-elev1`, `shadow-accent`
- Avoid inline CSS variables - use the utility classes instead
- Typography uses `font-head` (Playfair Display) for headings, `font-body` (Inter) for body text

### Glass Effect Requirements

For proper glass blur effects:

1. Sections containing glass cards must use `background="transparent"`
2. Glass cards rely on `backdrop-blur-xl` to blur the biome background
3. Background images are set on the body element, not individual components
4. Use low opacity for glass overlays (15-25%) to maintain transparency

### Biome Theming

- Available biomes: `misty-lava-forest` (default), `desert-oasis`
- Each biome has unique accent colors and background images
- Biome classes are applied to document element by `BiomeProvider`
- Background images located in `/public/biomes/`

### OpenAI Integration

- Chat functionality uses OpenAI API with usage limits
- Set `OPENAI_API_KEY` environment variable
- Optional `OPENAI_USAGE_LIMIT` for monthly spending cap
- Chat endpoint responds with limit exceeded message when quota reached
- Chat component uses glass-style textarea input for better UX and design consistency

## File Structure Conventions

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── actions/        # Server actions
│   └── */page.tsx      # Page components
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── structure/     # Layout components
├── config/            # Configuration files
├── contexts/          # React contexts
└── types/            # TypeScript type definitions
```

## Development Notes

**Code Style:**

- Uses `@/` alias for src imports
- Default exports for components, named exports for utilities
- Strict TypeScript with proper interface definitions
- TailwindCSS with custom design system utilities
- All components use design system utility classes (text-high, text-med, etc.)
- Glass effects require transparent section backgrounds
- Transparent colors use proper syntax: `bg-accent/30`, `border-primary/50` etc.
- CSS custom properties support alpha values through Tailwind config
- Form components use glass variants for better contrast and visual cohesion
- Chat and contact forms both use Textarea components for multi-line input

**Testing:**

- **Unit Tests**: Jest with ts-jest preset for component and utility testing
- **E2E Tests**: Playwright for comprehensive end-to-end testing
- **Test Files**: Located in `/tests` directory
- **Test Separation**: End to end tests are in `/tests/e2e/` and unit tests are in `/tests/unit/`
- **Import Aliases**: Use `@/` alias in test files
- **Multi-browser Testing**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Responsive Testing**: Desktop (1024x768) and Mobile (375x667) viewports
- **Jest Configuration**: Excludes Playwright `.spec.ts` files from Jest runs

**Test Coverage:**

- Navigation functionality (desktop and mobile)
- Biome switching and theme persistence
- Form interactions and validation
- Mobile menu toggle and responsive behavior
- Page routing and state management
- Accessibility features and keyboard navigation

**PDF Generation:**

- Custom PDF generation system with content renderers
- Types defined in `/src/types/pdf/`
- Configuration in `/src/config/pdf-setup.ts`

**Environment Variables:**

- `OPENAI_API_KEY` - Required for chat functionality
- `OPENAI_USAGE_LIMIT` - Optional monthly spending limit
- `NEXT_PUBLIC_BASE_URL` - Base URL for the application

## Testing Setup

**Playwright Configuration:**

- Multi-browser testing across Chrome, Firefox, Safari, and mobile variants
- Automatic dev server startup for testing
- Role-based locators for accessibility compliance
- Responsive testing with desktop and mobile viewports

**Test Structure:**

```
tests/
├── navigation.spec.ts      # Navigation functionality tests
├── biome-switching.spec.ts # Biome theme switching tests
└── playwright.config.ts    # Playwright configuration
```

**Key Test Scenarios:**

1. **Navigation Tests**: Desktop and mobile navigation, page routing, external links
2. **Biome Tests**: Theme switching, persistence, cross-viewport synchronization
3. **Responsive Tests**: Mobile menu toggle, viewport switching, responsive design
4. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management

**Test Data:**

- **Navigation Pages**: Home (`/`), Resume (`/resume`), Portfolio (`/portfolio`), Contact (`/contact`), Chat (`/chat`)
- **Biome Themes**: "Misty Lava Forest" (default), "Desert Oasis"
- **Viewports**: Desktop (1024x768), Mobile (375x667)
- **Browsers**: Chromium, Firefox, Safari, Mobile Chrome, Mobile Safari

## Deployment

The application is containerized and deployed via GitHub Actions to GitHub Container Registry. The Next.js configuration uses `output: "standalone"` for optimal Docker deployment.

**GitHub Actions Workflows:**

- **CI Pipeline** (`ci.yml`): Runs on all pushes and PRs to main branch
  - Linting and unit tests with Bun
  - Full Playwright E2E test suite across multiple browsers
  - Build verification before deployment

- **Build Docker Image** (`build-docker-image.yml`): Builds and tests Docker images
  - Depends on successful CI tests
  - Builds Docker image with Bun support
  - Uploads test artifacts for debugging

- **Production Deploy** (`deploy-production_njclement.yml`): Deploys to Azure Web App
  - Triggers on pushes to `deploy/production` branch
  - Builds and pushes to GitHub Container Registry
  - Automatically deploys to Azure Web App

**Docker Configuration:**

- Multi-stage build with Node.js 18 Alpine base
- Bun package manager support with automatic detection
- Fallback to npm/yarn/pnpm for compatibility
- Optimized for production with standalone output
