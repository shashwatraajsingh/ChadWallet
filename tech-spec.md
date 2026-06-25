# TraceLight — Technical Specification

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `gsap` | ^3.12.7 | Core animation engine, timelines, ScrollTrigger, SplitText |
| `lenis` | ^1.2.0 | Smooth scroll with inertia |
| `three` | ^0.172.0 | Aurora light shaft 3D rendering (Hero + CTA) |
| `@types/three` | ^0.172.0 | Three.js type definitions |
| `clsx` | ^2.1.1 | Conditional class name composition |
| `tailwind-merge` | ^3.0.0 | Tailwind class conflict resolution |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^6.0.0 | Build tool |
| `@vitejs/plugin-react` | ^4.3.0 | React support for Vite |
| `tailwindcss` | ^4.0.0 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0.0 | Tailwind CSS Vite plugin |
| `typescript` | ^5.7.0 | Type checking |
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | React DOM type definitions |

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| `Navigation` | Custom | Shared | Transparent → blurred solid on scroll. Logo + links + CTA. Mobile hamburger. |
| `Footer` | Custom | Shared | 4-column grid, standard links. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Three.js aurora, starfield canvas, mouse gradient, epitaph carousel. |
| `MemorialWallSection` | Custom | Horizontal scroll gallery with MemorialCard instances. Dust particle canvas overlay. |
| `DedicationConstellationSection` | Custom | Interactive SVG star constellation + Canvas background particles. |
| `InterludeSection` | Custom | Simplified aurora canvas (8 shafts), sparse starfield. |
| `PrinciplesSection` | Custom | 3-column principle cards + scroll-driven text morph. |
| `CTASection` | Custom | Three.js aurora (warm variant), golden particle canvas. Light background section. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| `MemorialCard` | Custom | MemorialWallSection | Image + name + dates + epitaph. Grayscale→color hover. |
| `ConstellationStar` | Custom | DedicationConstellationSection | 4px gold dot → 32px hover circle. Tooltip on hover. |
| `EpitaphCarousel` | Custom | HeroSection | 3-slide vertical cycling with overflow:hidden container. |
| `TextMorph` | Custom | PrinciplesSection | Dual-layer word span stack, ScrollTrigger scrub-driven crossfade. |
| `AuroraCanvas` | Custom | HeroSection, InterludeSection, CTASection | Three.js light shafts. Configurable: shaft count, opacity range, color tint, mouse interaction. |
| `StarfieldCanvas` | Custom | HeroSection, InterludeSection | Canvas 2D particle system. Configurable: star count, drift speed, mouse proximity radius. |
| `ParticleCanvas` | Custom | MemorialWallSection, DedicationConstellationSection, CTASection | Generic Canvas 2D drifting particles. Configurable: color, count, speed, size. |

### Hooks

