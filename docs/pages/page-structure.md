# Qogent.in Page Structure

## Main Navigation Structure

### 1. Home (/)
- Hero section with search
- Featured destinations
- Success stories
- Latest blog posts
- Call to action

### 2. About Us (/about)
- Company overview
- Mission & Vision
- Team
- Testimonials
- Contact information

### 3. Destinations (/destinations)
- Overview page with all countries
- Individual country pages (/destinations/[country])
  - Country information
  - Universities list
  - Cost of living
  - Student visa requirements
  - Language requirements

### 4. Tools (/tools)
- Country Selector (/tools/country-selector)
- Cost Calculator (/tools/cost-calculator)
- Eligibility Checker (/tools/eligibility-checker)
- Visa Requirements Checker (/tools/visa-checker)

### 5. Blog (/blog)
- Blog listing page
- Individual blog posts (/blog/[slug])
- Categories (/blog/category/[category])

### 6. Contact (/contact)
- Contact form
- Office locations
- Support information

## Footer Links

### 1. Careers at Qogent
- Job listings for positions at Qogent
- Application information

### 2. Legal
- Privacy Policy (/privacy-policy)
- Terms of Service (/terms-of-service)
- Cookie Policy (/cookie-policy)

### 3. Support
- FAQ (/faq)
- Help Center (/help)

## Route Groups

```typescript
// app/(main) - Main site layout
- layout.tsx
- page.tsx (home)
- about/
- destinations/
- tools/
- blog/
- contact/

// app/(legal) - Legal pages layout
- layout.tsx
- privacy-policy/
- terms-of-service/
- cookie-policy/

// app/(support) - Support pages layout
- layout.tsx
- faq/
- help/

// app/(careers) - Careers at Qogent
- layout.tsx
- careers/
```

## Page Components Structure

Each page should follow this basic structure:

```typescript
// Example for a destination page
export default function DestinationPage() {
  return (
    <>
      {/* SEO */}
      <PageMeta />
      
      {/* Hero Section */}
      <PageHero />
      
      {/* Main Content */}
      <main>
        <ContentSection />
      </main>
      
      {/* Related Content */}
      <RelatedContent />
      
      {/* CTA Section */}
      <CallToAction />
    </>
  )
}
```

## Shared Components

Common components used across multiple pages:

```typescript
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── Sidebar.tsx
├── common/
│   ├── PageHero.tsx
│   ├── CallToAction.tsx
│   ├── SearchBar.tsx
│   └── Newsletter.tsx
├── cards/
│   ├── CountryCard.tsx
│   ├── UniversityCard.tsx
└── sections/
    ├── FeaturedDestinations.tsx
    ├── TestimonialSection.tsx
    └── BlogSection.tsx
```

## Loading and Error States

Each route should implement:
- Loading state (loading.tsx)
- Error handling (error.tsx)
- Not found state (not-found.tsx)

Example:
```typescript
// app/(main)/destinations/loading.tsx
export default function DestinationsLoading() {
  return <LoadingSkeleton />
}

// app/(main)/destinations/error.tsx
export default function DestinationsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return <ErrorDisplay error={error} reset={reset} />
}

// app/(main)/destinations/not-found.tsx
export default function DestinationsNotFound() {
  return <NotFoundDisplay />
}
```

## Mobile Navigation

Mobile navigation should include:
- Hamburger menu
- Collapsible sections
- Quick access to important tools
- Contact information

## Route Metadata

Each page should include proper metadata:

```typescript
export const metadata = {
  title: 'Page Title | Qogent',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title | Qogent',
    description: 'Page description for social sharing',
    images: ['/og-image.jpg'],
  },
}
``` 