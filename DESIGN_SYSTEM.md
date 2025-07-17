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

### Color System Overview

The design system uses a semantic color approach where colors are named by their function rather than their appearance. This allows biomes to completely transform the visual experience while maintaining consistent component behavior.

#### Color Naming Convention
- **accent**: Primary brand/theme color - can blend with background images
- **accent-contrast**: High contrast version - MUST contrast well with background photos for readable text
- **primary**: Main interactive elements (inherits from accent) - can blend with background
- **primary-contrast**: High contrast version (inherits from accent-contrast) - MUST be readable over photos
- **danger**: Error/warning states
- **neutral**: Dark backgrounds
- **neutral-sub**: Medium backgrounds
- **text-high**: High contrast text (white)
- **text-med**: Medium contrast text (light gray)
- **text-low**: Low contrast text (medium gray)

#### Photo-Aware Color Strategy
The design system implements a **dual-purpose color strategy** specifically engineered for readability over dynamic biome photography:

**Base Colors (Harmonious)**
- `accent` and `primary` - Designed to harmonize with background photos for decorative elements
- Used for: Glass overlays, subtle highlights, decorative borders
- May have similar tones to background for aesthetic cohesion

**Contrast Colors (High Readability)**  
- `accent-contrast` and `primary-contrast` - Engineered for maximum readability over any background photo
- Used for: All text overlays, navigation text, important UI elements, logo text
- Always provide 4.5:1+ contrast ratio against background imagery
- Essential for accessibility compliance (WCAG AA)

**Implementation Strategy**
This dual approach ensures:
1. **Visual Harmony**: Decorative elements blend naturally with biome imagery
2. **Text Legibility**: All readable content maintains excellent contrast
3. **Accessibility**: WCAG AA compliance across all biomes
4. **Flexibility**: Same components work across dramatically different backgrounds

**Critical Usage Guidelines**
- Text that must be readable → Use `*-contrast` colors
- Decorative elements that can blend → Use base colors
- Never use base colors for essential text over photos

### Core Tokens (Functional Naming)
```css
:root {
  /* neutrals - layout backgrounds */
  --c-neutral: #1b1f22;        /* main dark background */
  --c-neutral-sub: #2b3238;    /* secondary dark background */
  
  /* text hierarchy - accessibility compliant */
  --c-text-high: #ffffff;      /* primary text, headings */
  --c-text-med: #c0c6ca;       /* secondary text, descriptions */
  --c-text-low: #7d868d;       /* tertiary text, placeholders */

  /* functional accents - biome aware */
  --c-accent: #c97a3c;         /* primary brand/theme color */
  --c-accent-contrast: #4a6645; /* harmonious contrast to accent */
  --c-danger: #e85f4d;         /* error/warning states */

  /* primary theme colors - inherit from accents */
  --c-primary: var(--c-accent);          /* main interactive elements */
  --c-primary-contrast: var(--c-accent-contrast); /* secondary interactive elements */

  /* glass morphism - biome configurable */
  --c-glass-top: rgba(32, 38, 42, 0.15);    /* glass overlay top */
  --c-glass-bottom: rgba(19, 22, 26, 0.25); /* glass overlay bottom */
  --c-glass-border: rgba(255, 255, 255, 0.2); /* glass border */

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
The system supports nine distinct natural environments, each with unique color palettes and atmospheric styling:

#### Destinations Collection

**Giza** - Ancient Egyptian pyramids with Nile influences
- **Accent**: Warm sandstone (`#d4a574`) - Harmonizes with pyramid golden tones for decorative elements
- **Contrast**: Deep nile blue (`#2d5366`) - **Critical for readability** - Dark blue ensures text visibility over bright pyramid backgrounds
- **Strategy**: Sandstone blends aesthetically, nile blue provides essential contrast for all text
- Glass: Dual-tone overlays (sandstone + nile blue) for optimal photo integration

**Kilimanjaro** - Majestic mountain with glacial and savanna elements
- **Accent**: Glacier blue (`#8fb4d4`) - Complements mountain sky tones for aesthetic elements
- **Contrast**: Deep forest green (`#2f4f2f`) - **Essential for legibility** - Dark green ensures readability over bright snow and sky
- **Strategy**: Blue harmonizes with glacial colors, forest green provides critical text contrast