| Hook | Purpose |
|------|---------|
| `useMousePosition` | Tracks cursor position with lerp interpolation (0.08 factor). Returns smoothed `{x, y}` for aurora tilt and starfield brightness. Disabled on touch. |
| `useLenis` | Initializes Lenis, wires `lenis.on('scroll', ScrollTrigger.update)`, handles cleanup. Exposes lenis instance ref. |
| `useScrollReveal` | Reusable GSAP ScrollTrigger entrance pattern. Configurable: trigger offset, stagger, blur. Applies `opacity:0→1`, `translateY(40px→0)`, `blur(4px→0)`. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Aurora Light Shafts | Three.js | Custom rAF loop. 12–15 PlaneGeometry meshes with gradient textures, AdditiveBlending. Independent sine-wave opacity oscillation per shaft (4–7s randomized). Whole fan rotates 0.5°/s. Prismatic edge refraction via offset duplicate geometry at 0.05 opacity. | **High** 🔒 |
| Aurora Mouse Tilt | Three.js + custom | Cursor → ±5° scene rotation via `useMousePosition` hook (lerp 0.05). Applied to camera or scene group per frame. | Medium |
| Starfield Particle System | Canvas 2D | Single canvas, rAF loop. 200 stars: drift (0.05px/frame), twinkle (sine 3–8s), mouse proximity brighten (100px radius). Aurora overlay orbs (pink 200px, mint 150px) with sine drift (15s). | **High** 🔒 |
| Mouse Gradient Overlay | CSS + JS | `mousemove` updates CSS custom properties `--mouse-x`, `--mouse-y`. Radial gradient `radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), rgba(255,202,212,0.08), transparent)`. | Low |
| Hero Entrance Sequence | GSAP timeline | Single timeline: background scale(1.1→1) 1200ms → wordmark 800ms/400ms delay → headline 600ms/600ms → subheadline 500ms/750ms → CTA 500ms/900ms → astronaut 1000ms/500ms. easeOutExpo throughout. | Medium |
| Astronaut Floating | GSAP | `gsap.to` yoyo repeat: `translateY` oscillates 0→-12px→0, 6s, ease-in-out, infinite. | Low |
| Hero Scroll Exit | GSAP ScrollTrigger | `scrub: true`, `start: "top top"`, `end: "+=50%"`. Content opacity 1→0, translateY 0→-100px. | Low |
| Epitaph Carousel | Custom | Overflow-hidden 64px container. 3 positioned slides. GSAP or CSS animation: vertical translateY transitions (600ms easeInOutQuad), 4000ms hold. Infinite loop via index cycling. | Medium |
| Scroll-Driven Text Morph | GSAP ScrollTrigger + SplitText | SplitText splits each phrase into word spans. Two absolutely positioned layers (outgoing/incoming). ScrollTrigger scrub: `start: "top center"`, `end: "bottom center"`. Word-level stagger crossfade: opacity + translateY(±20px), 0.1s stagger. 3-state cycle. | **High** 🔒 |
| Dedication Constellation | SVG + Canvas 2D | 50–70 SVG circle elements in heart-shaped cluster. SVG lines for connections (stroke-dashoffset draw-in). Click handler spawns new star (scale 0→1, 600ms). Cascade illumination: BFS from clicked star, 100ms ring stagger, opacity 0.3→1.0. Glow burst via expanding radial gradient. | **High** 🔒 |
| Constellation Entrance | GSAP ScrollTrigger | Stars stagger fade-in (20ms per star, opacity 0→0.3, 800ms). Lines draw-in via stroke-dashoffset (1200ms) after stars. | Medium |
| Star Counter Roll | Custom | Digit-by-digit slot machine: new digit slides in from below, old out, 400ms easeOutQuart. Split number into digits, animate each position independently. | Medium |
| Memorial Card Hover | CSS transitions | `transition: 800ms easeOutQuart` on `filter` (grayscale→color), `border-color`, `transform` (translateY -4px), `box-shadow`. Pure CSS, no JS. | Low |
| Card Track Entrance | GSAP ScrollTrigger | Cards stagger from `opacity:0, translateX(60px)`, 100ms stagger, 1000ms, easeOutQuart. Trigger: section top at 75% viewport. | Low |
| Dust/Golden Particles | Canvas 2D (ParticleCanvas) | Generic drifting particle system. Config per instance (color, count, speed, size, motion pattern). Single rAF loop per canvas. | Low |
| Scroll Reveal (global) | GSAP ScrollTrigger | `useScrollReveal` hook. Default: `opacity:0→1`, `translateY(40px→0)`, `blur(4px→0)`, 1200ms, outQuart, 150ms stagger. Trigger: element top at 80% viewport, `once: true`. | Low |
| Nav Scroll Transition | CSS + ScrollTrigger | ScrollTrigger toggles a class at 100vh. CSS handles `background` and `backdrop-filter` transitions (600ms). | Low |

---

## State & Logic Plan

### AuroraCanvas — Imperative Three.js Bridge

