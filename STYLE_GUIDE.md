# Retro-Industrial UX / UI Style Spec
_"Win-95 × Mainframe Green × Subway Flip-Board"_

This document defines the design language used in the latest mock-ups and provides the rules needed to implement it across **njclement.com**. Treat each section as normative; any component that diverges from these guidelines should have a documented reason.

---

## 1 · Core Principles

| Principle | Description | Practical Tests |
|-----------|-------------|-----------------|
| **Familiar Skeuomorphism** | Visual cues from 90s operating systems & train-station hardware ground the aesthetic in the real world. | Would a user instantly recognise the element's purpose if it were a physical control? |
| **Analogue Warmth** | Avoid sterile "perfect" vectors: subtle wear, rounded pixel edges, and restrained noise add life. | Zoom to 400%. Edges should be _soft-stepped_, never single-pixel stair-stepped. |
| **Reduced Bevels** | Unlike pure Win 95 we don't rely on heavy raised borders. Depth is generated with a 1–2 px inner shadow and a broad 6–8 px outer drop if (and only if) an element needs physical stack order. | The interface viewed in greyscale should have a clear z-index hierarchy without looking embossed. |
| **Flip-Board Rhythm** | Letters animate or sit inside "tiles," calling back to Solari departure boards. Primary headings and section intros use this device. | When a heading changes on scroll/route, it should "flip" through at least one intermediate frame in ≤ 200 ms. |
| **Full-Screen Canvas** | The viewport is treated as a single piece of hardware. Components touch or bleed into the edges; no browser-window mimicries or surplus chrome. | Resize the window—margins should remain symmetrical; no element should feel docked inside a fake frame. |

---

## 2 · Color Palette

| Token | HEX | Usage |
|-------|-----|-------|
| `--c-bg-surface` | `#E3E5E2` | Default light surface (Win-95 grey) |
| `--c-bg-console` | `#0F2022` | Flip-board & mainframe panels |
| `--c-fg-primary` | `#C7FFB8` | Main "green-phosphor" text |
| `--c-fg-secondary` | `#FFFFFF` | Body text on dark panels |
| `--c-accent-orange` | `#FF7E26` | Brand highlight (avatar halo, CTA focus) |
| `--c-accent-rail` | `#688572` | Subway line indicators, borders |
| `--c-border-muted` | `#8D968E` | 1 px item outlines |
| `--c-shadow` | `rgba(0,0,0,0.25)` | 6 px y-offset outer shadow for floating layers |

> **Implementation**
> Define CSS variables at `:root`, then reference via utility classes (`bg-console`, `text-primary`, etc.). Never hard-code a hex outside of the token map.

---

## 3 · Typography

| Style | Font | Size / Line-height | Extras |
|-------|------|--------------------|--------|
| **Heading-flip** | IBM Plex Mono **Bold** | clamp(2.4rem, 5vw, 3.8rem) / 1 | Each glyph in a `<span class="flip-unit">` wrapper for animation |
| **Body** | Inter **Medium** | 1rem / 1.55 | Optical-size variants if supported |
| **Label / Button** | Inter **SemiBold** CAPS | 0.875rem / 1.2 | Letter-spacing 0.05em |

*Fallback stack:* `Inter, "IBM Plex Sans", "Segoe UI", system-ui, sans-serif`.

---

## 4 · Grid & Layout

| Token | Value | Notes |
|-------|-------|-------|
| **Grid columns** | 12 flex columns, 72 px max width | Collapse to 4 on < 640 px |
| **Gutter** | 24 px | 16 px mobile |
| **Section padding** | 96 px top / 64 px bottom | 48 px / 32 px mobile |
| **Card radius** | 4 px | Only for finger-friendly controls; otherwise square |

---

## 5 · Components

### 5.1 Navigation Bar

```
<nav class="nav-win95">
  <div class="flip-logo">N ENTERPRISES</div>
  <ul role="menubar">
    <li class="active">Home</li>
    <li>Resume</li>
    <li>Portfolio</li>
  </ul>
  <button class="btn-primary">Contact</button>
</nav>
```

