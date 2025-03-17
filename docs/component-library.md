# Qogent.in Component Library

## Introduction

This document outlines the component library for Qogent.in, a global education platform dedicated to democratizing access to international education. The component library follows the design principles outlined in the style guide, emphasizing dark-mode-first, mobile-first development with consistent use of CSS variables.

## Component Hierarchy

```
Base Components
├── Typography
│   ├── Headings (H1-H6)
│   ├── Paragraph
│   ├── List
│   └── Blockquote
├── Containers
│   ├── Section
│   ├── Container
│   └── Grid
└── UI Elements
    ├── Button
    ├── Input
    ├── Select
    ├── Checkbox/Radio
    ├── Badge
    ├── Card
    ├── Accordion
    ├── Tabs
    ├── Sheet
    └── Avatar

Composite Components
├── Layout
│   ├── Header
│   ├── Footer
│   ├── PageHeader
│   └── Breadcrumbs
├── Navigation
│   ├── NavBar
│   ├── MobileMenu
│   └── Pagination
├── Cards
│   ├── CountryCard
│   ├── UniversityCard
│   ├── JobCard
│   ├── ToolCard
│   ├── ServiceCard
│   ├── TeamMemberCard
│   └── TestimonialCard
└── Interactive Elements
    ├── Hero
    ├── FeatureSection
    ├── StatsSection
    ├── TestimonialsSection
    ├── CallToAction
    ├── FAQ
    ├── SearchAndFilter
    └── ComparisonTable
```

## Implementation Status

### Base Components

#### Typography Components

| Component | Status | Notes |
|-----------|--------|-------|
| Heading | ✅ Implemented | Supports h1-h6 with responsive sizing |
| Paragraph | ✅ Implemented | Supports small, base, and large sizes |
| List | ✅ Implemented | Supports ordered and unordered lists with optional icons |
| Blockquote | ✅ Implemented | Supports different style variants and author attribution |

#### Container Components

| Component | Status | Notes |
|-----------|--------|-------|
| Section | ✅ Implemented | Supports different background styles |
| Container | ✅ Implemented | Supports small, default, and large sizes |
| Grid | ✅ Implemented | Supports 1-4 columns with responsive behavior |

#### UI Elements

| Component | Status | Notes |
|-----------|--------|-------|
| Button | ✅ Implemented | Using shadcn/ui with variants |
| Input | ✅ Implemented | Using shadcn/ui |
| Select | ✅ Implemented | Using shadcn/ui with Radix UI |
| Checkbox/Radio | ✅ Implemented | Using shadcn/ui with Radix UI |
| Badge | ✅ Implemented | Using shadcn/ui with variants |
| Card | ✅ Implemented | Using shadcn/ui |
| Accordion | ✅ Implemented | Using shadcn/ui with Radix UI |
| Tabs | ✅ Implemented | Using shadcn/ui with Radix UI |
| Sheet | ✅ Implemented | Using shadcn/ui with Radix UI Dialog |
| Avatar | ✅ Implemented | Using shadcn/ui |

### Composite Components

#### Layout Components

| Component | Status | Notes |
|-----------|--------|-------|
| Header | ✅ Implemented | With mobile menu and theme toggle |
| Footer | ✅ Implemented | With navigation links and copyright |
| PageHeader | ✅ Implemented | With title, description, and optional actions |
| Breadcrumbs | ✅ Implemented | With home icon and navigation links |

#### Navigation Components

| Component | Status | Notes |
|-----------|--------|-------|
| NavBar | ✅ Implemented | As part of Header component |
| MobileMenu | ✅ Implemented | As part of Header component |
| Pagination | ✅ Implemented | With page numbers and navigation |

#### Card Components

