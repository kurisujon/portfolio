# IMPLEMENTATION_SETUP.md

## 1. NEXT.JS PROJECT SETUP PLAN

### Initialization & Dependencies
- **Initialize Next.js App Router:**
  `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- **Install Core Packages:**
  `npm install framer-motion clsx tailwind-merge lucide-react`

### Folder Creation Order
1. `mkdir -p src/components/{ui,layout,sections,animations}`
2. `mkdir -p src/lib`
3. `mkdir -p src/styles`

### TypeScript Rules (`tsconfig.json`)
- Strict type-checking enabled (`"strict": true`).
- Absolute imports enforced (`"paths": { "@/*": ["./src/*"] }`).

---

## 2. TAILWIND CONFIGURATION (STRICT)

Map GEMINI.md design tokens directly into `tailwind.config.ts`. No arbitrary hex values allowed outside this file.

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#0a0a0a',
        surface: '#171717',
        elevated: '#262626',
      },
      textColor: {
        primary: '#f5f5f5',
        secondary: '#a3a3a3',
      },
      borderColor: {
        default: '#404040',
        'accent-muted': '#737373',
      },
      ringColor: {
        'accent-muted': '#737373',
      },
      spacing: {
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'counter-orbit': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'orbit-slow': 'orbit 35s linear infinite',
        'counter-orbit': 'counter-orbit 20s linear infinite',
        'counter-orbit-slow': 'counter-orbit 35s linear infinite',
      }
    },
  },
  plugins: [],
}
export default config
```

---

## 3. BASE LAYOUT IMPLEMENTATION PLAN

### `src/app/layout.tsx` Structure
- **Global Wrapper**: Wrap all children in a root `<html>` tag strictly applying `bg-primary` and `text-primary`.
- **Font Setup**: Import `Inter` from `next/font/google` and apply its className globally to `<body>`.
- **Background System**: Global background is `#0a0a0a`. Section backgrounds override to `bg-surface` only where defined by UI.

### Container Component (`src/components/layout/Container.tsx`)
- Defines the 1024px global constraint.
- Classes: `max-w-5xl mx-auto px-6 w-full`.

---

## 4. CORE PRIMITIVE COMPONENTS PLAN

### `Button.tsx`
- **Classes**: `bg-elevated text-primary rounded-md px-4 py-2 transition-all duration-200`
- **Hover**: `hover:bg-[#333333]`
- **Active**: `active:scale-95`
- **Disabled**: `disabled:opacity-50 disabled:cursor-not-allowed`

### `Card.tsx`
- **Classes**: `bg-surface border border-default rounded-md p-6 transition-all duration-300`
- **Hover**: `hover:border-accent-muted hover:-translate-y-1 hover:shadow-md hover:shadow-black/20`

### `Typography.tsx`
- **H1**: `text-[3rem] leading-[1.2] font-bold`
- **H2**: `text-[2.25rem] leading-[1.3] font-semibold`
- **H3**: `text-[1.5rem] leading-[1.4] font-medium`
- **Body**: `text-[1rem] leading-[1.6] font-normal text-secondary`
- **Small**: `text-[0.875rem] leading-[1.5] font-normal text-secondary`

---

## 5. ANIMATION SYSTEM SETUP

### Framework Strategy
- **Framer Motion**: Used exclusively for one-time mount animations (fade-in up) on sections and text.
- **CSS Keyframes**: Used for continuous Orbit logic to avoid JS thread blocking and guarantee smooth 60fps.

### Orbit System Structure
- **Performance Rules**: Must use `will-change: transform`. Animations strictly use `rotate()` and `translate()`. No layout-triggering properties.
- **GPU Acceleration**: Add `transform: translateZ(0)` to the outer rings.
- **Reduced Motion Handling (CRITICAL)**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 6. SECTION BUILD ORDER

Strict linear implementation path to ensure components compose correctly:

1. **Layout Shell** (Root `layout.tsx`, `Container`, `Navbar`)
2. **Hero Section** (Typography scaling test)
3. **About Section** (Text blocks and spacing rhythms)
4. **Tech Stack Section** (Build basic grid first, then refactor to Orbit System)
5. **Experience Section** (Timeline layout)
6. **Projects Section** (Cards grid)
7. **Contact Section** (Footer integration)