**Malibu** - Coastal California beach vibes  
- **Accent**: Ocean blue (`#5fbcd3`) - Mirrors water and sky colors for decorative use
- **Contrast**: Rich brown (`#8b4513`) - **Critical for visibility** - Warm brown contrasts strongly against bright beach/ocean backgrounds
- **Strategy**: Ocean blue blends naturally, brown ensures text readability over bright coastal scenes

**Namibia (Default)** - African desert with red dunes
- **Accent**: Dune gold (`#e8a447`) - Echoes warm sand tones for aesthetic harmony  
- **Contrast**: Deep desert brown (`#4a2c17`) - **Essential for readability** - Dark brown provides strong contrast over bright dune colors
- **Strategy**: Gold harmonizes with desert palette, brown ensures text visibility over luminous sand

**Oahu** - Tropical Hawaiian paradise
- **Accent**: Tropical turquoise (`#4ecdc4`) - Reflects lagoon colors for decorative elements
- **Contrast**: Deep tropical green (`#1a472a`) - **Critical for legibility** - Dark green ensures text visibility over bright tropical backgrounds  
- **Strategy**: Turquoise complements ocean tones, deep green provides essential text contrast

**Verona** - Italian Renaissance architecture
- **Accent**: Terracotta (`#d4a373`) - Harmonizes with warm stone architecture for aesthetic elements
- **Contrast**: Deep walnut brown (`#2d1810`) - **Essential for readability** - Rich brown ensures text visibility over warm architectural backgrounds
- **Strategy**: Terracotta blends with stone colors, walnut provides critical text contrast

**Washington DC** - Monument and federal architecture  
- **Accent**: Monument marble (`#b8cddb`) - Complements white marble monuments for decorative use
- **Contrast**: Deep federal blue (`#1e3a5f`) - **Critical for visibility** - Navy blue ensures strong contrast over bright monument backgrounds
- **Strategy**: Marble tones blend aesthetically, federal blue provides essential text readability

**Yosemite** - National park with granite and forests
- **Accent**: Forest green (`#7fb069`) - Echoes natural forest colors for decorative harmony
- **Contrast**: Deep forest shadow (`#2c3e2d`) - **Essential for legibility** - Very dark green ensures text visibility over bright granite and sky
- **Strategy**: Forest green harmonizes naturally, shadow green provides critical text contrast  

**Zanzibar** - Exotic island with spice markets
- **Accent**: Indian ocean (`#4fc3c7`) - Mirrors tropical ocean colors for aesthetic elements
- **Contrast**: Rich spice brown (`#8b4513`) - **Critical for readability** - Warm brown ensures text visibility over bright tropical scenes
- **Strategy**: Ocean blue complements tropical palette, spice brown provides essential text contrast

### Background Images
Each biome includes a full-screen background image with smooth transitions. All biomes follow the same pattern:

```css
.biome-{name} body {
  background: url('/biomes/{name}.png') center/cover fixed no-repeat var(--c-neutral) !important;
}

body {
  transition: background-image 0.5s ease-in-out;
}
```

**Available Background Images:**
- `namibia.png` - Red sand dunes (default)
- `giza.png` - Egyptian pyramids at sunset
- `kilimanjaro.png` - Mountain peak with savanna
- `malibu.png` - California coastline
- `oahu.png` - Hawaiian tropical beach
- `verona.png` - Italian architecture
- `washington-dc.png` - Federal monuments
- `yosemite.png` - National park landscapes
- `zanzibar.png` - Exotic island scenes

### Enhanced Glass Morphism System

Each biome provides specialized glass overlay colors that integrate with the photo-aware color strategy:

```css
/* Example: Giza biome glass colors */
.biome-giza {
  --c-glass-top: rgba(212, 165, 116, 0.12);   /* warm sandstone glass overlay */
  --c-glass-bottom: rgba(45, 83, 102, 0.18);  /* deep nile blue glass overlay */
  --c-glass-border: rgba(212, 165, 116, 0.25); /* sandstone glass border */
}
```

