# Biome Design System

This project uses a **biome-aware design system** that dynamically adapts to different natural environments. Built around a glass morphism aesthetic with ambient nature imagery, the system allows seamless switching between distinct biome themes. Design tokens are defined in `src/app/globals.css` and exposed through Tailwind configuration.

## Core Principles
- **Biome Adaptation** – All visual elements dynamically adapt to the selected natural environment
- **Ambient Nature** – UI surfaces float above painted biome imagery using glass morphism
- **Dramatic Light** – Accent colors evoke each biome's unique lighting (lava glow, desert sun, etc.)
- **Quiet Minimalism** – Typography and controls remain lightweight across all environments
- **Organic Motion** – Animations reflect natural movement with gentle, wind-like easing
- **Seamless Transitions** – Smooth switching between biomes maintains visual continuity

## Design Tokens

### Core Tokens (Functional Naming)
```css
:root {
  /* neutrals */
  --c-neutral: #1b1f22;
  --c-neutral-sub: #2b3238;
  --c-text-high: #ffffff;
  --c-text-med: #c0c6ca;
  --c-text-low: #7d868d;

  /* functional accents */
  --c-accent: #c97a3c;
  --c-accent-sub: #4a6645;
  --c-danger: #e85f4d;

  /* primary theme colors (biome-aware) */
  --c-primary: var(--c-accent);
  --c-primary-sub: var(--c-accent-sub);

  /* elevations */
  --c-glass-top: rgba(32,38,42,0.15);
  --c-glass-bot: rgba(19,22,26,0.25);

  /* typography */
  --font-head: 'Playfair Display', serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --fs-hero: clamp(2.2rem, 5vw, 3.4rem);
  --fs-h1: 2rem;
  --fs-h2: 1.5rem;
  --fs-body-lg: 1.15rem;
  --fs-body: 1rem;
  --fs-mono: 0.9rem;
  --lh-tight: 1.1;
  --lh-body: 1.55;

  /* spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;

  /* radius & shadow */
  --radius-card: 20px;
  --radius-pill: 9999px;
  --shadow-accent: 0 0 40px 0 rgba(201,122,60,0.35);
  --shadow-elev-1: 0 2px 6px rgba(0,0,0,0.35);
  --shadow-elev-2: 0 6px 14px rgba(0,0,0,0.45);
}
```

## Biome Theming System

The heart of the design system is its ability to transform the entire visual experience based on natural environments. Each biome provides unique accent colors, background imagery, and atmospheric styling.

### Current Biomes
The system currently supports two distinct natural environments, with easy expandability for future biomes:

#### Misty Lava Forest (Default)
A volcanic landscape with flowing lava rivers and misty atmosphere. Features warm, fiery accent colors that evoke molten rock and ember glow.

```css
.biome-misty-lava-forest {
  --c-accent: #e85f4d;      /* molten lava orange-red */
  --c-accent-sub: #c97a3c;  /* ember glow */
  --c-danger: #ff6b4d;      /* brighter danger */
  --c-primary: #e85f4d;     /* biome-aware primary */
  --c-primary-sub: #c97a3c; /* biome-aware primary-sub */
  --c-neutral: #1a1d20;     /* cool volcanic ash */
  --c-neutral-sub: #252a2e; /* lighter ash */
}
```

#### Desert Oasis
A warm desert landscape with refreshing oasis waters. Features golden sand tones paired with cool turquoise accents representing life-giving water.

```css
.biome-desert-oasis {
  --c-accent: #d6a354;      /* desert gold */
  --c-accent-sub: #6bbfbd;  /* oasis turquoise */
  --c-danger: #d9543e;      /* desert sunset */
  --c-primary: #d6a354;     /* biome-aware primary */
  --c-primary-sub: #6bbfbd; /* biome-aware primary-sub */
  --c-neutral: #2a1f1a;     /* warm sandy neutral */
  --c-neutral-sub: #3a2e25; /* lighter sand */
}
```

### Background Images
Each biome includes a full-screen background image with smooth transitions:

```css
.biome-misty-lava-forest body {
  background-image: url('/biomes/misty-lava-forest.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.biome-desert-oasis body {
  background-image: url('/biomes/desert-oasis.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

body {
  transition: background-image 0.5s ease-in-out;
}
```

### Biome Selector
The navigation component includes a biome selector dropdown that:
- Dynamically applies biome classes to the document body
- Removes existing biome classes before applying new ones
- Persists selection across page navigation
- Includes smooth transitions between themes

