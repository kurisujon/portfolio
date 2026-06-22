# GEMINI Design System

## 🎨 1. Design Tokens System
All colors must use these exact hex values and token names. No deviations allowed.

### Colors
- **`bg-primary`**: `#0a0a0a` (Main page background)
- **`bg-surface`**: `#171717` (Cards, sections)
- **`bg-elevated`**: `#262626` (Buttons, highlighted surfaces)
- **`text-primary`**: `#f5f5f5` (Headings, primary content)
- **`text-secondary`**: `#a3a3a3` (Body text, muted content)
- **`border-default`**: `#404040` (Card borders, dividers)
- **`accent-muted`**: `#737373` (Focus rings, hover borders, subtle highlights)

---

## ✍️ 2. Typography Scale
Font Family: Modern, highly readable sans-serif (e.g., Inter).

- **H1**: `3rem` (48px) | Weight: `700` (Bold) | Line Height: `1.2`
- **H2**: `2.25rem` (36px) | Weight: `600` (Semi-bold) | Line Height: `1.3`
- **H3**: `1.5rem` (24px) | Weight: `500` (Medium) | Line Height: `1.4`
- **Body**: `1rem` (16px) | Weight: `400` (Normal) | Line Height: `1.6`
- **Small**: `0.875rem` (14px) | Weight: `400` (Normal) | Line Height: `1.5`

---

## 📏 3. Spacing System
Strict 4px base system with 8px increments.

- **Base Increments**: `4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`
- **Section Spacing**: `96px` (py-24) or `128px` (py-32) vertical padding between major sections.
- **Component Padding**: 
  - Cards: `24px` (p-6)
  - Buttons: `16px` horizontal (px-4), `8px` vertical (py-2)
  - Component Gaps: `16px` (gap-4) or `24px` (gap-6)

---

## 🔲 4. Border Radius System
A strict, unyielding border-radius system to prevent UI fragmentation.

- **Global Default**: `8px` (`rounded-md` in Tailwind). Used for 95% of UI (Cards, Buttons, Inputs).
- **Small Elements**: `4px` (`rounded-sm`). Used for badges, tags, or small tooltips.
- **Circular**: `9999px` (`rounded-full`). Used exclusively for avatars and tech stack orbit nodes.

---

## 🧩 5. Component States

### Buttons
- **Default**: `bg-elevated text-primary rounded-md transition-all duration-200`
- **Hover**: Background shifts slightly lighter (e.g., `#333333`).
- **Active**: Soft scale down (`scale-95`).
- **Disabled**: `opacity-50 cursor-not-allowed` (no hover effects).

### Cards
- **Default**: `bg-surface border border-default rounded-md`
- **Hover**: Border transitions to `border-accent-muted`. Slight vertical lift (`-translate-y-1`). Soft elevation (`shadow-lg shadow-black/20`).

### Inputs
- **Idle**: `bg-surface border border-default text-primary rounded-md`
- **Focus**: `border-accent-muted ring-1 ring-accent-muted outline-none`
- **Error**: Subtle dark red border `#7f1d1d` (Strictly no neon red).

---

## 🏗️ 6. Layout System
- **Max Width Container**: `1024px` (`max-w-5xl`) centered on the page.
- **Grid System**: 12-column CSS Grid or Flexbox with standard gaps (`gap-6`).
- **Breakpoints**: 
  - Mobile: Default (`flex-col`)
  - Tablet (`md` 768px): Stacked items shift to 2-column grids.
  - Desktop (`lg` 1024px): Full layout, max width enforced.

---

## 🌌 7. Solar System Tech Stack (Special Feature)
This feature must be built using deterministic rules.

- **Nodes**: 8 to 12 orbiting tech stack icons.
- **Center**: "AI Core" (Glowing, static, pulsing gently).
- **Orbits**: 
  - Inner Ring: Radius `120px` (Faster, approx. `20s` linear rotation).
  - Outer Ring: Radius `200px` (Slower, approx. `35s` linear rotation).
- **Motion Behavior**: Continuous `linear` rotation. Nodes must counter-rotate so icons remain upright.
- **Interaction**: 
  - Hovering the container *pauses* the orbit animation.
  - Hovering a specific node applies a soft scale (`scale-110`) and a muted glow.
- **Layout Constraints**: Absolute positioning inside a relative container of `w-[500px] h-[500px]`. Overflow should not be clipped unless strictly necessary for mobile.

---

## 📄 8. Page Structure

### 1. Hero Section
- Name + Slogan. Simple identity statement.

### 2. About Section
- Human-readable description. Professional but conversational.

### 3. Tech Stack Section
- Solar System Orbit Animation implementation.

### 4. Experience Section
- Clear timeline: Infosoft Davao (3.5 months), 3 years system dev.

### 5. Projects Section
- 4 placeholder project cards using strict Card component rules.

### 6. Contact Section
- Simple CTA + links.
