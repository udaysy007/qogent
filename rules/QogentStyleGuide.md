# Qogent Design System and Style Guide | Modern Educational UI Framework

## SEO Keywords

- Qogent Design System
- Educational UI Framework
- Modern Tool Design
- Interactive Educational Tools
- Accessible UI Components
- React Educational Components
- Dark Mode UI Design
- Educational UX Patterns
- Student-focused Interface
- Educational Platform Design

## Document Purpose

This comprehensive design system and style guide outlines the principles, components, and patterns used in building modern educational tools and interfaces for the Qogent platform. It focuses on creating engaging, accessible, and user-friendly experiences for students and educators.

## ⚠️ CRITICAL: CSS Variables Requirements

To ensure proper theme switching and consistent design across the application, the following requirements **MUST** be followed:

1. **ALWAYS use CSS variables over hardcoded colors**

   - ✅ Correct: `bg-[var(--background)]`, `text-[var(--foreground)]`
   - ❌ Incorrect: `bg-[hsl(222,47%,11%)]`, `text-gray-300`

2. **Use semantic variable names over direct color values**

   - ✅ Correct: `text-[var(--accent)]`, `bg-[var(--surface)]`
   - ❌ Incorrect: `text-[var(--emerald)]`, `bg-[hsl(217,33%,17%)]`

3. **Follow opacity pattern with CSS variables**

   - ✅ Correct: `bg-[var(--accent)]/10`, `border-[var(--foreground)]/20`
   - ❌ Incorrect: `bg-[rgba(23,145,89,0.1)]`

4. **Use CSS variables for interactive states**

   - ✅ Correct: `hover:bg-[var(--accent)]/20`, `active:bg-[var(--accent)]/30`
   - ❌ Incorrect: `hover:bg-emerald-600`, `active:bg-[hsl(145,63%,32%)]`

5. **Apply opacity modifiers via Tailwind when using CSS variables**
   - ✅ Correct: `text-[var(--foreground)]/80`
   - ❌ Incorrect: Using rgba with CSS variables

Failure to follow these requirements will result in inconsistent UI behavior when switching between light and dark themes. All components must properly support both themes through CSS variables.

## ⚠️ CRITICAL: Standard Content Width

To ensure consistent layout and readability across all pages of the application, the following standard **MUST** be followed:

1. **ALWAYS use the standard content width of `max-w-5xl` (64rem/1024px) for main content areas**

   - ✅ Correct: `<div className="container mx-auto px-4 max-w-5xl">`
   - ❌ Incorrect: Using other max-width values like `max-w-4xl` or `max-w-6xl`

2. **Apply this standard to:**

   - Main content containers
   - Breadcrumb navigation
   - Hero sections
   - Section content areas

3. **Implementation pattern:**

   ```tsx
   // Standard container with proper width
   <div className="container mx-auto max-w-5xl px-4 py-8">
     {/* Page content */}
   </div>
   ```

4. **Responsive behavior:**
   - The container will automatically adapt to smaller screens
   - Keep padding consistent with `px-4` for proper spacing on mobile
   - Content will remain readable across all device sizes

This standard width provides the optimal reading experience while ensuring consistency across the platform. Deviations from this standard should be avoided unless there is a specific UX requirement approved by the design team.

## ⚠️ CRITICAL: Component and Icon Requirements

To maintain a consistent, professional look across the application, the following requirements **MUST** be followed:

1. **NEVER use emojis in the UI**

   - ✅ Correct: Using proper SVG icons or icon components
   - ❌ Incorrect: Using emoji characters like "💼", "📚", or "🔬"
   - Emojis look unprofessional and render inconsistently across platforms

2. **ALWAYS use shadcn UI components**

   - ✅ Correct: Using shadcn Button, Card, Dialog components
   - ❌ Incorrect: Creating custom components that duplicate shadcn functionality
   - This ensures consistent styling, behavior, and accessibility

3. **Use Lucide React icons or similar minimal SVG icons**

   - ✅ Correct: `<Briefcase />`, `<Book />`, `<Flask />` from Lucide React
   - ❌ Incorrect: Emoji icons, raster images, or inconsistent icon libraries
   - Icons should be simple, clean, and match our minimal design aesthetic

4. **Maintain consistent icon sizing and styling**
   - Use standard sizes: 16px for inline, 20px for UI elements, 24px for feature highlights
   - Apply consistent color treatment using CSS variables: `className="text-[var(--accent)]"`

These requirements ensure a professional, consistent UI across the entire platform and prevent visual inconsistencies that detract from the educational experience.

## Table of Contents

