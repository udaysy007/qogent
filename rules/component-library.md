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
    └── Icons

Composite Components
├── Layout
│   ├── Header
│   ├── Footer
│   ├── Sidebar
│   └── MainContent
├── Navigation
│   ├── NavBar
│   ├── MobileMenu
│   └── Breadcrumbs
├── Cards
│   ├── CountryCard
│   ├── UniversityCard
│   ├── ProgramCard
│   └── TestimonialCard
└── Interactive Elements
    ├── CountrySelector
    ├── FilterPanel
    ├── SearchBar
    └── Comparison Tool
```

## Base Components

### Typography Components

#### Heading

```tsx
import { cn } from '@/lib/utils'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements

  const baseStyles = 'font-bold leading-tight tracking-tight text-foreground'
  const sizeStyles = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  }

  return (
    <Component className={cn(baseStyles, sizeStyles[level], className)}>
      {children}
    </Component>
  )
}
```

**Usage:**

```tsx
<Heading level={1}>Study in Germany</Heading>
<Heading level={2} className="text-primary">University Programs</Heading>
```

#### Paragraph

```tsx
import { cn } from '@/lib/utils'

interface ParagraphProps {
  children: React.ReactNode
  size?: 'sm' | 'base' | 'lg'
  className?: string
}

export function Paragraph({
  children,
  size = 'base',
  className,
}: ParagraphProps) {
  const sizeStyles = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
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
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'muted' | 'accent'
}

export function Section({
  children,
  className,
  id,
  background = 'default',
}: SectionProps) {
  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    accent: 'bg-accent/10',
  }

  return (
    <section
      id={id}
      className={cn('py-12 md:py-16', backgroundStyles[background], className)}
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
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export function Container({
  children,
  className,
  size = 'default',
}: ContainerProps) {
  const sizeStyles = {
    sm: 'max-w-3xl',
    default: 'max-w-5xl',
    lg: 'max-w-7xl',
  }

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  )
}
```

**Usage:**

```tsx
<Container>
  {/* Content with standard width */}
</Container>

<Container size="lg">
  {/* Wider content */}
</Container>
```

#### Grid

```tsx
import { cn } from '@/lib/utils'

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