## Utility Classes

### Design System Utilities
The system now includes comprehensive utility classes for consistent styling:

```css
/* Color Utilities */
.text-high, .text-med, .text-low, .text-accent, .text-danger
.bg-neutral, .bg-neutral-sub, .bg-primary, .bg-primary-sub, .bg-accent, .bg-danger

/* Typography Utilities */
.font-head, .font-body
.text-hero, .text-h1, .text-h2, .text-body-lg, .text-body, .text-mono
.leading-tight, .leading-body

/* Glass & Shadow Utilities */
.bg-glass-elev1, .bg-glass-elev2
.shadow-elev1, .shadow-elev2, .shadow-accent

/* Animation Utilities */
.animate-float, .animate-pulse-slow, .animate-fade-in
.animate-fade-in-up, .animate-slide-in-right, .animate-scale-in
```

### Form Components
- **Input**: Standard and glass variants with label, error, and helper text support
- **Textarea**: Resizable textarea with consistent styling
- **Select**: Styled select dropdowns matching the design system

## Core Components

### GlassCard
Frosted panel with configurable elevation and backdrop blur. The component uses `backdrop-blur-xl` to blur the background image behind it, creating a true glass effect:

```tsx
<GlassCard elevation={1} className="p-6">
  Content with glass effect
</GlassCard>
```

**Key Features:**
- Uses `backdrop-blur-xl` for proper glass blur effect
- No individual background images - relies on body background
- Configurable elevation (1 or 2) for different shadow depths
- Transparent overlay with subtle tinting for readability

### Section Component
Layout component that provides consistent section styling with configurable backgrounds:

```tsx
<Section background="transparent" title="Section Title" subtitle="Optional subtitle">
  <GlassCard className="p-6">
    Section content
  </GlassCard>
</Section>
```

**Background Options:**
- `transparent` - Fully transparent, allows biome background to show through (recommended)
- `primary` - Semi-transparent overlay using `--c-primary` (biome-aware)
- `primary-sub` - Semi-transparent overlay using `--c-primary-sub` (biome-aware)
- `accent` - Semi-transparent overlay using `--c-accent` (biome-aware)
- `accent-sub` - Semi-transparent overlay using `--c-accent-sub` (biome-aware)
- `neutral` - Dark overlay using `--c-neutral`
- `gradient` - Gradient using biome accent colors

**Critical Implementation Note:**
For proper glass effects, sections containing `GlassCard` components should use `background="transparent"` to ensure the biome background images are visible behind the glass cards.

### Logo Component
SVG-based logo that inherits accent color:
```css
.mask-logo {
  width: 120px;
  height: 32px;
  mask: url('/logo.svg') no-repeat center / contain;
  -webkit-mask: url('/logo.svg') no-repeat center / contain;
}
```

### Button System
The button component supports 5 variants with consistent styling:

- **Primary**: `bg-primary text-high` with accent shadow on hover and subtle lift
- **Secondary**: `bg-transparent text-accent border-accent` with fill on hover
- **Accent**: `bg-danger text-high` for destructive actions with enhanced shadow
- **Ghost**: `bg-transparent text-accent` with subtle background on hover
- **Outline**: `border-text-low text-med` with background fill on hover

**Sizes**: `sm`, `md`, `lg` with appropriate padding and border radius
**States**: Includes disabled state, focus rings, and hover animations

### Typography System
- Headers use `--font-head` (Playfair Display)
- Body text uses `--font-body` (Inter)
- All text uses `--c-text-high` for optimal contrast
- Responsive font sizes with `clamp()` for hero text

## Layout System
- **Glass Surface Container**: `.glass-surface` provides consistent content containment (max-width 1440px)
- **Responsive Grid**: 12‑column grid system adapts to different screen sizes
- **8pt Spacing Scale**: All padding and gaps follow the `--space-*` token system
- **Z‑index Layers**: scenery 100, flora 200, cards 300, modals 400, toast 500
- **Glass Morphism**: Consistent backdrop blur and elevation shadows across all components

### Container System
The design system uses a `.glass-surface` container class that provides:
- Centered content with responsive max-width
- Consistent horizontal padding across breakpoints  
- Proper z-index stacking for glass effects
- Seamless integration with biome backgrounds

## Recent Improvements