* 48 px height, lies flush to viewport top.
* Active item gains flip-tile underline animation on route change.
* No drop-shadow; rely on contrasting background strip (`--c-bg-console`).

### 5.2 Hero Panel

```
<section class="hero-console">
  <div class="flip-board">
    SOFTWARE<br/>ENGINEERING<br/>LEADER & ARCHITECT
  </div>
  <img class="avatar-halo" src="/assets/nathan.png" alt="Nathan Clement" />
  <p class="kicker">
    Building scaled SaaS platforms & leading engineering teams to deliver exceptional products.
  </p>
  <div class="cta-row">
    <a class="btn-primary">View Resume ▶</a>
    <a class="btn-ghost">Explore Portfolio</a>
  </div>
</section>
```

* Background: dark grid (`url(grid.png)` @ 5% opacity).
* Avatar halo uses `--c-accent-orange` plus 4 px feather blur.
* CTAs align to an **invisible 16 px high "rail track"** spanning full-width (subway motif).

### 5.3 Flip-Board Heading Module

```scss
.flip-unit {
  display:inline-block;
  perspective:400px;
  span {
    transform-style:preserve-3d;
    transition:transform .2s cubic-bezier(.23,1,.32,1);
  }
  &.is-flipping span {
    transform:rotateX(180deg);
  }
}
```

*Call `.is-flipping` on scroll triggers or route updates.*

### 5.4 Card + Rail Indicator

```
<article class="project-card rail-green">
  <span class="rail-index">●</span> <!-- subway stop node -->
  <h3>AI Biz Hour</h3>
  <p>Frequent guest on the AI Biz Hour podcast</p>
</article>
```

* `rail-green` variants correspond to different palette rails (`--c-rail-1`…2 etc.).
* Horizontal line (1 px) runs full viewport width behind the card list.
* Scroll-snap keeps cards centered on each "station."

---

## 6 · Motion & Interaction

| Motion Token | Timing | Easing | Applied to |
| ------------ | ------ | ------------------------- | -------------------------------- |
| `--t-flip` | 0.20 s | cubic-bezier(.23,1,.32,1) | Flip-board glyphs |
| `--t-hover` | 0.15 s | ease-out | Buttons (background darken +2%) |
| `--t-focus` | 0.12 s | linear | Focus ring fade-in |

*No parallax, no overshoot.* Movement mimics mechanical parts, not bouncing UI.

---

## 7 · Accessibility

* **Contrast** ≥ 4.5:1 everywhere (flipboard green on console passes; raise luminance if needed).
* Flip animations fire a `prefers-reduced-motion` media query check—**disable** when requested.
* Min button size 44 × 44 px.
* Keyboard focus ring uses a 2 px dashed `--c-accent-rail` outline; never removed.

---

## 8 · Implementation Notes

1. **CSS architecture:** Use [CSS Modules] or `:where(.component)` utilities to avoid global bleed.
2. **SVG icons:** Keep stroke = 2 px, round caps, inherit `currentColor`.
3. **Asset pipeline:** Raster flip-sounds (`flip.wav`) at < 15 kb, loaded `preload` & played on first interaction (muted if `prefers-reduced-motion`).
4. **Theming:** Dark-mode simply swaps `--c-bg-surface`→`#141718`, `--c-bg-console`→`#000E10`, and raises green brightness.

---

## 9 · Example CSS Tokens

```css
:root {
  --c-bg-surface:#E3E5E2;
  --c-bg-console:#0F2022;
  --c-fg-primary:#C7FFB8;
  --c-fg-secondary:#FFFFFF;
  --c-accent-orange:#FF7E26;
  --c-accent-rail:#688572;
  --c-border-muted:#8D968E;
  --c-shadow:0 6px 8px rgba(0,0,0,.25);
  --t-flip:200ms cubic-bezier(.23,1,.32,1);
  --t-hover:150ms ease-out;
  --t-focus:120ms linear;
}
```