# Page Creation Process

This document outlines the step-by-step process for creating new pages in the Qogent system, following our design guidelines and modular approach.

## Core Principles

Before starting any page development, ensure you understand these core principles:

1. **Mobile-first, darkmode-first**: Always design and implement for mobile in dark mode first, then scale up to larger screens and adapt for light mode.
2. **Modular development**: Create separate components for each section of a page, then compose them together.
3. **Conversational and friendly**: Visual elements should complement the warm, personal tone established in blog-voice-tone.md.
4. **Authentic and personal**: Use real imagery and relatable content that feels like advice from a friend.
5. **Accessibility-focused**: Ensure high contrast, readable typography, and intuitive navigation for all users.

## Step 1: Planning and Preparation

1. Review the corresponding page design document:
   - `docs/Homepage.md`
   - `docs/AboutPage.md`
   - `docs/DestinationsPage.md`
   - `docs/ToolsPage.md`
   - `docs/ContactPage.md`
   - `docs/BlogPage.md`
   - `docs/SuccessStoriesPage.md`

2. Review design-related documentation:
   - `docs/PageDesign.md`: Overall design system and guidelines
   - `docs/blog-voice-tone.md`: Writing style guidelines that inform visual design
   - `docs/design-strategy.md`: Strategic approach to design
   - `docs/styleguide.md`: Technical style specifications

3. Identify the sections to be developed and plan component hierarchy:
   ```
   PageName/
   ├── page.tsx                 # Main page component
   ├── components/               # Page-specific components
   │   ├── HeroSection.tsx
   │   ├── FeatureSection.tsx
   │   ├── ContentSection.tsx
   │   └── CTASection.tsx
   └── lib/                      # Page-specific utilities/data
       ├── constants.ts
       └── helpers.ts
   ```

## Step 2: Create Section Components

For each section defined in the page design document, create a separate component:

1. Start with basic structure and mobile layout (dark mode):
   ```tsx
   // src/app/(main)/page-name/components/SectionName.tsx
   
   import { cn } from "@/lib/utils"
   
   export function SectionName() {
     return (
       <section className="container py-8 md:py-12">
         <div className="flex flex-col gap-4">
           {/* Mobile-first, dark-mode first content here */}
         </div>
       </section>
     )
   }
   ```