**Glass Color Strategy:**
- **Top overlay**: Uses harmonious accent color for aesthetic integration with background photos
- **Bottom overlay**: Uses high-contrast color for depth and text readability support
- **Border**: Uses accent color for visual continuity with decorative elements
- **Opacity levels**: Carefully calibrated (12-25%) to maintain background photo visibility while ensuring glass effect

**Benefits:**
- Glass overlays complement each biome's unique atmosphere without obscuring photography
- Dual-tone approach supports both aesthetic harmony and text readability
- Maintains consistent glass morphism effect across dramatically different backgrounds
- Smooth transitions between biome glass styles preserve visual continuity

### Biome Selector
The BiomeSelector is a custom dropdown component that replaces the standard HTML select element:

```tsx
<BiomeSelector />
```

**Key Features:**
- Glass morphism dropdown with backdrop blur effect
- Shows current biome with emoji icon and label
- Animated chevron that rotates when open
- Click-outside-to-close functionality
- Hydration-safe with loading placeholder
- Responsive design (hides label on small screens)

**Implementation Details:**
- Located at `/src/components/ui/BiomeSelector.tsx`
- Uses `mounted` state to prevent hydration mismatches
- Shows skeleton loader during SSR
- Highlights current selection with accent color
- Smooth transitions between open/closed states

## Utility Classes

### Color Usage Guide

#### Where Each Color is Used

**Text Colors:**
- `--c-text-high` → Headings (h1, h2, h3), primary text, button labels
- `--c-text-med` → Secondary text, navigation labels, descriptions  
- `--c-text-low` → Tertiary text, placeholders, disabled states

**Accent Colors:**
- `--c-accent` → **Harmonious decorative elements** - Glass overlays, subtle highlights, decorative borders that complement background photos
- `--c-accent-contrast` → **High-contrast text** - Logo text, navigation links, text overlays that must be readable over any background
- `--c-danger` → **Error states** - Warning messages, destructive action buttons

**Primary Colors (inherit from accent):**
- `--c-primary` → **Aesthetic elements** - Background highlights, decorative touches that can blend with biome imagery  
- `--c-primary-contrast` → **Critical readable text** - Button labels, important UI text, any text requiring guaranteed legibility

**Background Colors:**
- `--c-neutral` → Main dark backgrounds, cards, modals
- `--c-neutral-sub` → Secondary backgrounds, input fields, hover states

**Glass Colors (biome-specific):**
- `--c-glass-top` → Top gradient for glass overlays
- `--c-glass-bottom` → Bottom gradient for glass overlays  
- `--c-glass-border` → Glass card borders and dividers

### Design System Utilities
The system includes comprehensive utility classes for consistent styling:

```css
/* Color Utilities */
.text-high, .text-med, .text-low, .text-accent, .text-accent-contrast, .text-danger
.bg-neutral, .bg-neutral-sub, .bg-primary, .bg-primary-contrast, .bg-accent, .bg-accent-contrast, .bg-danger

/* Typography Utilities */
.font-head, .font-body
.text-hero, .text-h1, .text-h2, .text-body-lg, .text-body, .text-mono
.leading-tight, .leading-body

/* Glass & Shadow Utilities (biome-aware) */
.bg-glass-elev1, .bg-glass-elev2
.shadow-elev1, .shadow-elev2, .shadow-accent

/* Border Utilities */
.border-accent, .border-accent-contrast, .border-primary, .border-primary-contrast
.border-text-low, .border-text-med, .border-white-20, .border-white-30

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
- `primary-contrast` - Semi-transparent overlay using `--c-primary-contrast` (biome-aware)
- `accent` - Semi-transparent overlay using `--c-accent` (biome-aware)
- `accent-contrast` - Semi-transparent overlay using `--c-accent-contrast` (biome-aware)
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

### Navigation System
The navigation uses Button components with custom glass morphism styling:

**Desktop Navigation:**
- Uses `ghost` variant as base
- Current page: `bg-glass-elev1 backdrop-blur-sm text-high`
- Hover state: `bg-glass-elev2 backdrop-blur-sm hover:text-high`
- Compact spacing with `sm` size buttons

**Mobile Navigation:**
- Full-screen overlay with `backdrop-blur-xl`
- Header section with solid `bg-neutral`
- Navigation links section with `bg-neutral-sub backdrop-blur-xl`
- Full-width buttons with left-aligned text
- Integrated BiomeSelector at bottom

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

### Photo-Aware Color Strategy Implementation
- **Dual-purpose color system**: Base colors for harmony, contrast colors for readability
- **WCAG AA compliance**: All contrast colors engineered for 4.5:1+ ratio over background photos
- **Strategic color usage**: Clear guidelines for when to use harmonious vs. high-contrast colors
- **Biome-specific optimization**: Each biome's contrast colors tailored for its specific background imagery

### Enhanced Tailwind Integration
- All design tokens properly integrated with Tailwind CSS
- Custom utility classes replace inline CSS variable usage
- Consistent spacing, typography, and color systems
- New contrast color utilities (`text-accent-contrast`, `bg-primary-contrast`, etc.)

### Complete Button System
- All 5 button variants fully implemented with proper hover states
- Size variants (sm, md, lg) with appropriate scaling
- Enhanced accessibility with focus states and disabled handling
- Updated to use contrast colors for text elements

### Biome-Aware Glass Morphism
- Each biome provides custom glass overlay colors
- Dual-tone approach (harmonious + contrast) for optimal photo integration
- Carefully calibrated opacity levels maintain background visibility
- Smooth transitions between biome glass styles

### Form Components
- New Input and Textarea components with design system integration
- Glass and default variants for different contexts
- Proper error handling and accessibility features
- Updated to use contrast colors for readable text

## Implementation Notes

### Token Migration
The system has migrated to clear, functional naming:
- All `*-sub` tokens → `*-contrast` for clarity
- `--c-glass-bot` → `--c-glass-bottom`

### Utility Class Migration
Components now use design system utility classes instead of inline CSS variables:
- `text-[var(--c-text-high)]` → `text-high`
- `bg-[var(--c-neutral)]` → `bg-neutral`
- `border-[var(--c-text-low)]` → `border-text-low`
- `text-accent-sub` → `text-accent-contrast`
- `bg-primary-sub` → `bg-primary-contrast`

### Current Variable Status
All design tokens defined in `globals.css` are actively used throughout the system:
- **Color variables**: All accent, primary, neutral, text, and danger colors are in use
- **Typography variables**: All font families, sizes, and line heights are used via Tailwind config
- **Spacing variables**: Defined for consistency but Tailwind's default spacing is primarily used
- **Glass variables**: All glass overlay and border variables are used in biome-specific styling
- **Shadow & radius variables**: All shadow and border radius tokens are actively used

### Photo-Aware Contrast Strategy
The design system now implements a sophisticated contrast strategy specifically for dynamic background photography:

**Text Readability Strategy:**
- All critical text (navigation, headings, body text) uses `text-high`, `text-med`, or contrast colors
- Logo and navigation links use `text-accent-contrast` for guaranteed visibility over any background
- Button labels and important UI text use contrast color variants
- Text gradients use contrast colors to ensure readability over photos

**Color Selection Methodology:**
- **Contrast colors** chosen specifically to provide 4.5:1+ contrast against each biome's background imagery
- **Base colors** selected to harmonize aesthetically with background photos for decorative elements
- **Testing approach** verifies contrast across multiple areas of each background image
- **Accessibility compliance** ensures WCAG AA standards across all biomes

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
1. CSS class with color overrides in `globals.css`
2. Background image in `/public/biomes/`
3. Addition to `BiomeType` union in `BiomeContext.tsx`
4. Entry in `BIOMES` array in `BiomeSelector.tsx`

## Troubleshooting

### Glass Effect Not Working
If the glass blur effect isn't visible:

1. **Check Section Background**: Ensure sections use `background="transparent"`
2. **Check CSS Variables**: Verify glass opacity values are low enough:
   ```css
   --c-glass-top: rgba(32,38,42,0.15);     /* 15% opacity */
   --c-glass-bottom: rgba(19,22,26,0.25);  /* 25% opacity */
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