The aurora effect requires imperative animation (rAF loop, manual geometry updates). Architecture:

- `AuroraCanvas` is a React component that owns a `<canvas>` ref and a `useEffect` for lifecycle.
- Inside the effect: create `WebGLRenderer`, `Scene`, `Camera`, and all shaft meshes. Store in a ref object (never in React state).
- Run a rAF loop that updates each shaft's opacity/scale via sine functions and applies mouse-driven rotation. Cleanup on unmount.
- Props: `shaftCount`, `opacityRange`, `colorTint`, `enableMouseInteraction`, `rotationSpeed` — allows reuse across Hero (full), Interlude (reduced), CTA (warm).
- Mouse position consumed from a shared ref (written by `useMousePosition` at document level) to avoid re-renders.

### StarfieldCanvas — Imperative Canvas 2D Bridge

Same imperative pattern as AuroraCanvas:
- Component owns `<canvas>` ref + `useEffect`.
- Inside: initialize star array (position, opacity phase, twinkle period). rAF loop updates positions, twinkle, and mouse proximity brightness.
- Aurora overlay orbs rendered as radial gradients on the same canvas, drifting via sine.
- Props: `starCount`, `driftSpeed`, `mouseRadius` — allows Hero (200 stars) vs Interlude (50 stars) variants.

### Dedication Constellation — Dual-Layer Rendering + BFS Illumination

Two rendering layers for the constellation:
1. **Canvas 2D (bottom)**: Background drift particles only.
2. **SVG (top)**: Stars (`<circle>`) and connection lines (`<line>`). SVG chosen for crisp star rendering and easy stroke-dashoffset line animation.

Star state stored in a ref array (not React state) to avoid re-renders on every animation frame:
- Each star: `{ id, x, y, opacity, illuminated, spawnTime }`
- Click handler: add new star to array, trigger GSAP animations on the SVG element directly.
- Cascade illumination: BFS from clicked star. Compute distance rings (0–150px, 150–300px, etc.). GSAP stagger per ring (100ms delay).

### TextMorph — Scroll-Scrubbed GSAP with SplitText

- Three phrases split into word spans via SplitText.
- Two absolutely positioned text layers (identical structure) stacked in a scroll-driven container.
- GSAP ScrollTrigger with `scrub: true` controls a progress value (0→1).
- On each progress update, compute which state transition is active and crossfade word pairs accordingly.
- The ScrollTrigger pins or maps to the 60vh container height. `start: "top center"`, `end: "bottom center"`.

### useMousePosition — Shared Lerp System

- Attaches a single `mousemove` listener at the document level.
- Maintains `targetPos` (raw cursor) and `currentPos` (lerped) in refs.
- Runs a rAF loop applying lerp (`factor: 0.08`) — writes smootened values to a shared ref.
- AuroraCanvas and StarfieldCanvas read from this shared ref each frame. No React re-renders.
- Disabled on touch devices via `'ontouchstart' in window` check.

---

## Other Key Decisions

### No shadcn/ui

The design is fully bespoke with no standard UI patterns (forms, dialogs, tables, data display). All components are custom-built. Adding shadcn would introduce unused infrastructure.

### Canvas Effect Isolation

Each canvas effect (Aurora, Starfield, ParticleCanvas) lives in its own component with its own `<canvas>` element and rAF loop. No shared canvas — this avoids complexity in coordinating multiple renderers on a single surface and allows independent lifecycle management.

### GSAP Plugin Registration

All GSAP plugins (ScrollTrigger, SplitText) registered once at app entry via `gsap.registerPlugin()`. ScrollTrigger integrated with Lenis via `lenis.on('scroll', ScrollTrigger.update)` and `lenis.raf()` called through ScrollTrigger's ticker.

### Font Loading Strategy

Cormorant Garamond and Inter loaded via Google Fonts `<link>` in `index.html` with `display=swap`. No npm font packages needed.