| Component | Status | Notes |
|-----------|--------|-------|
| CountryCard | ✅ Implemented | For displaying country information |
| UniversityCard | ✅ Implemented | For displaying university information |
| JobCard | ✅ Implemented | For displaying job listings |
| ToolCard | ✅ Implemented | For displaying available tools |
| ServiceCard | ✅ Implemented | For displaying services offered |
| TeamMemberCard | ✅ Implemented | For displaying team information |
| TestimonialCard | ✅ Implemented | For displaying testimonials |

#### Interactive Elements

| Component | Status | Notes |
|-----------|--------|-------|
| Hero | ✅ Implemented | With title, description, and call-to-action buttons |
| FeatureSection | ✅ Implemented | For displaying feature lists with icons |
| StatsSection | ✅ Implemented | For displaying statistics with descriptions |
| TestimonialsSection | ✅ Implemented | For displaying testimonial cards |
| CallToAction | ✅ Implemented | With title, description, and action buttons |
| FAQ | ✅ Implemented | Using Accordion component |
| SearchAndFilter | ✅ Implemented | With search input and filter dropdowns |
| ComparisonTable | ✅ Implemented | For comparing features across items |

## Base Components

### Typography Components

#### Heading

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const baseStyles = "font-bold leading-tight tracking-tight text-foreground"
  const sizeStyles = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  }

  switch (level) {
    case 1:
      return <h1 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h1>
    case 2:
      return <h2 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h2>
    case 3:
      return <h3 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h3>
    case 4:
      return <h4 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h4>
    case 5:
      return <h5 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h5>
    case 6:
      return <h6 className={cn(baseStyles, sizeStyles[level], className)}>{children}</h6>
    default:
      return <h1 className={cn(baseStyles, sizeStyles[1], className)}>{children}</h1>
  }
}
```

**Usage:**

```tsx
<Heading level={1}>Study in Germany</Heading>
<Heading level={2} className="text-primary">University Programs</Heading>
```

#### Paragraph

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ParagraphProps {
  children: React.ReactNode
  size?: "sm" | "base" | "lg"
  className?: string
}

export function Paragraph({
  children,
  size = "base",
  className,
}: ParagraphProps) {
  const sizeStyles = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed",
  }

  return <p className={cn(sizeStyles[size], className)}>{children}</p>
}
```

**Usage:**

```tsx
<Paragraph>Our services help students achieve their dreams of studying abroad.</Paragraph>
<Paragraph size="lg" className="font-medium">Featured program highlights.</Paragraph>
```

### Container Components

#### Section

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: "default" | "muted" | "primary"
}

export function Section({
  children,
  className,
  id,
  background = "default",
}: SectionProps) {
  const backgroundStyles = {
    default: "bg-background",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
  }

  return (
    <section
      id={id}
      className={cn("py-12 md:py-16", backgroundStyles[background], className)}
    >
      {children}
    </section>
  )
}
```

**Usage:**

```tsx
<Section background="muted">
  <Container>
    <Heading level={2}>Our Services</Heading>
    {/* Content */}
  </Container>
</Section>
```

#### Container

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "default" | "lg"
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-3xl",
    default: "max-w-5xl",
    lg: "max-w-7xl",
  }

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  )
}
```

#### Grid

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
}

