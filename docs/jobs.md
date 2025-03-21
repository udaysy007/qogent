# Qogent Job Portal Implementation Plan

## Overview
The job portal will serve as Qogent's central hub for career opportunities, featuring an intuitive interface for job listings and applications. The implementation will utilize Tally forms for applications while maintaining Qogent's modern design principles.

## Database Structure
```sql
Table "public.jobs"
Column           Type                     Nullable  Default
----------------+--------------------------+---------+----------------
id               uuid                      not null  uuid_generate_v4()
title            text                      not null  
department       text                      not null  
location         text                      not null  
type             text                      not null  
description      text                      not null  
responsibilities text[]                             '{}'::text[]
requirements     text[]                             '{}'::text[]
benefits         text[]                             '{}'::text[]
posted_date      timestamp with time zone          now()
application_url  text                              
is_active        boolean                           true
created_at       timestamp with time zone          now()
updated_at       timestamp with time zone          now()
```

## 1. Page Structure (/jobs)

### Hero Section
- Engaging headline about joining Qogent
- Brief compelling copy about company culture and mission
- Background image featuring the team or office environment

### Current Openings Section
- **Filter/Search functionality**
  - By department
  - By location
  - By job type (Full-time, Part-time, Contract)
- **Job Cards Grid/List**
  - Job title
  - Department
  - Location
  - Type
  - Posted date
  - Apply button

### Individual Job View
- Job title and meta information
- Description
- Responsibilities (bullet points)
- Requirements (bullet points)
- Benefits (bullet points)
- Tally form embed for application
- Share job functionality

## 2. Technical Implementation Plan

### Component Structure
```
app/
├── jobs/
│   ├── page.tsx           # Main jobs listing page
│   └── [id]/
│       └── page.tsx       # Individual job detail page
└── components/
    └── jobs/
        ├── JobCard.tsx
        ├── JobFilters.tsx
        ├── JobList.tsx
        └── JobDetail.tsx
```

### Data Layer
- TypeScript interfaces for Job type
- Server-side data fetching using Supabase client
- Sorting and filtering functionality

### UI/UX Implementation
- Mobile-first design
- Dark mode first approach
- CSS variables from style guide
- Smooth transitions and loading states
- Responsive grid/list layout

### SEO & Performance
- Metadata implementation
- Structured data for job postings
- Image optimization
- Social sharing meta tags

## 3. Implementation Phases

### Phase 1 (MVP)
- [ ] Basic job listing page
- [ ] Individual job detail pages
- [ ] Tally form integration
- [ ] Basic filters

### Phase 2
- [ ] Advanced filtering and search
- [ ] Job alerts subscription
- [ ] Social sharing
- [ ] Related jobs suggestions

## 4. Design Philosophy
- Adherence to Qogent's brand guidelines
- Consistent color palette and typography
- Focus on readability and accessibility
- Proper spacing and hierarchy
- Dark mode optimization

## 5. Mobile Considerations
- Collapsible filters
- Touch-friendly interface
- Simplified layouts
- Optimized tap targets

## 6. Performance Goals
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

## 7. Testing Strategy
- Cross-browser compatibility
- Responsive design verification
- Performance monitoring
- Accessibility compliance

## 8. Future Enhancements
- Application tracking system
- Email notifications
- Analytics dashboard
- Candidate relationship management

## Notes
- All implementations should follow mobile-first, darkmode-first design philosophy
- Use CSS variables instead of hardcoded colors
- Maintain consistent branding across all components
- Ensure accessibility compliance
- Regular performance monitoring and optimization 