2. Implement responsive design using Tailwind's responsive prefixes:
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {/* Content */}
   </div>
   ```

3. Apply appropriate animations using our utility classes:
   ```tsx
   <div className="animate-fade-in hover-lift">
     {/* Content with animation */}
   </div>
   ```

4. Use chart colors for visual elements:
   ```tsx
   <div className="bg-[hsl(var(--chart-1))]">
     {/* Content with chart color */}
   </div>
   ```

## Step 3: Implement Visual Assets

### Using Unsplash Images

1. Find a relevant, high-quality image from Unsplash
2. Download and optimize the image:
   ```bash
   curl -L "https://images.unsplash.com/photo-[id]?q=80&w=1200&auto=format" --output public/images/sections/[section-name].jpg
   ```
3. Use next/image for optimized loading:
   ```tsx
   import Image from "next/image"
   
   <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
     <Image
       src="/images/sections/[section-name].jpg"
       alt="Descriptive alt text"
       fill
       className="object-cover"
       priority={isHeroImage}
       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
     />
   </div>
   ```

### Using CSS for Backgrounds

1. For gradients and patterns, use CSS when possible:
   ```tsx
   <div className="bg-gradient-radial from-[hsl(var(--chart-1))] to-[hsl(var(--background))] opacity-80">
     {/* Content */}
   </div>
   ```

2. For simple placeholders during development:
   ```tsx
   <div className="bg-[hsl(var(--card))] aspect-video flex items-center justify-center">
     <span className="text-sm text-muted-foreground">Image placeholder</span>
   </div>
   ```

## Step 4: Utilize shadcn/ui Components

1. Use existing shadcn/ui components where appropriate:
   ```tsx
   import { Button } from "@/components/ui/button"
   import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
   
   <Card className="hover-lift">
     <CardHeader>
       <CardTitle>Card Title</CardTitle>
       <CardDescription>Card description</CardDescription>
     </CardHeader>
     <CardContent>
       {/* Card content */}
     </CardContent>
     <CardFooter>
       <Button variant="default">Action</Button>
     </CardFooter>
   </Card>
   ```

2. Apply custom styling consistent with our design system:
   ```tsx
   <Button 
     variant="default" 
     className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:opacity-90 animate-pulse-subtle"
   >
     Call to Action
   </Button>
   ```

## Step 5: Create Custom Components

For components specified in the PageDesign.md that don't exist in shadcn/ui:

1. Create the custom component in the appropriate directory:
   ```tsx
   // src/components/custom/StatCard.tsx
   
   import { cn } from "@/lib/utils"
   
   interface StatCardProps {
     title: string
     value: string | number
     description?: string
     className?: string
     icon?: React.ReactNode
   }
   
   export function StatCard({ title, value, description, className, icon }: StatCardProps) {
     return (
       <div className={cn(
         "card-modern neumorphic-dark dark:neumorphic-dark text-foreground p-6 flex flex-col gap-2",
         className
       )}>
         {icon && <div className="mb-2">{icon}</div>}
         <h3 className="font-bold text-xl md:text-2xl">{value}</h3>
         <p className="text-sm font-medium">{title}</p>
         {description && <p className="text-xs text-muted-foreground">{description}</p>}
       </div>
     )
   }
   ```

2. Use consistent styling with our utility classes:
   - `card-modern` for card styling
   - `hover-lift` for hover effects
   - `animate-fade-in`, `animate-slide-up`, `animate-pulse-subtle` for animations
   - `neumorphic-light`/`neumorphic-dark` for the neumorphic UI elements
   - `touch-target` for mobile-friendly touch areas

## Step 6: Compose the Main Page

1. Import and compose all section components in the page file:
   ```tsx
   // src/app/(main)/page-name/page.tsx
   
   import { HeroSection } from "./components/HeroSection"
   import { FeatureSection } from "./components/FeatureSection"
   import { ContentSection } from "./components/ContentSection"
   import { CTASection } from "./components/CTASection"
   
   export default function PageName() {
     return (
       <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
         <HeroSection />
         <FeatureSection />
         <ContentSection />
         <CTASection />
       </div>
     )
   }
   ```

2. Add page-specific metadata:
   ```tsx
   export const metadata = {
     title: "Page Title | Qogent",
     description: "Page description under 160 characters for SEO.",
   }
   ```

## Step 7: Implement Interactive Features

For interactive elements described in page design documents:

1. Add state management with React hooks:
   ```tsx
   import { useState } from "react"
   
   export function InteractiveComponent() {
     const [activeTab, setActiveTab] = useState(0)
     
     return (
       <div>
         <div className="flex space-x-2">
           {tabs.map((tab, index) => (
             <button
               key={index}
               onClick={() => setActiveTab(index)}
               className={cn(
                 "px-4 py-2 rounded-lg transition-all",
                 activeTab === index 
                   ? "bg-primary text-primary-foreground" 
                   : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
               )}
             >
               {tab.label}
             </button>
           ))}
         </div>
         <div className="mt-4">
           {tabs[activeTab].content}
         </div>
       </div>
     )
   }
   ```

2. Add animations with Framer Motion for more complex interactions:
   ```tsx
   import { motion } from "framer-motion"
   
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
   >
     Content to animate
   </motion.div>
   ```

## Step 8: Ensure Accessibility

1. Test with keyboard navigation:
   - Verify all interactive elements are reachable via keyboard
   - Ensure visible focus states

2. Check color contrast:
   - Use dev tools to verify contrast ratios meet WCAG 2.1 AA standards
   - Ensure text remains readable on all backgrounds

3. Add appropriate ARIA attributes:
   ```tsx
   <button
     aria-label="Open menu"
     aria-expanded={isOpen}
     onClick={() => setIsOpen(!isOpen)}
   >
     {/* Button content */}
   </button>
   ```

4. Include reduced-motion options:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animate-fade-in, .animate-slide-up {
       animation: none !important;
     }
   }
   ```

## Step 9: Test Responsiveness

1. Test on multiple device sizes:
   - Mobile (320px - 639px)
   - Tablet (640px - 1023px)
   - Desktop (1024px+)
   - Large Desktop (1280px+)