export function Grid({ children, className, cols = 3, gap = "md" }: GridProps) {
  const colsStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  const gapStyles = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  return (
    <div className={cn("grid", colsStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  )
}
```

## Composite Components

### Hero

```tsx
import { ReactNode } from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroProps {
  title: string
  description?: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  image?: ReactNode
  background?: "default" | "muted" | "primary"
  align?: "left" | "center"
}

export function Hero({
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  background = "default",
  align = "center"
}: HeroProps) {
  return (
    <Section background={background}>
      <Container>
        <div className={`flex flex-col ${image ? "lg:flex-row" : ""} gap-10 items-center`}>
          <div className={`flex-1 ${align === "center" && !image ? "text-center mx-auto max-w-3xl" : ""}`}>
            <Heading level={1} className="mb-4 sm:mb-6">
              {title}
            </Heading>
            
            {description && (
              <p className="text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
                {description}
              </p>
            )}
            
            {(primaryAction || secondaryAction) && (
              <div className={`flex flex-wrap gap-4 ${align === "center" && !image ? "justify-center" : ""}`}>
                {primaryAction && (
                  <Button asChild size="lg">
                    <Link href={primaryAction.href}>
                      {primaryAction.text}
                    </Link>
                  </Button>
                )}
                
                {secondaryAction && (
                  <Button variant="outline" asChild size="lg">
                    <Link href={secondaryAction.href}>
                      {secondaryAction.text}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {image && (
            <div className="flex-1 w-full">
              {image}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
```

### Card Components

#### CountryCard

```tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CountryCardProps {
  country: {
    id: number
    name: string
    slug: string
    region: string
    description: string
    flagUrl?: string
    tags: string[]
  }
  variant?: "default" | "featured"
}

export function CountryCard({
  country,
  variant = "default",
}: CountryCardProps) {
  const { name, slug, description, flagUrl, tags } = country

  return (
    <Card className={`overflow-hidden hover-lift ${variant === "featured" ? "border-primary/50" : ""}`}>
      {flagUrl ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={flagUrl}
            alt={`${name} flag`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-muted flex items-center justify-center">
          <span className="text-4xl">{name.charAt(0)}</span>
        </div>
      )}

      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-muted text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button variant="outline" asChild className="w-full">
          <Link href={`/destinations/${slug}`}>
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

#### JobCard

```tsx
import Link from "next/link"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    type: string
    hours: string
    posted: string
    description: string
    skills: string[]
  }
}

export function JobCard({ job }: JobCardProps) {
  const { id, title, company, location, type, hours, posted, description, skills } = job

  return (
    <Card className="overflow-hidden hover-lift">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <Badge>{type}</Badge>
        </div>
        
        <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Posted {posted}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{company} • {location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{hours}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        {skills.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-auto">
          <Button variant="outline" asChild className="w-full">
            <Link href={`/jobs/${id}`}>
              View Job
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

## Components To Be Implemented

Based on our current implementation status, the following components still need to be created:

1. **Typography Components**:
   - List component
   - Blockquote component

2. **UI Elements**:
   - Checkbox/Radio components

3. **Interactive Tools**:
   - CountrySelectorTool (for destination comparison)
   - CostCalculator (for estimating study abroad expenses)
   - ScholarshipFinder (for finding relevant scholarships)

## Component Best Practices

### Accessibility

- All components should meet WCAG 2.1 AA standards
- Interactive elements must be keyboard accessible
- Use `aria-*` attributes appropriately
- Maintain sufficient color contrast
- Ensure form elements have associated labels
- Implement focus management in interactive components

### Responsive Guidelines

1. Use mobile-first design approach
2. Test all components at the following breakpoints:
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px
3. Ensure touch targets are at least 44px × 44px on mobile
4. Test tap and swipe interactions on touch devices

### Performance Considerations

1. Lazy load images and other heavy content
2. Implement proper code splitting for large components
3. Use skeleton loaders for async content
4. Minimize re-renders with memoization techniques
5. Avoid layout shifts during loading (set explicit dimensions)

### State Management Patterns

1. Use React hooks for local component state
2. Keep state as close to its usage as possible
3. Implement context providers for shared state
4. Leverage React Query for data fetching

## Implementation Checklist

For each component, ensure:

- [ ] Component follows mobile-first approach
- [ ] Dark mode implementation is correct
- [ ] CSS variables are used for theming
- [ ] Responsive behavior is tested
- [ ] Accessibility features are implemented
- [ ] Component is properly typed with TypeScript
- [ ] Props API is documented
- [ ] Usage examples are provided

## Extending the Component Library

When creating new components:

1. Follow the existing naming conventions
2. Maintain the same file structure
3. Reuse existing base components when possible
4. Ensure dark mode compatibility
5. Add the component to this documentation
6. Include implementation status

## Questions for Design Refinement

- Which components should be prioritized for the MVP?
- Are there specific animations or interactions required for key components?
- Should we implement component variants beyond those already specified?
- Are there additional accessibility requirements beyond WCAG AA?
- For interactive tools, what level of complexity is appropriate for the MVP?

### List

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ListProps {
  children: React.ReactNode
  className?: string
  type?: "unordered" | "ordered"
  variant?: "default" | "spaced"
  icon?: React.ReactNode
}

interface ListItemProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(({ children, className, type = "unordered", variant = "default", icon }, ref) => {
  const baseStyles = "text-foreground"
  const variantStyles = {
    default: "space-y-1",
    spaced: "space-y-3",
  }

  if (type === "ordered") {
    return (
      <ol
        ref={ref as React.ForwardedRef<HTMLOListElement>}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {children}
      </ol>
    )
  }

  return (
    <ul
      ref={ref as React.ForwardedRef<HTMLUListElement>}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ListItem) {
          return React.cloneElement(child, {
            icon: child.props.icon || icon,
          } as ListItemProps)
        }
        return child
      })}
    </ul>
  )
})

List.displayName = "List"

const ListItem = React.forwardRef<
  HTMLLIElement,
  ListItemProps
>(({ children, className, icon }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("flex items-start", className)}
    >
      {icon && (
        <span className="mr-2 mt-0.5 text-primary">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </li>
  )
})

ListItem.displayName = "ListItem"

export { List, ListItem }
```

**Usage:**

```tsx
import { List, ListItem } from "@/components/ui/list"
import { Check } from "lucide-react"

// Unordered list with icons
<List icon={<Check size={16} />}>
  <ListItem>First item in the list</ListItem>
  <ListItem>Second item in the list</ListItem>
  <ListItem icon={<Star size={16} />}>Item with custom icon</ListItem>
</List>

// Ordered list
<List type="ordered" variant="spaced">
  <ListItem>First step in the process</ListItem>
  <ListItem>Second step in the process</ListItem>
  <ListItem>Final step in the process</ListItem>
</List>
```

### Blockquote

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface BlockquoteProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "accent"
  cite?: string
  author?: string
}

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  BlockquoteProps
>(({ children, className, variant = "default", cite, author }, ref) => {
  const variantStyles = {
    default: "border-l-4 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800",
    primary: "border-l-4 border-blue-primary bg-blue-light dark:bg-blue-dark/20",
    accent: "border-l-4 border-accent-purple bg-gray-100 dark:bg-gray-800",
  }

  return (
    <figure className={cn("my-6", className)}>
      <blockquote
        ref={ref}
        cite={cite}
        className={cn(
          "p-4 italic text-gray-700 dark:text-gray-300",
          variantStyles[variant]
        )}
      >
        <div className="relative">
          <svg
            className="absolute -top-2 -left-2 h-8 w-8 text-gray-300 dark:text-gray-700 opacity-50"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <div className="relative z-10 pl-6">
            {children}
          </div>
        </div>
      </blockquote>
      {author && (
        <figcaption className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
          — {author}
        </figcaption>
      )}
    </figure>
  )
})

Blockquote.displayName = "Blockquote"

export { Blockquote }
```

**Usage:**

```tsx
import { Blockquote } from "@/components/ui/blockquote"

// Default blockquote
<Blockquote>
  Education is the passport to the future, for tomorrow belongs to those who prepare for it today.
</Blockquote>

// Blockquote with author
<Blockquote 
  variant="primary" 
  author="Albert Einstein"
>
  Education is not the learning of facts, but the training of the mind to think.
</Blockquote>

// Blockquote with citation
<Blockquote 
  variant="accent" 
  author="Nelson Mandela"
  cite="https://example.com/quotes"
>
  Education is the most powerful weapon which you can use to change the world.
</Blockquote>
```
