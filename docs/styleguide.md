# Qogent Design System Style Guide

## Core Design Principles

### 1. Mobile-First, Dark Mode-First
- All designs start with mobile layouts and dark mode
- Progressive enhancement for larger screens
- Light mode as an alternative, not an afterthought
- Touch-optimized interfaces with appropriate spacing

### 2. Accessibility First
- WCAG 2.1 AA compliance as minimum standard
- Support for screen readers and keyboard navigation
- Reduced motion preferences respected
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text

### 3. Performance
- Optimized asset loading
- Minimal DOM complexity
- Efficient CSS and JavaScript
- Progressive loading strategies

## Color System

### Primary Colors
```css
--blue-primary: #4C6FFF;    /* Main brand color */
--blue-dark: #0047B3;       /* Dark variant */
--blue-light: #EEF3FF;      /* Light variant */
```

### Secondary Colors
```css
--mint: #E8F5F0;           /* Light mint background */
--mint-dark: #D1E9E3;      /* Dark mint variant */
--peach: #FFF1EC;          /* Light peach background */
--peach-dark: #FFE4DB;     /* Dark peach variant */
```

### Accent Colors
```css
--accent-blue: #18B2F5;    /* Bright blue accent */
--accent-purple: #6366F1;  /* Purple accent */
```

### Monochromatic Scale
```css
--gray-50: #FAFAFA;
--gray-100: #F4F4F5;
--gray-200: #E4E4E7;
--gray-300: #D4D4D8;
--gray-400: #A1A1AA;
--gray-500: #71717A;
--gray-600: #52525B;
--gray-700: #3F3F46;
--gray-800: #27272A;
--gray-900: #18181B;
```

### Semantic Colors
```css
/* Dark Mode (Default) */
--background: var(--gray-900);
--surface: var(--gray-800);
--text: white;
--text-secondary: var(--gray-400);
--border: var(--gray-700);

/* Light Mode */
.light-mode {
  --background: var(--gray-50);
  --surface: white;
  --text: var(--gray-900);
  --text-secondary: var(--gray-600);
  --border: var(--gray-200);
}
```

### Gradients
```css
/* Button Gradients */
--btn-primary-gradient: linear-gradient(135deg, var(--blue-primary), #6B8AFF);
--btn-secondary-gradient: linear-gradient(135deg, #FFFFFF, var(--blue-light));

/* Card Gradients */
--card-gradient-mint: linear-gradient(120deg, var(--mint) 0%, #FFFFFF 100%);
--card-gradient-peach: linear-gradient(120deg, var(--peach) 0%, #FFFFFF 100%);
--card-gradient-blue: linear-gradient(120deg, var(--blue-light) 0%, #FFFFFF 100%);
```

## Typography

### Font Stack
```css
--font-sans: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
--font-display: 'Outfit', sans-serif;
--font-accent: 'Caveat', cursive;
```

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Spacing System

### Base Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

### Component-Specific Spacing
```css
--header-height: 4rem;
--container-padding: var(--space-4);
--card-padding: var(--space-6);
--section-spacing: var(--space-16);
```

## Borders & Shadows

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 102, 255, 0.05);
--shadow-md: 0 4px 8px rgba(0, 102, 255, 0.08);
--shadow-lg: 0 8px 16px rgba(0, 102, 255, 0.12);
--shadow-xl: 0 12px 24px rgba(0, 102, 255, 0.16);
--btn-shadow: 0 4px 12px rgba(0, 102, 255, 0.2);
--btn-shadow-hover: 0 6px 16px rgba(0, 102, 255, 0.25);
```

## Animation

### Timing
```css
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 350ms;
--transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations
```css
--transition-all: all var(--transition-base) var(--transition-timing);
--transition-transform: transform var(--transition-base) var(--transition-timing);
--transition-opacity: opacity var(--transition-base) var(--transition-timing);
```

## Breakpoints

```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## Component Guidelines

### Buttons
- Use appropriate semantic HTML (`<button>` or `<a>`)
- Include hover and focus states
- Maintain minimum touch target size (44x44px)
- Use consistent padding and border radius
- Include loading states where appropriate

### Cards
- Consistent padding (var(--card-padding))
- Optional hover states for interactive cards
- Clear visual hierarchy for content
- Appropriate spacing between elements
- Semantic HTML structure

### Forms
- Clear labels and placeholder text
- Visible focus states
- Error and success states
- Consistent input sizing
- Clear validation feedback

### Navigation
- Clear active states
- Consistent spacing
- Mobile-friendly touch targets
- Keyboard accessibility
- Clear visual hierarchy

## Best Practices

### CSS
- Use CSS variables for theming
- Mobile-first media queries
- Logical property names
- BEM naming convention
- Avoid magic numbers

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Focus management
- Color contrast
- Screen reader support

### Performance
- Optimize images
- Lazy loading
- Code splitting
- Critical CSS
- Asset optimization

## Implementation Notes

### CSS Variables Usage
```css
.component {
  color: var(--text);
  background: var(--surface);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  transition: var(--transition-all);
}
```

### Dark Mode Implementation
```css
/* Default (Dark) */
:root {
  --background: var(--gray-900);
  --text: white;
}

/* Light Mode */
[data-theme="light"] {
  --background: white;
  --text: var(--gray-900);
}
```

### Responsive Design
```css
.component {
  padding: var(--space-4);
  
  @media (min-width: var(--screen-md)) {
    padding: var(--space-6);
  }
  
  @media (min-width: var(--screen-lg)) {
    padding: var(--space-8);
  }
}
```

## Version Control

This style guide is version 1.0.0. All changes must be documented and versioned appropriately.

## Contributing

1. Follow the mobile-first, dark-mode-first approach
2. Maintain accessibility standards
3. Document all changes
4. Test across breakpoints
5. Ensure performance impact is considered 