export function Grid({ children, className, cols = 3, gap = 'md' }: GridProps) {
  const colsStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  return (
    <div className={cn('grid', colsStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  )
}
```

**Usage:**

```tsx
<Grid cols={3} gap="lg">
  <CountryCard country={germany} />
  <CountryCard country={canada} />
  <CountryCard country={usa} />
</Grid>
```

## Layout Components

### Header

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'Germany', href: '/destinations/germany' },
      { label: 'Canada', href: '/destinations/canada' },
      { label: 'USA', href: '/destinations/usa' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Tools', href: '/tools' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">Qogent</span>
          </Link>

          <nav className="hidden space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />

          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>

          <Button className="hidden md:inline-flex" asChild>
            <Link href="/tools/country-selector">Find Your Country</Link>
          </Button>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
```

### Footer

```tsx
import Link from 'next/link'
import { Container } from '@/components/container'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold">
              Qogent
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Democratizing access to international education through
              merit-based admissions guidance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Destinations</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/destinations/germany"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Germany
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/canada"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Canada
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/usa"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  USA
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/tools/country-selector"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Country Selector
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Job Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center border-t py-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Qogent. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            {/* Social media links */}
          </div>
        </div>
      </Container>
    </footer>
  )
}
```

## Card Components

### CountryCard

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CountryCardProps {
  country: {
    id: number
    name: string
    code: string
    flagUrl: string
    description: string
  }
  variant?: 'default' | 'featured'
}

export function CountryCard({
  country,
  variant = 'default',
}: CountryCardProps) {
  const { name, flagUrl, description } = country

  return (
    <Card className={variant === 'featured' ? 'border-primary/50' : ''}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={flagUrl}
            alt={`${name} flag`}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="mt-2 line-clamp-3 text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/destinations/${name.toLowerCase()}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

**Usage:**

```tsx
<CountryCard country={germany} variant="featured" />
```

### UniversityCard

```tsx
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UniversityCardProps {
  university: {
    id: number
    name: string
    countryId: number
    website: string
    isPublic: boolean
    ranking?: number
    description: string
  }
  country: {
    name: string
    code: string
  }
}

export function UniversityCard({ university, country }: UniversityCardProps) {
  const { name, website, isPublic, ranking, description } = university

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{name}</h3>
          {isPublic ? (
            <Badge variant="outline">Public</Badge>
          ) : (
            <Badge variant="outline">Private</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{country.name}</span>
          {ranking && (
            <>
              <span>•</span>
              <span>Ranking: #{ranking}</span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between">
          <Link
            href={`/destinations/${country.name.toLowerCase()}/universities/${university.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>

          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            Website <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
```

### CareerCard

```tsx
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CareerCardProps {
  career: {
    id: number
    title: string
    department: string
    location: string
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
    description: string
    postedDate: string
    applicationUrl: string
  }
}

export function CareerCard({ career }: CareerCardProps) {
  const {
    title,
    department,
    location,
    type,
    description,
    postedDate,
    applicationUrl,
  } = career

  // Format the date
  const formattedDate = new Date(postedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <Badge variant="outline">{type}</Badge>
        </div>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <BriefcaseIcon className="mr-2 h-4 w-4" />
            <span>{department}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Posted: {formattedDate}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="line-clamp-4 text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="border-t pt-6">
        <div className="w-full">
          <Button className="w-full" asChild>
            <Link href={applicationUrl}>Apply Now</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
```

**Usage:**

```tsx
<CareerCard career={fullStackDeveloperJob} />
```

## Interactive Components

### CountrySelectorTool

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CountryCard } from '@/components/country-card'

// Example criteria and options
const criteria = [
  {
    id: 'budget',
    label: "What's your budget for tuition and living expenses?",
    options: [
      { value: 'low', label: 'Low (Under $10,000/year)' },
      { value: 'medium', label: 'Medium ($10,000 - $30,000/year)' },
      { value: 'high', label: 'High (Over $30,000/year)' },
    ],
  },
  {
    id: 'language',
    label: 'Which language are you comfortable studying in?',
    options: [
      { value: 'english', label: 'English only' },
      { value: 'german', label: 'German or willing to learn' },
      { value: 'any', label: 'Any language (willing to learn)' },
    ],
  },
  {
    id: 'workOpportunities',
    label: 'How important are work opportunities during/after study?',
    options: [
      {
        value: 'essential',
        label: 'Essential - I need to work while studying',
      },
      { value: 'important', label: 'Important for after graduation' },
      { value: 'notImportant', label: 'Not a priority' },
    ],
  },
]

// Simplified recommendation logic (would be more complex in reality)
const getRecommendations = (selections) => {
  // This is a simplified example
  const countries = [
    {
      id: 1,
      name: 'Germany',
      code: 'DE',
      flagUrl: '/images/flags/germany.svg',
      description:
        'Recommended for its tuition-free public universities and growing English-taught programs.',
      match: 95,
    },
    {
      id: 2,
      name: 'Canada',
      code: 'CA',
      flagUrl: '/images/flags/canada.svg',
      description:
        'Excellent work opportunities during and after study with a clear path to immigration.',
      match: 85,
    },
    {
      id: 3,
      name: 'USA',
      code: 'US',
      flagUrl: '/images/flags/usa.svg',
      description:
        'World-class universities with numerous scholarship opportunities for international students.',
      match: 75,
    },
  ]

  // Sort by match percentage (in a real implementation, this would use the selections)
  return countries.sort((a, b) => b.match - a.match)
}

export function CountrySelectorTool() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState({})
  const [recommendations, setRecommendations] = useState(null)

  const handleNext = () => {
    if (currentStep < criteria.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate recommendations
      const results = getRecommendations(selections)
      setRecommendations(results)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  const handleReset = () => {
    setSelections({})
    setRecommendations(null)
    setCurrentStep(0)
  }

  const handleSelect = (value) => {
    setSelections({
      ...selections,
      [criteria[currentStep].id]: value,
    })
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Which Country is Right for You?</CardTitle>
        <CardDescription>
          Answer a few questions to find your ideal study destination
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!recommendations ? (
          // Questions
          <div className="space-y-6">
            <h3 className="text-lg font-medium">
              {criteria[currentStep].label}
            </h3>

            <RadioGroup
              value={selections[criteria[currentStep].id]}
              onValueChange={handleSelect}
            >
              <div className="space-y-3">
                {criteria[currentStep].options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 rounded-md border p-3"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {criteria.length}
              </span>

              <Button
                onClick={handleNext}
                disabled={!selections[criteria[currentStep].id]}
              >
                {currentStep < criteria.length - 1 ? 'Next' : 'See Results'}
              </Button>
            </div>
          </div>
        ) : (
          // Results
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="mb-1 text-lg font-medium">
                Your Top Destinations
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your preferences, these countries are the best fit:
              </p>
            </div>

            <div className="space-y-6">
              {recommendations.map((country, index) => (
                <div key={country.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <CountryCard country={country} />
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Match:</span>
                        <span className="text-sm font-medium">
                          {country.match}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${country.match}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {recommendations && (
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handleReset}>
            Start Over
          </Button>

          <Button asChild>
            <a href="/contact">Get Personalized Guidance</a>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
```

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