2. Check for layout shifts and overflow issues:
   - Verify text doesn't overflow containers
   - Ensure images maintain aspect ratios
   - Check for unexpected horizontal scrollbars

3. Test in both dark and light modes:
   - Verify color contrast in both modes
   - Ensure all elements maintain proper visibility
   - Check for any unintended color inversions

## Step 10: Optimize Performance

1. Lazy load non-critical content:
   ```tsx
   import dynamic from "next/dynamic"
   
   const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
     loading: () => <p>Loading...</p>,
     ssr: false,
   })
   ```

2. Optimize images:
   - Use WebP or AVIF formats when possible
   - Implement srcset for responsive images
   - Properly size images for their containers

3. Add loading states for asynchronous content:
   ```tsx
   {isLoading ? (
     <div className="animate-pulse bg-muted rounded-lg h-[200px]"></div>
   ) : (
     <ContentComponent data={data} />
   )}
   ```

## Common Issues and Solutions

### 1. Dark/Light Mode Inconsistencies

**Problem**: Elements look good in dark mode but have issues in light mode.

**Solution**: Always test both modes during development. Use HSL variables:
```tsx
// Instead of hardcoded colors:
<div className="bg-gray-900 text-white">

// Use HSL variables:
<div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
```

### 2. Mobile Layout Issues

**Problem**: Layout breaks or looks poor on mobile devices.

**Solution**: Start with mobile layout first, then enhance for larger screens:
```tsx
// Start with mobile styles first
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### 3. Animation Performance

**Problem**: Animations cause performance issues on mobile.

**Solution**: 
- Keep animations simple on mobile
- Use CSS transitions over JavaScript animations when possible
- Consider disabling or simplifying animations for reduced-motion preferences

### 4. Content Overflow

**Problem**: Text or content overflows its container on certain screen sizes.

**Solution**:
- Use flexible units (rem, %, vh/vw) instead of fixed pixels
- Apply overflow properties appropriately:
  ```tsx
  <div className="overflow-hidden text-ellipsis">
  ```
- Test with various content lengths

## Recommendations for Page Creation Workflow

1. **Start Small**: Begin with a single section, perfect it, then move to the next.

2. **Component-First**: Build and test individual components before composing the full page.

3. **Mobile-First**: Always design and implement for mobile first, then adapt for larger screens.

4. **Dark Mode First**: Start styling in dark mode, then adjust for light mode.

5. **Continuous Testing**: Test responsiveness, accessibility, and performance throughout development.

6. **Follow Design Docs**: Refer constantly to the relevant page design document and PageDesign.md.

7. **Modular Approach**: Keep components modular and composable for better maintainability.

8. **Shared Components**: Look for opportunities to create shared components for similar UI patterns.

9. **Accessible From Start**: Build with accessibility in mind from the beginning, not as an afterthought.

10. **Performance Matters**: Consider performance implications of design choices, especially for animations and images.

## Example Component Structure

For the Homepage, the structure might look like:

```
src/app/page.tsx                     # Main homepage
src/app/components/home                  # Homepage components
├── hero/
│   ├── HeroSection.tsx                     # Main hero section
│   ├── AnimatedHeadline.tsx                # Animated headline component
│   └── FloatingElements.tsx                # Animated floating elements
├── stats/
│   ├── StatsSection.tsx                    # Stats & highlights section
│   ├── StatCard.tsx                        # Individual stat card
│   └── CounterAnimation.tsx                # Animated counter
├── destinations/
│   ├── DestinationsSection.tsx             # Featured destinations section
│   ├── CountryCard.tsx                     # Country card component
│   └── DestinationCarousel.tsx             # Mobile carousel for destinations
├── success-stories/
│   ├── SuccessStoriesSection.tsx           # Success stories section
│   ├── SuccessStoryCard.tsx                # Individual story card
│   └── VideoTestimonial.tsx                # Video testimonial component
├── blog-preview/
│   ├── BlogPreviewSection.tsx              # Blog preview section
│   └── BlogPostCard.tsx                    # Blog post preview card
└── cta/
    ├── CTASection.tsx                      # Call-to-action section
    └── AnimatedCTAButton.tsx               # Animated CTA button
```

This modular approach makes the codebase easier to maintain, test, and enhance over time. 