### Enhanced Tailwind Integration
- All design tokens are now properly integrated with Tailwind CSS
- Custom utility classes replace inline CSS variable usage
- Consistent spacing, typography, and color systems

### Complete Button System
- All 5 button variants fully implemented with proper hover states
- Size variants (sm, md, lg) with appropriate scaling
- Enhanced accessibility with focus states and disabled handling

### Animation System
- Complete set of organic animations matching design principles
- Utility classes for easy application: `animate-float`, `animate-fade-in`, etc.
- Smooth transitions and easing for natural motion

### Form Components
- New Input and Textarea components with design system integration
- Glass and default variants for different contexts
- Proper error handling and accessibility features

## Implementation Notes

### Token Migration
The system has migrated from poetic names to functional names:
- `--c-ember` → `--c-accent`
- `--c-moss` → `--c-accent-sub`
- `--c-lava` → `--c-danger`

### Utility Class Migration
Components now use design system utility classes instead of inline CSS variables:
- `text-[var(--c-text-high)]` → `text-high`
- `bg-[var(--c-neutral)]` → `bg-neutral`
- `border-[var(--c-text-low)]` → `border-text-low`

### Contrast Improvements
All text uses high-contrast tokens (`--c-text-high`, `--c-text-med`) for accessibility across all biomes.

### Performance Considerations
- Background images use `background-attachment: fixed` for parallax effect
- Smooth transitions prevent jarring theme changes
- CSS custom properties enable efficient runtime theme switching

### Transparency for Background Images
The glass elevation tokens have been optimized for transparency to ensure biome background images are visible:
- `--c-glass-top: rgba(32,38,42,0.15)` - 15% opacity instead of 65%
- `--c-glass-bot: rgba(19,22,26,0.25)` - 25% opacity instead of 85%

This allows the beautiful biome imagery to show through while maintaining the glass effect and readability.

### Transparency Architecture
The design system uses a layered transparency approach to create the glass effect:

**Layer 1: Body Background**
- Biome background images are set on the `body` element via CSS classes
- Uses `background-attachment: fixed` for parallax effect
- Provides the visual foundation for the entire interface

**Layer 2: Transparent Sections**
- All sections containing glass cards use `background="transparent"`
- This allows the body background to show through to the glass cards
- Critical for the glass effect to work properly

**Layer 3: Glass Cards**
- Use `backdrop-blur-xl` to blur whatever is behind them
- Include subtle tinted overlay for readability (`bg-glass-elev1` or `bg-glass-elev2`)
- Do not set their own background images

**Layer 4: Content**
- All content is positioned with `relative z-10` to appear above the glass overlay
- Text uses high-contrast colors (`--c-text-high`, `--c-text-med`) for readability

**Implementation Requirements:**
```tsx
// ✅ Correct - Transparent section allows background to show through
<Section background="transparent">
  <GlassCard className="p-6">
    Content with proper glass effect
  </GlassCard>
</Section>

// ❌ Incorrect - Opaque section blocks background image
<Section background="fog">
  <GlassCard className="p-6">
    No glass effect - background is blocked
  </GlassCard>
</Section>
```

The biome system allows for easy expansion - new themes only require:
1. New accent color overrides in CSS
2. Background image in `/public/biomes/`
3. Addition to biome selector dropdown

## Troubleshooting

### Glass Effect Not Working
If the glass blur effect isn't visible:

1. **Check Section Background**: Ensure sections use `background="transparent"`
2. **Check CSS Variables**: Verify glass opacity values are low enough:
   ```css
   --c-glass-top: rgba(32,38,42,0.15);  /* 15% opacity */
   --c-glass-bot: rgba(19,22,26,0.25);  /* 25% opacity */
   ```
3. **Check Body Background**: Ensure biome CSS is uncommented in `globals.css`
4. **Check BiomeProvider**: Verify the BiomeProvider is wrapping the app in `layout.tsx`

### Background Image Not Visible
If biome background images aren't showing:

1. **Check CSS**: Ensure biome background CSS is not commented out
2. **Check File Paths**: Verify images exist in `/public/biomes/`
3. **Check Transparency**: Ensure all parent elements allow transparency
4. **Check Z-Index**: Ensure no elements block the background

### Common Implementation Mistakes
- Using opaque section backgrounds (`neutral`, `neutral-sub`) with glass cards
- Setting background images directly on glass cards
- Using high opacity values for glass overlays
- Missing BiomeProvider context wrapper
