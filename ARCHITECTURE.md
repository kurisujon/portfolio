# ARCHITECTURE.md

## 🔷 Folder Structure
Next.js App Router project structure defined for optimal component separation.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/          # Primitives (Button, Card, Typography)
│   ├── layout/      # Shell (Container, Navbar, Footer)
│   ├── sections/    # Page blocks (Hero, About, TechStack)
│   └── animations/  # Motion logic (OrbitSystem, FadeIn)
├── lib/
│   └── utils.ts     # Class merging (clsx/tailwind-merge)
└── styles/
    └── theme.css    # CSS Variables / Token mapping
```

## 🔷 Component Hierarchy

### Atom Components
- `Button.tsx`
- `Typography.tsx`
- `Badge.tsx`
- `OrbitNode.tsx` (Individual tech icon)

### Molecule Components
- `ProjectCard.tsx`
- `ExperienceItem.tsx`
- `SectionHeader.tsx`

### Section Components
- `HeroSection.tsx`
- `AboutSection.tsx`
- `TechStackSection.tsx`
- `ExperienceSection.tsx`
- `ProjectsSection.tsx`
- `ContactSection.tsx`

### Page Composition Layer
- `page.tsx`: Assembles all Section Components sequentially. Wraps them in `Container` layout.

## 🔷 Token Mapping Rules

### Background & Surface Usage
- **`bg-primary` (`#0a0a0a`)**: Strictly for the `<body>` background. Do NOT use on cards or floating elements.
- **`bg-surface` (`#171717`)**: Used exclusively for `Card` components and distinct bounded sections.
- **`bg-elevated` (`#262626`)**: Used for `Button` default states, interactive triggers, or highlighted active tabs.

### Typography Usage Mapping
- **Hero Section**: Uses `H1` (3rem) for name, `H2` or `H3` for slogan/subtitle.
- **Section Headers**: Uses `H2` (2.25rem) to introduce sections (e.g., "Experience", "Projects").
- **Card Titles**: Uses `H3` (1.5rem) for project names and role titles.
- **Body**: Uses `Body` (1rem) for descriptions. `Small` (0.875rem) for metadata (dates, tags).

## 🔷 Animation System Architecture

### Framework
- **CSS Keyframes**: Used for continuous, deterministic animations (e.g., Orbit rotation) to guarantee 60fps performance without JavaScript overhead.
- **Framer Motion**: Used for declarative scroll fade-ins, hover micro-interactions, and mounting animations.

### Performance Constraints
- All continuous animations must use `transform` (e.g., `rotate`, `translate3d`) and `opacity`.
- Strictly avoid animating `top`, `left`, `width`, or `height` to prevent layout thrashing.
- `will-change: transform` applied to orbiting nodes.

### Mobile Fallback Behavior
- If viewport width is `< 768px` (md breakpoint), the Orbit System scales down. If it cannot fit perfectly, it gracefully falls back to a staggered CSS grid of tech nodes to preserve layout integrity.

## 🔷 Solar System Implementation Plan

The Tech Stack section's orbit animation is implemented via four distinct elements:

1. **AI Core Component**
   - Centered absolute div inside the orbit container.
   - Applies a pulsing CSS animation (`scale` 0.95 to 1.05) and a soft `#737373` radial glow.

2. **Orbit Ring System**
   - `InnerRing` and `OuterRing` components.
   - Rendered as circular `div`s with `border border-default rounded-full`.
   - `InnerRing`: 240px diameter. `OuterRing`: 400px diameter.

3. **Tech Node Component**
   - Placed on the perimeter of the rings.
   - Rotates around the center using CSS `animation: orbit [duration] linear infinite`.
   - Inner contents use a counter-rotation animation to keep the icon/text upright.

4. **Interaction System**
   - Wrapper container uses a CSS `group` class.
   - `group-hover: [animation-play-state:paused]` pauses all orbits instantly.
   - Individual node hover applies `scale-110` and `ring-1 ring-accent-muted`.