- [Design Philosophy & Core Principles](#design-philosophy)
- [Color System](#color-system)
- [Typography](#typography)
- [Component Design Patterns](#component-design-patterns)
- [Tool Design Guidelines](#tool-design)
- [Implementation Guidelines](#implementation)
- [Testing and Quality Assurance](#testing-and-quality-assurance)

## Meta Information

- **Version**: 1.0.0
- **Last Updated**: 2024
- **Platform**: Qogent Educational Platform
- **Framework**: Next.js with Tailwind CSS
- **Target Devices**: Mobile-first, responsive design
- **Accessibility Standard**: WCAG 2.1 AA
- **Default Theme**: Dark Mode Optimized

## Design Philosophy & Core Principles {#design-philosophy}

Our design philosophy transforms traditional educational interfaces into modern, engaging digital experiences through:

1. **Dark-First Design**

   - Optimized for reduced eye strain
   - Enhanced focus through contrast
   - Night-friendly learning environment

2. **User-Centric Approach**

   - Real-time feedback
   - Intuitive interactions
   - Problem-focused solutions

3. **Aesthetic Minimalism**

   - Clean interfaces
   - Clear visual hierarchy
   - Purposeful elements only

4. **Interactive Engagement**

   - Dynamic real-time updates
   - Meaningful micro-interactions
   - Smooth transitions

5. **Emotional Design**

   - Positive feedback loops
   - Achievement celebration
   - Trust-building consistency

6. **Accessibility First**
   - Universal usability
   - Keyboard navigation
   - Screen reader optimization

## Color System {#color-system}

### Critical: Using CSS Variables for Theming

All color references in the codebase MUST use CSS variables defined in `globals.css` rather than direct color values. This ensures consistent theming and proper light/dark mode switching.

```css
/* In globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --surface: hsl(0, 0%, 100%);
  --surface-accent: hsl(210, 40%, 96%);
  --border: hsl(214, 32%, 91%);
  --accent: hsl(155, 83%, 32%);
  /* ... other variables */
}

.dark {
  --background: hsl(222, 47%, 11%);
  --foreground: #ededed;
  --surface: hsl(217, 33%, 17%);
  --surface-accent: hsl(217, 33%, 12%);
  --border: hsl(217, 33%, 25%);
  --accent: hsl(145, 63%, 42%);
  /* ... other variables */
}
```

When implementing components, always use these variables:

```tsx
// ✅ CORRECT: Using CSS variables
<div className="bg-[var(--background)] text-[var(--foreground)]">
  <button className="bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20">
    Click me
  </button>
</div>

// ❌ INCORRECT: Hardcoded colors
<div className="bg-[hsl(222,47%,11%)] text-gray-200">
  <button className="bg-[hsl(145,63%,42%)]/10 text-[hsl(145,63%,42%)] hover:bg-[hsl(145,63%,42%)]/20">
    Click me
  </button>
</div>
```

### Dark Mode Primary (Default Theme)

Our color system draws inspiration from Ireland's rich heritage while ensuring optimal viewing comfort in dark mode. These values are provided for reference only - always use the CSS variables in actual code.

**Primary: Emerald Green**

- UI elements: `text-[var(--accent)]` (Semantic approach)
- Backgrounds: `bg-[var(--accent)]/20`
- Borders: `border-[var(--accent)]/30`
- Hover states: `hover:bg-[var(--accent)]/30`
- Active states: `active:bg-[var(--accent)]/40`

**Secondary: Celtic Gold**

- UI elements: `text-[var(--celtic-gold)]`
- Backgrounds: `bg-[var(--celtic-gold)]/15`
- Borders: `border-[var(--celtic-gold)]/25`
- Hover states: `hover:bg-[var(--celtic-gold)]/25`

**Base Colors**

- Background Primary: `bg-[var(--background)]` // Theme variable
- Background Secondary: `bg-[var(--surface)]` // Theme variable
- Text Primary: `text-[var(--foreground)]`
- Text Secondary: `text-[var(--foreground)]/80`
- Text Muted: `text-[var(--foreground)]/60`

**Supporting Colors**

- Success: `text-[var(--success)]` // Semantic variable
- Warning: `text-[var(--celtic-gold)]`
- Error: `text-[var(--destructive)]`
- Info: `text-[var(--celtic-blue)]`
- Neutral: `text-[var(--foreground)]/70`

**Accent Gradients**

```tsx
// Irish landscape gradient
<div className="bg-gradient-to-br from-[var(--emerald)]/20 via-[var(--celtic-blue)]/10 to-[var(--celtic-gold)]/20" />

// Celtic sunset gradient
<div className="bg-gradient-to-r from-[var(--celtic-gold)]/20 to-[var(--irish-red)]/20" />
```

### Enhanced Gradient System for Visual Interest

Our enhanced gradient system uses vibrant, subtle gradients to add visual interest, particularly in areas where images would typically be used. These gradients follow the Irish color theme and should be used judiciously to avoid overwhelming the design.

**When to Use Enhanced Gradients:**

- As placeholders for images
- In hero sections for visual impact
- In cards and containers to add depth
- To create visual hierarchy in sections
- To enhance otherwise empty spaces

**When to Avoid Enhanced Gradients:**

- In areas with dense text or complex UI
- When they would compete with actual imagery
- Throughout an entire page (use sparingly)
- When they would reduce readability

#### Hero Section Gradients

For hero sections, use full-width gradients with medium opacity to create impact while maintaining readability:

```tsx
{
  /* Hero Section with vibrant background */
}
;<section className="relative overflow-hidden">
  {/* Main gradient background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(59,130,246,0.2) 50%, rgba(99,102,241,0.3) 100%)',
    }}
  ></div>

  {/* Decorative corner elements */}
  <div className="absolute right-0 top-0 h-64 w-64 rounded-bl-full bg-gradient-to-bl from-white/10 to-transparent"></div>
  <div className="absolute bottom-0 left-0 h-64 w-64 rounded-tr-full bg-gradient-to-tr from-black/5 to-transparent"></div>

  {/* Content */}
  <div className="container relative z-10 mx-auto px-4">
    {/* Hero content here */}
  </div>
</section>
```

#### Image Placeholder Gradients

For image placeholder areas, use vibrant gradients with higher opacity to create visual interest:

```tsx
{
  /* Image placeholder with enhanced gradient */
}
;<div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
  {/* Main gradient fill */}
  <div
    className="absolute inset-0"
    style={{
      background:
        'linear-gradient(135deg, rgba(66,153,225,0.4) 0%, rgba(16,185,129,0.3) 35%, rgba(245,158,11,0.35) 100%)',
    }}
  ></div>

  {/* Lighting effects */}
  <div className="absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent"></div>
  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>

  {/* Icon or placeholder content */}
  <div className="absolute inset-0 flex items-center justify-center">
    <svg
      className="h-16 w-16 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {/* SVG path */}
    </svg>
  </div>

  {/* Decorative corner elements */}
  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-3xl bg-gradient-to-bl from-yellow-500/40 to-transparent"></div>
  <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-3xl bg-gradient-to-tr from-blue-500/40 to-transparent"></div>
</div>
```

#### Card Background Gradients

For cards, use subtle radial gradients to add depth without overwhelming content:

```tsx
{
  /* Card with subtle gradient background */
}
;<div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
  {/* Subtle gradient accent */}
  <div
    className="absolute right-0 top-0 h-48 w-48"
    style={{
      background:
        'radial-gradient(circle at top right, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)',
      borderBottomLeftRadius: '5rem',
    }}
  ></div>
  <div
    className="absolute -bottom-6 -left-6 h-48 w-48 rounded-full"
    style={{
      background:
        'radial-gradient(circle at bottom left, rgba(16,185,129,0.15) 0%, transparent 70%)',
    }}
  ></div>

  {/* Card content */}
  <div className="relative z-10">{/* Card content here */}</div>
</div>
```

#### Section Background Gradients

For section backgrounds, use large, very subtle gradients to create visual distinction between page sections:

```tsx
{
  /* Section with subtle background gradients */
}
;<section className="relative overflow-hidden bg-[var(--background)] py-10 md:py-16">
  {/* Corner background gradients */}
  <div className="from-[var(--celtic-blue)]/10 absolute right-0 top-0 h-1/3 w-1/3 bg-gradient-to-bl to-transparent"></div>
  <div className="from-[var(--celtic-gold)]/10 absolute bottom-0 left-0 h-1/3 w-1/3 bg-gradient-to-tr to-transparent"></div>

  {/* Section content */}
  <div className="container relative z-10 mx-auto px-4">
    {/* Section content here */}
  </div>
</section>
```

#### Gradient Color Palette

Use these precise RGBA values for gradient consistency across the application:

| Color Name  | Primary Value        | Secondary Value      | Accent Value         |
| ----------- | -------------------- | -------------------- | -------------------- |
| Emerald     | rgba(16,185,129,0.3) | rgba(16,185,129,0.2) | rgba(16,185,129,0.1) |
| Celtic Gold | rgba(245,158,11,0.3) | rgba(245,158,11,0.2) | rgba(245,158,11,0.1) |
| Celtic Blue | rgba(59,130,246,0.3) | rgba(59,130,246,0.2) | rgba(59,130,246,0.1) |

#### Implementation Guidelines

1. **Always use z-indexing properly**

   - Gradients should be positioned below content (`z-0` or no z-index)
   - Content should be positioned above gradients (`z-10` or higher)
   - Use `relative` and `overflow-hidden` on parent containers

2. **Maintain accessibility**

   - Ensure text has sufficient contrast against gradient backgrounds
   - Don't use gradients that would make text unreadable
   - Test all gradients in both light and dark modes

3. **Apply consistently**

   - Use the same gradient patterns for similar UI elements
   - Match gradient colors to element purpose (emerald for nature/primary, gold for value/importance, blue for technology/information)

4. **Balance with empty space**
   - Don't place gradients too close together
   - Allow for "gradient-free" areas to rest the eye
   - Consider page flow when placing gradient elements

### Light Mode Implementation Guidelines

Light mode adapts Irish colors for daytime viewing while maintaining brand consistency. Again, these color references are provided for understanding - in code, always use CSS variables.

**Primary Colors**

- Primary: `text-[var(--accent)]` // Will automatically adjust in light mode
- Secondary: `text-[var(--celtic-gold)]` // Adjusts in light mode
- Backgrounds: `bg-[var(--background)]` // Changes to light theme
- Borders: `border-[var(--border)]` // Changes to light theme

**Surface Colors**

- Background: `bg-[var(--background)]` // Pure white in light mode
- Surface: `bg-[var(--surface)]` // Barely mint in light mode
- Border: `border-[var(--border)]` // Light borders in light mode

### Implementing Theme-Aware Components

When creating new components, follow these practices:

1. **Use semantic variables over direct color references**

   ```tsx
   // ✅ Recommended: Semantic variables
   <button className="bg-[var(--primary)] text-[var(--primary-foreground)]">Button</button>

   // ⚠️ Acceptable but less flexible
   <button className="bg-[var(--accent)]">Button</button>

   // ❌ Avoid: Hardcoded colors
   <button className="bg-emerald-600">Button</button>
   ```

2. **Testing in both themes**

   - Always verify components in both light and dark modes
   - Check all interactive states (hover, active, focus) in both themes
   - Ensure sufficient contrast in both modes

3. **Theme transitions**
   - Add appropriate transitions for smooth theme switching
   - Use `transition-colors` for color changes
   - Keep transitions under 300ms for responsiveness

### Color Application Guidelines

1. **Educational Content**

   - Use Emerald Green for primary actions and success states
   - Apply Celtic Gold for highlights and important information
   - Utilize Celtic Blue for interactive elements and links

2. **Content Hierarchy**

   ```tsx
   // Primary heading
   <h1 className="text-[hsl(145,63%,42%)] dark:text-[hsl(145,63%,42%)] font-bold">

   // Secondary heading
   <h2 className="text-[hsl(35,90%,55%)] dark:text-[hsl(35,90%,55%)] font-semibold">

   // Important content
   <div className="bg-[hsl(145,63%,42%)]/10 dark:bg-[hsl(145,63%,42%)]/20
                   border-l-4 border-[hsl(145,63%,42%)] p-4">
   ```

3. **Interactive States**

   ```tsx
   // Primary button
   <button className={cn(
     "px-6 py-3 rounded-xl font-medium transition-all",
     "bg-[hsl(145,63%,42%)] text-white",
     "dark:bg-[hsl(145,63%,42%)]/20 dark:text-[hsl(145,63%,42%)]",
     "hover:bg-[hsl(145,63%,32%)] dark:hover:bg-[hsl(145,63%,42%)]/30",
     "active:bg-[hsl(145,63%,22%)] dark:active:bg-[hsl(145,63%,42%)]/40"
   )}>

   // Secondary button
   <button className={cn(
     "px-6 py-3 rounded-xl font-medium transition-all",
     "bg-[hsl(35,90%,55%)]/10 text-[hsl(35,90%,55%)]",
     "dark:bg-[hsl(35,90%,55%)]/20 dark:text-[hsl(35,90%,55%)]",
     "hover:bg-[hsl(35,90%,55%)]/20 dark:hover:bg-[hsl(35,90%,55%)]/30"
   )}>
   ```

4. **Status Indicators**

   ```tsx
   // Success state
   <div className="text-[hsl(145,63%,42%)] bg-[hsl(145,63%,42%)]/10 dark:bg-[hsl(145,63%,42%)]/20">

   // Warning state
   <div className="text-[hsl(35,90%,55%)] bg-[hsl(35,90%,55%)]/10 dark:bg-[hsl(35,90%,55%)]/20">

   // Error state
   <div className="text-[hsl(11,90%,60%)] bg-[hsl(11,90%,60%)]/10 dark:bg-[hsl(11,90%,60%)]/20">
   ```

### Animation Guidelines

**Page and Section Transitions:**

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

**Sequential Entrance:**

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.15 }}
>
  {/* Content */}
</motion.div>
```

**Content Transition:**

```tsx
<AnimatePresence mode="wait">
  {currentStep === 0 && (
    <motion.div
      key="step0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Step content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Dark Mode Implementation Guidelines

1. **Color Contrast**

   - Maintain 4.5:1 contrast ratio for text
   - Use HSL colors for precise opacity control
   - Implement subtle gradients for depth

2. **Visual Hierarchy**

   - Use brightness and opacity for emphasis
   - Implement glows for interactive elements
   - Maintain clear boundaries between sections

3. **Interactive States**

   ```tsx
   <button
     className={cn(
       'rounded-xl px-6 py-3 font-medium transition-all',
       'bg-[hsl(45,97%,51%)]/20 text-[hsl(45,97%,51%)]',
       'hover:bg-[hsl(45,97%,51%)]/30 active:bg-[hsl(45,97%,51%)]/40',
       'focus-visible:ring-2 focus-visible:ring-[hsl(45,97%,51%)]/50'
     )}
   >
     Action
   </button>
   ```

4. **Dark Mode Shadows**
   ```tsx
   <div className="shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.7)]">
     {/* Content */}
   </div>
   ```

## Tool Design Guidelines {#tool-design}

### Modern Tool Requirements

1. **Real-time Interaction**

   - Immediate calculation feedback
   - Dynamic updates
   - Progress indicators

2. **Visual Engagement**

   - Custom input controls
   - Interactive sliders
   - Contextual styling

3. **Educational Context**
   - Inline explanations
   - Visual scales
   - Learning-focused feedback

### Critical Components

**Interactive Slider Pattern:**

```tsx
<div className="relative">
  <input
    type="range"
    className="absolute z-20 h-6 w-full appearance-none opacity-0"
  />
  <div className="absolute inset-0 h-2 rounded-full bg-gray-200 dark:bg-gray-700/80" />
  <div
    className="absolute h-2 rounded-full bg-red-500 dark:bg-[hsl(45,97%,51%)]"
    style={{ width: `${percentageFilled}%` }}
  />
</div>
```

**Result Display Pattern:**

```tsx
<div
  className={cn(
    'rounded-2xl p-6',
    result
      ? 'border-red-300/30 dark:border-[hsl(45,97%,51%)]/30'
      : 'border-border/30'
  )}
>
  <AnimatePresence mode="wait">
    {result && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-6xl font-bold text-red-500 dark:text-[hsl(45,97%,51%)]">
          {result.value}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

### Validation System

```tsx
const validate = (value, config) => {
  // Hard constraints
  if (value < config.min || value > config.max) return false

  // Soft constraints with warnings
  if (value > config.warningThreshold) {
    return { warning: true, message: 'Unusual value detected' }
  }

  return true
}
```

## Implementation Guidelines {#implementation}

### Critical Theming Implementation

For consistent theming and proper light/dark mode support, these implementation guidelines are **required**:

1. **NEVER use hardcoded colors for any component**

   - All colors must reference CSS variables
   - Component background and text colors should use `--background` and `--foreground`
   - No direct color values (e.g., `bg-gray-800`) in components that should support themes

2. **Structure your CSS variables correctly**

   ```css
   /* Base semantic variables */
   :root {
     --background: #ffffff;
     --foreground: #171717;
     /* More variables */
   }

   /* Dark mode overrides */
   .dark {
     --background: hsl(222, 47%, 11%);
     --foreground: #ededed;
     /* More variables */
   }
   ```

3. **Verify theme switching for all components**

   - All UI elements must respond correctly to theme changes
   - Test both static and interactive elements
   - Ensure proper contrast in both modes

4. **Debugging Theme Issues**
   When components don't correctly switch themes:
   1. Verify CSS variables are being used (not hardcoded colors)
   2. Check that parent containers are using theme variables
   3. Inspect element classes to ensure theme class propagation
   4. Check for specificity issues overriding theme styles
   5. Test with CSS variable inspector in developer tools

### Mobile-first Controls

1. **Touch targets: minimum 44px**

   ```tsx
   <button className="min-h-[44px] min-w-[44px] bg-[var(--accent)]">
     <span>Click me</span>
   </button>
   ```

2. **Clear touch feedback**

   ```tsx
   <button className="active:bg-[var(--accent)]/30 transition-colors">
     <span>Interactive</span>
   </button>
   ```

3. **Adequate spacing**
   ```tsx
   <div className="space-y-4 p-4">
     <button className="px-4 py-3">Button 1</button>
     <button className="px-4 py-3">Button 2</button>
   </div>
   ```

### Common Theme Implementation Mistakes

❌ **Don't mix hardcoded colors and theme variables in the same component**

```tsx
// BAD: Mixing hardcoded colors with variables
<div className="bg-gray-900 text-[var(--foreground)]">Content</div>
```

❌ **Don't use direct color names for backgrounds**

```tsx
// BAD: Using named colors directly
<div className="bg-gray-900 dark:bg-gray-100">
  This won't follow the theme system
</div>
```

❌ **Don't rely on dark: prefix for essential theming**

```tsx
// BAD: Relying only on dark: without CSS variables
<div className="bg-white text-black dark:bg-gray-900 dark:text-white">
  Hard to maintain and extend
</div>
```

✅ **Proper theme implementation using CSS variables**

```tsx
// GOOD: Using theme variables
<div className="bg-[var(--background)] text-[var(--foreground)]">
  <h2 className="text-xl text-[var(--accent)]">Themed Heading</h2>
  <p className="text-[var(--foreground)]/80">
    This content will properly adapt to theme changes
  </p>
  <button className="bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)]">
    Themed Button
  </button>
</div>
```

### Performance

1. **Code splitting**

   - Import components lazily: `const Component = dynamic(() => import('./Component'))`
   - Split route code by using Next.js pages directory structure
   - Use `React.lazy` and `Suspense` for component loading

2. **Image optimization**

   - Use Next.js `Image` component for automatic optimization
   - Set proper width and height to avoid layout shifts
   - Use the `blur` placeholder for better loading experience

3. **State management**

   - Use local state for UI concerns
   - Minimize global state updates
   - Memoize expensive calculations

4. **Debounced calculations**
   - Debounce user input: `useDebounce(value, 300)`
   - Throttle resize handlers
   - Debounce form submissions

## Tool-Specific Guidelines {#tools}

### Calculator Tools

- Real-time calculation
- Visual feedback
- Input constraints
- Educational context

### Conversion Tools

- Bidirectional conversion
- Clear input/output
- Reference scales
- Validation rules

### Estimation Tools

- Progressive disclosure
- Contextual help
- Result breakdown
- Confidence indicators

### Dark Mode Tool Considerations

- Use dark surfaces for reduced eye strain
- Implement glowing effects for active states
- Maintain high contrast for important data
- Use color accents sparingly for emphasis
- Provide subtle visual feedback

## Quality Standards {#quality}

1. **Dark Mode Performance**

   - Optimize transitions between themes
   - Reduce flash of unstyled content
   - Implement system preference detection
   - Cache theme preference
   - Smooth color transitions

2. **Performance**

   - Code splitting
   - Image optimization
   - State management
   - Debounced calculations

3. **Accessibility**

   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader support
   - Color contrast

4. **Maintainability**
   - Component reuse
   - Consistent patterns
   - Clear documentation
   - Version control

## Version Control {#versioning}

- Semantic versioning
- Deprecation notices
- Migration guides
- Backward compatibility

## Related Resources {#resources}

### Additional Documentation

- [Component API Reference](./components)
- [Tool Implementation Guide](./tools)
- [Accessibility Checklist](./accessibility)
- [Performance Metrics](./performance)
- [Migration Guides](./migrations)

## Hub Page Card Design {#hub-page-card-design}

The Hub Page Card Design is a distinctive component used for navigation across main section pages. It features color-coded icons, gradient borders, and subtle background effects that align with our Irish-inspired color system.

### Key Features

1. **Gradient Border Effect**

   - Thin border with direction-based gradient
   - Color-coded based on card category (emerald, gold, blue)
   - Subtle shadow effect for depth

2. **Radial Background Gradient**

   - Subtle radial gradient emanating from top-right corner
   - Low opacity to avoid overwhelming content
   - Reinforces the color theme of the card

3. **Responsive Sizing**
   - Properly scales from mobile to desktop
   - Text size adjustments for different viewport widths
   - Maintains proportional padding and spacing

### Implementation Example

```tsx
{
  /* Hub Page Card with Gradient Border and Background Effects */
}
{
  categories.map((category, index) => {
    const colorClasses = getColorClasses(category.color)
    const colorVar =
      category.color === 'emerald'
        ? 'var(--accent)'
        : category.color === 'gold'
          ? 'var(--celtic-gold)'
          : 'var(--celtic-blue)'
    const rgbaColor =
      category.color === 'emerald'
        ? 'rgba(16,185,129,'
        : category.color === 'gold'
          ? 'rgba(245,158,11,'
          : 'rgba(59,130,246,'

    return (
      <div
        key={index}
        className="relative rounded-2xl bg-gradient-to-br p-0.5 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${rgbaColor}0.4), ${rgbaColor}0.1)`,
        }}
      >
        <Link
          href={category.href}
          className="relative block h-full overflow-hidden rounded-2xl bg-[var(--surface)] p-4 transition-all hover:bg-[var(--surface-accent)] md:p-6 lg:p-8"
        >
          {/* Enhanced gradient background with higher opacity */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at top right, ${rgbaColor}0.15), ${rgbaColor}0.05), transparent)`,
              opacity: 0.9,
            }}
          ></div>

          <div className="relative z-10">
            <div
              className={cn(
                'mb-3 flex h-10 w-10 items-center justify-center rounded-full md:mb-4 md:h-12 md:w-12',
                colorClasses.bg
              )}
            >
              <span className={colorClasses.icon}>{category.icon}</span>
            </div>
            <h3
              className={cn(
                'mb-1 text-lg font-semibold md:mb-2 md:text-xl',
                colorClasses.text
              )}
            >
              {category.title}
            </h3>
            <p className="text-[var(--foreground)]/80 mb-3 line-clamp-3 text-sm md:mb-4 md:text-base">
              {category.description}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  'text-xs font-medium md:text-sm',
                  colorClasses.text
                )}
              >
                Coming Soon
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn('h-4 w-4 md:h-5 md:w-5', colorClasses.text)}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    )
  })
}
```

### Color Class Utility

The card design uses a utility function to generate color-appropriate classes:

```tsx
const getColorClasses = (color: string) => {
  switch (color) {
    case 'emerald':
      return {
        icon: 'text-[var(--accent)]',
        bg: 'bg-[var(--accent)]/20',
        border: 'from-[var(--accent)]/40 to-[var(--accent)]/10',
        text: 'text-[var(--accent)]',
        hover: 'hover:bg-[var(--accent)]/30',
      }
    case 'gold':
      return {
        icon: 'text-[var(--celtic-gold)]',
        bg: 'bg-[var(--celtic-gold)]/20',
        border: 'from-[var(--celtic-gold)]/40 to-[var(--celtic-gold)]/10',
        text: 'text-[var(--celtic-gold)]',
        hover: 'hover:bg-[var(--celtic-gold)]/30',
      }
    case 'blue':
      return {
        icon: 'text-[var(--celtic-blue)]',
        bg: 'bg-[var(--celtic-blue)]/20',
        border: 'from-[var(--celtic-blue)]/40 to-[var(--celtic-blue)]/10',
        text: 'text-[var(--celtic-blue)]',
        hover: 'hover:bg-[var(--celtic-blue)]/30',
      }
    default:
      return {
        icon: 'text-[var(--accent)]',
        bg: 'bg-[var(--accent)]/20',
        border: 'from-[var(--accent)]/40 to-[var(--accent)]/10',
        text: 'text-[var(--accent)]',
        hover: 'hover:bg-[var(--accent)]/30',
      }
  }
}
```

### Technical Details

#### Gradient Border Implementation

The gradient border effect is achieved by using a small padding (p-0.5) on the outer container with a gradient background, while the inner container has a solid background with rounded corners that's slightly smaller:

```tsx
<div
  className="relative rounded-2xl bg-gradient-to-br p-0.5 shadow-lg"
  style={{
    backgroundImage: `linear-gradient(to bottom right, ${rgbaColor}0.4), ${rgbaColor}0.1)`,
  }}
>
  <div className="h-full rounded-2xl bg-[var(--surface)] p-4 md:p-6 lg:p-8">
    {/* Content */}
  </div>
</div>
```

#### Radial Background Gradient

The subtle radial background effect is created using an absolutely positioned div with a radial gradient:

```tsx
<div
  className="absolute inset-0"
  style={{
    background: `radial-gradient(circle at top right, ${rgbaColor}0.15), ${rgbaColor}0.05), transparent)`,
    opacity: 0.9,
  }}
></div>
```

#### Responsive Design

The card implements responsive design with:

1. **Text Sizes**:

   - Headings: `text-lg md:text-xl`
   - Body text: `text-sm md:text-base`
   - Labels: `text-xs md:text-sm`

2. **Padding**:

   - Mobile: `p-4`
   - Tablet: `md:p-6`
   - Desktop: `lg:p-8`

3. **Icon Sizing**:
   - Mobile: `h-10 w-10`
   - Desktop: `md:h-12 md:w-12`

### Usage Guidelines

1. **When to use this component**:

   - For main category navigation on hub pages
   - When displaying 3-8 related but distinct sections
   - When visual distinction between categories is important

2. **Color Coding**:

   - Use consistent colors for related categories (e.g., all finance-related cards use gold)
   - Limit to 3 main colors (emerald, gold, blue) to maintain visual harmony
   - Ensure all colors meet contrast requirements in both light and dark modes

3. **Content Guidelines**:

   - Keep titles short (1-3 words)
   - Descriptions should be concise (120-150 characters)
   - Use consistent iconography style

4. **Accessibility Considerations**:
   - Ensure sufficient contrast between text and background
   - Make sure the entire card is keyboard-focusable as a link
   - Include hover and focus states for interactive elements

### Dark Mode Behavior

In dark mode, the cards maintain their color-coding while adapting to the darker background:

1. The border gradients become slightly more pronounced
2. Background gradients have slightly increased opacity
3. The inner container uses `var(--surface)` which adapts to dark mode automatically
4. Text and icon colors remain consistent through the use of CSS variables

This component exemplifies our dark-mode first approach while providing vibrant, engaging navigation elements that incorporate the Irish-inspired color system.

## Form Design Patterns {#form-design}

Modern form design in Qogent focuses on clean aesthetics, subtle animations, and intuitive interactions while maintaining our dark-first approach and CSS variable system.

### Key Form Design Principles

1. **Minimalist Input Fields** - Use underlined inputs instead of full borders for a cleaner appearance
2. **Consistent Icon Integration** - Left-aligned icons with 60-70% opacity in input fields
3. **Subtle Animation** - Floating labels, focus transitions, and gentle validation feedback
4. **Clear Error States** - Accessible validation messaging with appropriate color indicators

### Essential Form Components

**Underline Input Pattern:**

```tsx
<div className="relative mb-6">
  <label className="text-[var(--foreground)]/60 mb-1 block text-sm">
    Your Full Name
  </label>
  <div className="flex items-center border-b border-[var(--border)] focus-within:border-[var(--accent)]">
    <User className="text-[var(--foreground)]/50 h-5 w-5" />
    <input className="w-full border-none bg-transparent px-3 py-2.5 outline-none focus:ring-0" />
  </div>
</div>
```

**Date Picker Trigger:**

```tsx
<div className="relative mb-6">
  <label className="text-[var(--foreground)]/60 mb-1 block text-sm">
    Select Date
  </label>
  <div className="hover:border-[var(--foreground)]/30 flex items-center border-b border-[var(--border)]">
    <Calendar className="text-[var(--foreground)]/50 h-5 w-5" />
    <div className="w-full cursor-pointer bg-transparent px-3 py-2.5">
      {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Pick a date'}
    </div>
    <ChevronDown className="text-[var(--foreground)]/50 h-4 w-4" />
  </div>
</div>
```

**Calendar Date Cell:**

```tsx
<button
  className={cn(
    'flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors',
    isSelected && 'bg-[var(--accent)] text-white',
    isAvailable && !isSelected && 'bg-[var(--accent)]/10 text-[var(--accent)]'
  )}
>
  {date}
</button>
```

**Status Indicator:**

```tsx
<div className="bg-[var(--success)]/10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-[var(--success)]">
  <Clock className="h-4 w-4" />
  <span>20 slots left this week</span>
</div>
```

**Submit Button:**

```tsx
<button
  type="submit"
  className="hover:bg-[var(--accent)]/90 w-full rounded-full bg-[var(--accent)] px-6 py-4 font-medium text-white"
>
  Schedule Consultation
</button>
```

### Animation Guidelines

- **Label Transitions**: 200-300ms duration for floating label animations
- **Dropdown Animations**: Use AnimatePresence with short (150-250ms) fade and slight y-movement
- **Button Feedback**: Implement whileTap={{ scale: 0.98 }} for tactile button press feedback

### Accessibility Requirements

- Ensure all form controls are keyboard accessible with proper tab order
- Maintain 4.5:1 contrast ratio for all text elements
- Use ARIA attributes for custom form controls
- Support both dark and light modes with proper color adjustments

## Conclusion {#conclusion}

The Qogent Design System represents our commitment to creating exceptional educational experiences through thoughtful design, consistent implementation, and continuous improvement. By following these guidelines, we ensure that our educational tools and interfaces serve their primary purpose: enhancing learning and understanding for all students.
