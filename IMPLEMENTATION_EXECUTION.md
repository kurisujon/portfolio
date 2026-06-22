# IMPLEMENTATION_EXECUTION.md

## 1. NEXT.JS PROJECT INITIALIZATION OUTPUT

- **Final project structure confirmation**: App Router is configured under `src/app`.
- **CLI Command**: 
  `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`
- **Dependencies**: 
  `npm install framer-motion clsx tailwind-merge lucide-react`
- **App Router Setup**: The `src/app` directory handles routing, utilizing `layout.tsx` for global wrappers and `page.tsx` for composition of sections.

---

## 2. TAILWIND CONFIG IMPLEMENTATION (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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

## 3. GLOBAL STYLES SETUP (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-primary text-primary antialiased selection:bg-elevated selection:text-primary;
  }
}

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

## 4. BASE LAYOUT IMPLEMENTATION (`src/app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Container } from '@/components/layout/Container'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Portfolio | Fullstack AI Developer',
  description: 'Personal portfolio of a Fullstack AI Developer with system development experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="bg-primary text-primary antialiased">
        <Container>
          {children}
        </Container>
      </body>
    </html>
  )
}
```

---

## 5. CORE UI PRIMITIVES IMPLEMENTATION PLAN

### Button (`src/components/ui/Button.tsx`)
```tsx
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={cn(
        "bg-elevated text-primary rounded-md px-4 py-2 transition-all duration-200",
        "hover:bg-[#333333]",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props} 
    />
  )
}
```

### Card (`src/components/ui/Card.tsx`)
```tsx
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "bg-surface border border-default rounded-md p-6 transition-all duration-300",
        "hover:border-accent-muted hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### Typography System Usage
- **H1**: `<h1 className="text-[3rem] leading-[1.2] font-bold">`
- **H2**: `<h2 className="text-[2.25rem] leading-[1.3] font-semibold">`
- **H3**: `<h3 className="text-[1.5rem] leading-[1.4] font-medium">`
- **Body**: `<p className="text-[1rem] leading-[1.6] font-normal text-secondary">`
- **Small**: `<span className="text-[0.875rem] leading-[1.5] font-normal text-secondary">`

### Container (`src/components/layout/Container.tsx`)
```tsx
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      {children}
    </div>
  )
}
```

---

## 6. ANIMATION SYSTEM SETUP

### Framer Motion
- **Usage**: ONLY for section entrance animations (fade-up pattern).
- **Implementation**: `<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>`

### CSS Keyframes
- **Usage**: ONLY for the orbit system.
- **GPU Acceleration**: Achieved via `will-change: transform` and avoiding layout thrashing. No shifts allowed.

### Orbit System Implementation Plan
- **AI Core component**: Centered static glowing element.
- **Inner orbit ring**: Assigned `animation: orbit 20s linear infinite`.
- **Outer orbit ring**: Assigned `animation: orbit-slow 35s linear infinite`.
- **Counter rotation logic**: Nodes inside rings apply `animation: counter-orbit 20s linear infinite` (or 35s for outer ring) to negate parent rotation.
- **Hover pause behavior**: Implemented using Tailwind `group` on the wrapper, and `group-hover:[animation-play-state:paused]` on rings and nodes.
- **Mobile fallback strategy**: Hidden completely on mobile using Tailwind breakpoints (`hidden md:flex`). Replaced by a basic responsive CSS flex/grid of tech icons.

---

## 7. SECTION IMPLEMENTATION ORDER (STRICT)

1. Layout Shell (`layout.tsx`, `globals.css`, `Container.tsx`) *(DONE FIRST)*
2. Hero Section
3. About Section
4. Tech Stack Section *(Orbit system LAST to implement fully)*
5. Experience Section
6. Projects Section *(4 placeholders)*
7. Contact Section
