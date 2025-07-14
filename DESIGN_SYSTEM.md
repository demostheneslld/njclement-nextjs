# Misty Forest Design System

This project uses a lightweight design system inspired by the "Misty-Forest" theme. Tokens are defined in `src/app/globals.css` and exposed through Tailwind configuration.

## Principles
- **Ambient Nature** – UI surfaces float above a painted background.
- **Dramatic Light** – warm emissive glows hint at sunrise or camp-fire.
- **Quiet Minimalism** – typography and controls are lightweight.
- **Organic Motion** – wind‑blown animations with gentle easing.

## Design Tokens
```css
:root {
  /* neutrals */
  --c-bg-night:  #1b1f22;
  --c-bg-fog:    #2b3238;
  --c-text-high: #ffffff;
  --c-text-med:  #c0c6ca;
  --c-text-low:  #7d868d;

  /* accents */
  --c-ember:     #c97a3c;
  --c-moss:      #4a6645;
  --c-lava:      #e85f4d;

  /* elevations */
  --c-glass-top: rgba(32,38,42,0.65);
  --c-glass-bot: rgba(19,22,26,0.85);

  /* typography */
  --font-head:   "Playfair Display", serif;
  --font-body:   "Inter", system-ui, sans-serif;
}
```

### Biome Overrides
Only the accent tokens change per biome:
```
/* desert-oasis.css */
:root {
  --c-ember:#d6a354;
  --c-moss:#6bbfbd;
  --c-lava:#d9543e;
}
```

## Core Components
- **GlassCard** – frosted panel with configurable elevation.
- **Button** – pill shaped; solid ember by default.
- **MetricList** – two‑column list with subtle separators.
- **Slider** – glowing ember thumb and accent gradient track.
- **Toast** – mini GlassCard anchored bottom center.

## Layout Rules
- 12‑column grid, max‑width 1440px.
- Padding and gaps follow an 8‑pt scale.
- Z‑index layers: scenery 100, flora 200, cards 300, modals 400, toast 500.

The tokens above can be swapped to create new biome themes while reusing the same component styles.
