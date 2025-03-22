# Tools Style Guide for Qogent.in

Based on the examples provided and Qogent's existing design system, this comprehensive style guide will help us build modern, visually engaging tools.

## 1. Design Principles

- **Interactive Over Static**: Use interactive elements rather than traditional form fields when possible
- **Visual Results**: Display outcomes visually, not just as text data
- **Progressive Disclosure**: Break complex tools into manageable steps
- **Consistent Iconography**: Use icons to reinforce concepts and improve scannability
- **Mobile-First**: Design for touch interactions first, then enhance for desktop

## 2. Layout Structure

### Tool Cards (Overview Page)
- Cards should use subtle gradients in header area
- Icon should be positioned in the top left with appropriate color
- Clear hierarchy: Title → Description → CTA
- "Coming Soon" tags for unreleased tools
- Consistent spacing: 1.5rem padding inside cards

### Tool Interface (Individual Tools)
- Step-based navigation for multi-step tools
- Clear progress indication (numbering, progress bar)
- Results displayed in visually distinct section
- Content area with 2rem padding
- Related tips/help content in secondary section

## 3. Component Specifications

### Selection Cards
- Minimum height: 100px
- Border radius: var(--radius)
- Selected state: Highlight border (2px solid var(--primary))
- Include visual "check" indicator when selected
- Subtle hover effect: scale(1.02) with shadow increase

### Interactive Inputs
- **Sliders**: 
  - Full-width, custom styled thumbs
  - Color gradient tracks when appropriate
  - Value labels at both ends

- **Option Selectors**:
  - Card-based selections instead of dropdowns when <7 options
  - Visual distinctions between options (icons, colors)

- **Custom Toggles/Tabs**:
  - Pill-shaped toggle groups
  - Clear active states with background change

### Results Display
- Use circular indicators for scores/grades
- Color-coded results based on value context
- Comparison charts for relative data
- Iconography to reinforce meaning
- Animated transitions when results update

## 4. Color System

Extend the existing color system with tool-specific uses:

- **Tool Categories**:
  - Financial tools: var(--success-light) to var(--success)
  - Academic tools: var(--info-light) to var(--info)
  - Documentation tools: var(--warning-light) to var(--warning)
  - Timeline tools: var(--secondary-light) to var(--secondary)

- **Result Indicators**:
  - Excellent/High: var(--success)
  - Good/Medium: var(--info)
  - Average: var(--secondary)
  - Below Average: var(--warning)
  - Poor: var(--destructive)

- **Step Indicators**:
  - Current step: var(--primary)
  - Completed steps: var(--primary-light)
  - Upcoming steps: var(--muted)

## 5. Typography

- Tool headlines: 1.5rem, var(--font-bold)
- Step headings: 1.25rem, var(--font-medium)
- Input labels: 0.875rem, var(--font-medium), var(--muted-foreground)
- Result values: 2rem, var(--font-bold) for emphasis
- Helper text: 0.75rem, var(--font-normal), var(--muted-foreground)

## 6. Interaction Patterns

- **Multi-step Tools**:
  - Always show progress (1 of 4, etc.)
  - Allow back navigation without losing data
  - Validate each step before proceeding
  - Show summary at final step

- **Results Generation**:
  - Subtle loading animation (pulse, spinner)
  - Animate results appearing (fade-in, scale)
  - Allow adjusting inputs and seeing real-time updates

- **Mobile Interactions**:
  - Larger touch targets (min 44px)
  - Collapsible sections for dense information
  - Bottom-fixed navigation on multi-step tools

## 7. Implementation Guidelines

```jsx
// Example Tool Card Component
<div className="tool-card rounded-lg bg-gradient-to-b from-[var(--card-gradient-from)] to-[var(--card-gradient-to)] p-6 hover:shadow-lg transition-all">
  <div className="icon-container p-3 rounded-full bg-primary/10 mb-4">
    <Icon className="h-6 w-6 text-primary" />
  </div>
  
  <h3 className="tool-title text-xl font-medium mb-2">Tool Name</h3>
  <p className="tool-description text-sm text-muted-foreground mb-4">
    Description of what the tool does and its benefits.
  </p>
  
  {isComingSoon ? (
    <div className="coming-soon-badge px-3 py-1 text-xs rounded-full bg-secondary/20 text-secondary">
      Coming Soon
    </div>
  ) : (
    <Link href="/tools/tool-slug" className="explore-link group flex items-center text-primary">
      Explore Tool
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )}
</div>
```

## 8. Accessibility Considerations

- Maintain contrast ratios of at least 4.5:1 for all text
- Provide text alternatives for all visual indicators
- Ensure keyboard navigability for all interactive elements
- Use appropriate ARIA attributes for custom controls
- Design focus states that are visible and consistent

## 9. Animation Guidelines

- Subtle transitions between steps (150-250ms)
- Results should animate in (fade + scale, 300ms)
- Loading states should use subtle pulse animations
- Avoid animations that prevent user interaction
- Consider reduced-motion preferences

## 10. Example Tools Reference

### Current Tool Implementations
Our existing tools in other websites showcase these principles in action:

1. **Cost of Living Calculator**
   - Multi-step process (City → Accommodation → Lifestyle → Results)
   - Card-based city selection with visual differentiation
   - Cost indicators (High, Moderate) for easy comparison
   - Tips section with actionable advice

2. **Grade Converter**
   - Tab-based input system
   - Visual result display with circular indicator
   - Color-coded grade representation
   - Scale reference for context

These examples demonstrate how we transform mundane tools into engaging, informative experiences that guide students through complex decisions in an intuitive way. 