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
- **Centralized Configuration**: All customizable values in `/src/config/` for easy personalization

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
- Navigation uses Button components with custom glass morphism states
- BiomeSelector replaces HTML select with glass dropdown component

## Important Implementation Details

### Configuration Management (Open Source Friendly)

**IMPORTANT: Keep all configurable values in `/src/config/`** - This is an open source project designed for easy customization by other developers.

**Current configuration files:**
- `constants.ts` - Site metadata, navigation, social links, portfolio items, career info, technical skills
- `ai.ts` - OpenAI configuration and prompts
- `pdf-setup.ts` - PDF generation settings
- `biomes.ts` - All biome themes with colors, images, and descriptions
- `tags.ts` - Technical skill tag categories and color mappings

**Configuration principles:**
- All personal/customizable data should live in `/src/config/` files
- Avoid hardcoding values in components - reference config imports instead
- This allows users to fork the project and customize by editing only `/src/config/`
- Biome definitions are now centralized in `/src/config/biomes.ts` for easy customization
- New biomes can be added by simply editing the BIOMES array in biomes.ts

**Example usage:**
```typescript
// Good - customizable
import { siteConfig } from '@/config/constants';
import { getTagColor } from '@/config/tags';
<h1>{siteConfig.name}</h1>

// Bad - hardcoded
<h1>Nathaniel J. Clement</h1>
<span className="bg-accent/20 text-accent">AI & ML</span>
```

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

- Available biomes: 9 total (configured in `/src/config/biomes.ts`)
- Default biome: `namibia` (configurable via `DEFAULT_BIOME` export)
- Each biome has unique accent colors, contrast colors, and background images
- Biome classes are applied to document element by `BiomeProvider`
- Background images located in `/public/biomes/`
- BiomeSelector component handles theme switching with hydration safety
- Prevents SSR/client mismatches with mounted state pattern
- BiomeContext imports types from config for type safety
- Background images follow naming pattern: `/biomes/{biome-id}.png`
- Photo-aware color strategy: accent colors blend with photos, contrast colors ensure readability

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
- Navigation uses Button components with custom className overrides for glass states
- Client components that render differently on server/client use mounted state pattern

**Testing:**

- **Unit Tests**: Jest with ts-jest preset for component and utility testing
- **E2E Tests**: Playwright for comprehensive end-to-end testing
- **Test Files**: Located in `/tests` directory
- **Test Separation**: End-to-end tests are in `/tests/e2e/` and unit tests are in `/tests/unit/`
- **Import Aliases**: Use `@/` alias in test files
- **Multi-browser Testing**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Responsive Testing**: Desktop (1024x768) and Mobile (375x667) viewports
- **Jest Configuration**: Configured to run unit tests only, ignoring E2E tests

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
├── unit/
│   └── buildPdf.test.ts        # Unit tests for PDF generation
├── e2e/
│   ├── navigation.spec.ts      # Navigation functionality tests
│   ├── biome-switching.spec.ts # Biome theme switching tests
│   ├── biome-contrast.spec.ts  # Accessibility and contrast tests
│   └── playwright.config.ts    # Playwright configuration
└── shared test utilities and helpers
```

**Key Test Scenarios:**

1. **Navigation Tests**: Desktop and mobile navigation, page routing, external links
2. **Biome Tests**: Theme switching, persistence, cross-viewport synchronization for all 9 biomes
3. **Responsive Tests**: Mobile menu toggle, viewport switching, responsive design
4. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management
5. **Contrast Tests**: WCAG AA compliance (4.5:1 ratio) for all biomes and critical text elements
6. **Biome Accessibility**: Focus states, color consistency, mobile readability across all themes

**Test Data:**

- **Navigation Pages**: Home (`/`), Resume (`/resume`), Portfolio (`/portfolio`), Contact (`/contact`), Chat (`/chat`)
- **Biome Themes**: 9 total including Namibia (default), Giza, Kilimanjaro, Malibu, Oahu, Verona, Washington DC, Yosemite, Zanzibar
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
- Includes bash, curl, and unzip for Bun installation compatibility
- Uses frozen lockfile for dependency consistency
- Proper Alpine package management for containerized environments
