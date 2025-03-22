# Qogent Website Design Guide

## Introduction

This document outlines the design approach for Qogent.in, serving as the definitive visual guide for creating a colorful, cheerful, and professional website that democratizes access to international education. Our design prioritizes clarity, engagement, and accessibility while maintaining a consistent brand identity across all pages.

## Design Philosophy

### Core Principles

1. **Mobile-first, darkmode-first**: Design begins with mobile layouts in dark mode, then scales to larger screens and light mode.
2. **Conversational and friendly**: Visual elements complement the warm, personal tone of our written content.
3. **Engaging interactivity**: Strategic animations and interactions that guide users without overwhelming them.
4. **Accessibility-focused**: High contrast, readable typography, and intuitive navigation for all users.
5. **Authentic and personal**: Real imagery and relatable content that feels like advice from a friend.

### Color Palette

Our color system leverages the existing CSS variables defined in globals.css, following the HSL format:

**Dark Mode (Primary)**
- `--background`: Deep navy blue (222.2 84% 4.9%)
- `--foreground`: Soft white (210 40% 98%)
- `--primary`: Light blue/white (210 40% 98%)
- `--primary-foreground`: Dark navy (222.2 47.4% 11.2%)
- `--secondary`: Dark blue-gray (217.2 32.6% 17.5%)
- `--secondary-foreground`: Light blue/white (210 40% 98%)
- `--accent`: Dark blue-gray (217.2 32.6% 17.5%)
- `--accent-foreground`: Light blue/white (210 40% 98%)
- `--muted`: Dark blue-gray (217.2 32.6% 17.5%)
- `--muted-foreground`: Light gray (215 20.2% 65.1%)
- `--card`: Deep navy (222.2 84% 4.9%)
- `--card-foreground`: Light blue/white (210 40% 98%)
- `--destructive`: Dark red (0 62.8% 30.6%)
- `--destructive-foreground`: Light blue/white (210 40% 98%)

**Enhanced Chart Colors (Dark Mode)**
- `--chart-1`: Vibrant blue (220 70% 50%)
- `--chart-2`: Teal (160 60% 45%)
- `--chart-3`: Warm orange (30 80% 55%)
- `--chart-4`: Purple (280 65% 60%)
- `--chart-5`: Pink (340 75% 55%)

**Light Mode**
- `--background`: White (0 0% 100%)
- `--foreground`: Deep navy (222.2 84% 4.9%)
- `--primary`: Deep navy (222.2 47.4% 11.2%)
- `--primary-foreground`: Light blue/white (210 40% 98%)
- `--secondary`: Light blue-gray (210 40% 96.1%)
- `--secondary-foreground`: Deep navy (222.2 47.4% 11.2%)
- `--accent`: Light blue-gray (210 40% 96.1%)
- `--accent-foreground`: Deep navy (222.2 47.4% 11.2%)
- `--muted`: Light blue-gray (210 40% 96.1%)
- `--muted-foreground`: Gray (215.4 16.3% 46.9%)
- `--card`: White (0 0% 100%)
- `--card-foreground`: Deep navy (222.2 84% 4.9%)
- `--destructive`: Bright red (0 84.2% 60.2%)
- `--destructive-foreground`: Light blue/white (210 40% 98%)

**Enhanced Chart Colors (Light Mode)**
- `--chart-1`: Salmon/red (12 76% 61%)
- `--chart-2`: Teal (173 58% 39%)
- `--chart-3`: Dark navy (197 37% 24%)
- `--chart-4`: Gold (43 74% 66%)
- `--chart-5`: Orange (27 87% 67%)

### Typography

- **Primary Font**: Inter font (already configured with variable: '--font-inter')
- **Heading Scale**:
  - H1: 2.25rem/2.5rem on mobile, 3rem/3.5rem on desktop
  - H2: 1.75rem/2rem on mobile, 2.25rem/2.75rem on desktop
  - H3: 1.5rem/1.75rem on mobile, 1.75rem/2rem on desktop
  - H4: 1.25rem/1.5rem on mobile, 1.5rem/1.75rem on desktop
- **Body Text**: 1rem/1.5rem, with larger 1.125rem/1.75rem for important paragraphs
- **Micro Copy**: 0.875rem for secondary information

### Component Usage

We'll leverage shadcn/ui components throughout, customizing them to match our brand:

- **Buttons**: Rounded with hover animations, primary (dark blue in light mode, white in dark mode), secondary (light blue-gray in light mode, dark blue-gray in dark mode)
- **Cards**: Using existing `.card-modern` class with subtle hover effects (hover-lift)
- **Forms**: Clean layouts with inline validation and helpful micro-interactions
- **Navigation**: Sticky header with smooth mobile menu transitions
- **Animations**: Leveraging our existing utility classes (animate-fade-in, animate-slide-up, animate-pulse-subtle)

## Page-by-Page Design Guidelines

### 1. Homepage

The homepage serves as an engaging introduction to Qogent and international education opportunities.

#### Hero Section
- **Layout**: Full-width, asymmetrical design with overlapping elements
- **Components**:
  - Animated headline with typewriter effect for "Your Gateway to Global Education"
  - Floating "education elements" (graduation caps, books, globes) that subtly animate
  - Primary button with gradient: "Find Your Perfect Country"
  - Secondary button: "Explore Destinations"
  - Background with subtle grid-primary pattern or gradient-radial

#### Stats & Highlights
- **Layout**: Three-column grid on desktop, stacked on mobile
- **Components**:
  - Animated counter cards showing key statistics (88% success rate, 2000+ students, etc.) using neumorphic-light/dark classes
  - Each card features a custom illustration utilizing chart colors
  - Hover state reveals additional context in a conversational tone (hover-lift class)
  - Progress circles or bars for visual impact using chart color variables

#### Featured Destinations
- **Layout**: Horizontal scrolling carousel on mobile, three-column grid on desktop
- **Components**:
  - Country cards with flag, name, and brief description using card-modern class
  - Custom illustration or photo background for each country
  - Hover reveals quick facts (tuition range, top fields of study)
  - Prominent "Learn More" CTAs that pulse subtly on hover (animate-pulse-subtle)

#### Student Success Stories
- **Layout**: Alternating text/image layout with staggered appearance (animate-slide-up)
- **Components**:
  - Real student photos with vibrant, colorful frames using chart color variables
  - Pull quotes in large, engaging typography
  - "Read More" links to detailed case studies
  - Video testimonial thumbnails with play button overlay

#### Blog Preview
- **Layout**: Featured post with image, followed by 2-3 card previews
- **Components**:
  - Category tags with custom accent colors from chart colors
  - Reading time indicators
  - Animated gradient underlines on hover
  - "View All Posts" CTA with arrow animation

#### Call-to-Action Section
- **Layout**: Full-width with background gradient using gradient-radial
- **Components**:
  - Conversational headline: "Not sure where to start? We've been there."
  - Prominent button to country selector tool
  - Floating illustration elements that subtly move on scroll
  - Secondary link to free consultation booking

### 2. About Us Page

The About Us page tells Qogent's story in an engaging, personal way.

#### Our Story Section
- **Layout**: Timeline-style narrative with alternating text/image blocks
- **Components**:
  - Interactive timeline with pulsing dots representing key milestones (animate-pulse-subtle)
  - Fade-in animations as user scrolls through the story (animate-fade-in)
  - Authentic photos of founders/early days with colorful borders using chart colors
  - Collapsible sections for deeper dives into specific parts of the journey

#### Mission & Values
- **Layout**: Card-based layout with icons
- **Components**:
  - Each value represented by a custom illustration and card with card-modern class
  - Hover effect reveals expanded explanation (hover-lift)
  - Pull quotes from founders in speech-bubble style elements
  - Background pattern using grid-primary

#### Team Showcase
- **Layout**: Grid of team cards with filter options
- **Components**:
  - Warm, candid team photos (not corporate headshots)
  - Playful hover effects that reveal fun facts about team members (hover-lift)
  - Role tags with custom colors based on chart colors
  - "Join Our Team" CTA leading to careers section

#### Data & Technology Section
- **Layout**: Split-screen with animated visuals
- **Components**:
  - Interactive data visualization showing success rates using chart colors
  - Illustration of Qogent's proprietary systems with tooltip explanations
  - Animated icons representing different technological capabilities
  - Testimonial carousel from students who benefited from our data-driven approach

#### Achievement Stats
- **Layout**: Horizontal scrolling counter cards on mobile, fixed grid on desktop
- **Components**:
  - Animated counter cards for key statistics with playful illustrations using neumorphic-light/dark
  - Progress bars or circular progress indicators with chart colors
  - "Success Stories" link with student testimonial preview
  - Micro-animations that celebrate achievements (animate-fade-in)

### 3. Destinations Overview

A vibrant showcase of study abroad destinations with engaging visuals and practical information.

#### Interactive World Map
- **Layout**: Centered map with clickable regions
- **Components**:
  - SVG world map with highlighted study destinations using chart colors
  - Hover effects that show country name and quick stats
  - Pulse animations drawing attention to featured countries (animate-pulse-subtle)
  - Filters for sorting by region, tuition costs, and program availability

#### Country Grid
- **Layout**: Masonry-style grid with varied card sizes for featured countries
- **Components**:
  - Country cards with flag, hero image, and key stats using card-modern class
  - Color-coded indicators for tuition ranges and entry difficulty using chart colors
  - Tag system for popular programs and specialties
  - Micro-interactions on hover showing additional context (hover-lift)

#### Comparison Tool
- **Layout**: Side-by-side layout with selection dropdowns
- **Components**:
  - Country selectors with flag icons
  - Animated radar charts comparing various factors (cost, quality, job prospects) using chart colors
  - Toggleable comparison categories
  - "Save Comparison" feature with shareable link

#### Featured Universities
- **Layout**: Horizontal scrolling cards grouped by country
- **Components**:
  - University cards with logo, hero image, and ranking using card-modern class
  - Program availability tags with chart colors
  - "Success Rate" indicators with tooltip explanations
  - Direct links to university-specific resources

#### Country-Specific CTAs
- **Layout**: Grid of banner CTAs at bottom of page
- **Components**:
  - Eye-catching banners for each country site with neumorphic styling
  - "Explore [Country]" buttons with custom illustrations
  - Subtle hover animations that emphasize the CTA (hover-lift)
  - Brief success stats specific to each country

### 4. Services Page

Clearly presents Qogent's offerings with engaging visuals and practical examples.

#### Service Overview
- **Layout**: Hero section with animated service icons
- **Components**:
  - Animated illustrations representing different services
  - Brief service descriptions with "Learn More" toggles
  - Success rate statistics for each service category using chart colors
  - Video testimonial feature for each service

#### Admissions Guidance
- **Layout**: Process timeline with connected steps
- **Components**:
  - Interactive step cards that expand on click using card-modern class
  - Animated icons representing each phase of the process
  - "Success Tips" callouts with advice from previous students
  - Before/after examples of application components (e.g., SOP improvement)

#### Visa Support
- **Layout**: Country-grouped accordion sections
- **Components**:
  - Country flags with expandable visa requirement sections
  - Checklists with interactive completion tracking
  - Document example previews with explanation tooltips
  - Common pitfalls section with animated warning indicators

#### Test Preparation
- **Layout**: Tab interface for different standardized tests
- **Components**:
  - Test score improvement charts with animated progress using chart colors
  - Sample question cards with flip animation to reveal answers
  - Study plan generators with interactive calendars
  - Success stories specific to test preparation

#### Pricing & Packages
- **Layout**: Comparative card layout with highlighted recommendations
- **Components**:
  - Feature comparison table with animated checkmarks
  - Sliding price calculator based on service selection
  - Special offer banners with countdown timers
  - "Package Builder" with drag-and-drop interface

### 5. Tools Section

Interactive tools that provide value while showcasing Qogent's expertise.

#### "Which Country is Right for You?" Tool
- **Layout**: Multi-step form with progress indicator
- **Components**:
  - Animated transitions between questions (animate-fade-in)
  - Interactive sliders for preference selection
  - Real-time feedback elements as answers are provided
  - Engaging loading animation for results calculation
  - Results page with:
    - Radial match chart for top 3 countries using chart colors
    - Expandable reasons for each recommendation
    - Program suggestion cards with direct links using card-modern class
    - Option to save/share results or contact advisor

#### Budget Calculator
- **Layout**: Split view with inputs and real-time visualization
- **Components**:
  - Currency selector with flag icons
  - Animated pie chart breaking down expenses using chart colors
  - Comparison toggles for different countries/cities
  - Scholarship opportunity alerts based on profile

#### Application Timeline Generator
- **Layout**: Interactive calendar view with customizable deadlines
- **Components**:
  - Drag-and-drop deadline markers
  - Color-coded task categories using chart colors
  - Export options (calendar invites, PDF)
  - Reminder setup integration

#### Eligibility Checker
- **Layout**: Program-specific questionnaire with instant feedback
- **Components**:
  - University/program selector with search functionality
  - Progressive disclosure of requirements based on selections
  - Real-time eligibility indicators using chart colors
  - Alternative suggestion engine for near-miss scenarios

### 6. Jobs Portal

A modern job board focused on international student opportunities.

#### Job Search Interface
- **Layout**: Search/filter sidebar with main results area
- **Components**:
  - Animated filter toggles with count indicators
  - Job cards with company logos and key details using card-modern class
  - Save/favorite functionality with heart animation
  - Location maps with university proximity indicators

#### Featured Employers
- **Layout**: Carousel of employer profiles
- **Components**:
  - Company cards with logo, brief profile, and job count using card-modern class
  - Industry badges with chart colors
  - Student success stories at featured companies
  - "Now Hiring" indicators with subtle animations (animate-pulse-subtle)

#### Job Detail View
- **Layout**: Sticky header with main content scroll
- **Components**:
  - Requirement checklist with visual eligibility indicators using chart colors
  - "Apply Now" button with confetti animation on submit
  - Similar job suggestions in card carousel
  - Company profile snapshot with expandable details

#### Student Career Resources
- **Layout**: Topic-filtered resource grid
- **Components**:
  - Resource cards with estimated reading/viewing time using card-modern class
  - Resume template previews with hover zoom (hover-lift)
  - Interview preparation checklists
  - Success story spotlights with before/after career paths

### 7. Blog Section

A vibrant content hub with personality and practical value.

#### Blog Homepage
- **Layout**: Featured post hero with category grid below
- **Components**:
  - Category cards with custom illustrations and post counts using chart colors
  - Recent post timeline with publication dates
  - Author spotlights with casual photos and bio snippets
  - Reading list creator with save/share functionality

#### Article Layout
- **Layout**: Clean reading experience with sidebar navigation
- **Components**:
  - Progress bar showing reading position
  - Animated pull quotes that stand out from the text
  - Interactive elements (expandable tips, calculators)
  - Highlight/comment functionality for registered users
  - Author card with casual, friendly photo and "ask me" button

#### Topic Hubs
- **Layout**: Topic overview with curated content collections
- **Components**:
  - Visual table of contents with thumbnail previews
  - Expert contributor cards with credentials using card-modern class
  - Related resource downloads with preview thumbnails
  - Question submission form with animated submit button

#### Resource Library
- **Layout**: Filterable card grid with search functionality
- **Components**:
  - Resource cards with format indicators (PDF, video, etc.) using card-modern class
  - Download/save buttons with micro-animations
  - Usage statistics showing popularity
  - Contributor attribution with profile links

### 8. Contact & Support

An inviting, accessible way to reach the Qogent team.

#### Contact Landing
- **Layout**: Split view with form and contact methods
- **Components**:
  - Illustrated contact form with friendly helper text
  - Animated input fields that respond to focus
  - Contact method cards with playful icons using card-modern class
  - Location map with animated office markers

#### Support Center
- **Layout**: Search-focused with category grid below
- **Components**:
  - Prominent search bar with predictive suggestions
  - FAQ accordion with smooth expand/collapse
  - Category cards with custom illustrations using chart colors
  - "Still need help?" floating button with chat option

#### Consultation Booking
- **Layout**: Calendar interface with advisor profiles
- **Components**:
  - Interactive calendar with availability highlighting using chart colors
  - Advisor cards with casual photos and expertise areas using card-modern class
  - Session type selector with duration and focus options
  - Confirmation animations with helpful next steps (animate-fade-in)

#### Feedback System
- **Layout**: Multi-channel feedback collection
- **Components**:
  - Emoji reaction system for quick feedback
  - Expandable comment form with topic categorization
  - "How we've improved" section showing changes from feedback
  - Recognition system for valuable contributor feedback

### 9. Footer Components

A comprehensive but organized footer with clear pathways to important resources.

#### Main Footer
- **Layout**: Responsive multi-column grid
- **Components**:
  - Animated logo with tagline
  - Quick links organized by user journey phase
  - Newsletter signup with success animation
  - Social media links with custom branded icons
  - Language/region selector with flag icons

#### Careers Section
- **Layout**: Eye-catching banner with preview grid
- **Components**:
  - "Life at Qogent" image gallery with hover captions
  - Current opening cards with department color-coding using chart colors
  - Team values icons with expanding descriptions
  - "Apply Now" CTA with confetti animation on click

#### Legal Information
- **Layout**: Expandable accordion to save space
- **Components**:
  - Clean, readable legal text with section highlighting
  - Cookie preference center with toggle switches
  - Terms acceptance with animated checkboxes
  - Last updated timestamps with changelog links

## Animation Guidelines

### General Principles
- Subtle, purpose-driven animations that enhance rather than distract
- Performance-optimized with consideration for devices and accessibility
- Consistent timing functions across similar interactions
- Leveraging existing animation classes: animate-fade-in, animate-slide-up, animate-pulse-subtle

### Key Animation Types
1. **Micro-interactions**: 0.2-0.3s subtle feedback on user actions
2. **Transitions**: 0.4-0.6s smooth movement between states or pages
3. **Attention-guiding**: Subtle pulses or highlights directing user focus
4. **Celebratory**: More expressive animations for achievements or completions

### Implementation
- Use CSS transitions for simple state changes
- Leverage Framer Motion for more complex animations
- Respect reduced-motion preferences
- Consider performance implications, especially on mobile

## Responsive Behavior

### Breakpoints
- **Mobile**: <640px (primary design starting point)
- **Tablet**: 640px-1024px
- **Desktop**: >1024px
- **Large Desktop**: >1280px

### Adaptation Principles
- Content priority shifts rather than simple scaling
- Interactive elements maintain adequate touch targets (touch-target class)
- Typography scales appropriately for readability
- Grid layouts adjust from single column to multi-column
- Navigation transforms from hamburger menu to horizontal nav

## Implementation Notes

### Component Creation
- Build from existing shadcn/ui components where possible
- Create custom components only when necessary for unique interactions
- Document any custom components thoroughly
- Leverage existing utility classes (container, touch-target, neumorphic-light/dark, card-modern)

### Performance Considerations
- Optimize images with modern formats (WebP, AVIF)
- Lazy-load off-screen content
- Consider component code-splitting for page speed
- Prioritize Core Web Vitals metrics in implementation

### Accessibility
- Maintain WCAG 2.1 AA compliance
- Test with screen readers and keyboard navigation
- Ensure sufficient color contrast (minimum 4.5:1 for text)
- Provide text alternatives for non-text content
- Ensure all interactive elements have focus states

## Page-Specific Component Inventory

For each main page, the following lists the specific shadcn/ui and custom components needed:

### Homepage Components
- `HeroSection`: Custom component with animation
- `Button`: shadcn/ui with custom styling
- `StatCard`: Custom component with counter animation
- `CountryCard`: Custom component with hover effects
- `Carousel`: Custom component for testimonials
- `Tabs`: shadcn/ui for content organization
- `Card`: shadcn/ui with custom styling

### About Us Components
- `Timeline`: Custom interactive component
- `ValueCard`: Custom component with hover expansion
- `TeamMemberCard`: Custom component with fun facts
- `AnimatedCounter`: Custom component for statistics
- `Accordion`: shadcn/ui for expandable content
- `Tabs`: shadcn/ui for sectioning content

### Destinations Components
- `InteractiveMap`: Custom SVG-based component
- `CountryComparisonTool`: Custom multi-select component
- `FilterGroup`: shadcn/ui checkbox and radio groups
- `UniversityCard`: Custom component with stats
- `RatingIndicator`: Custom component with tooltips
- `Tabs`: shadcn/ui for region filtering

### Services Components
- `ServiceCard`: Custom component with expansion
- `ProcessTimeline`: Custom interactive component
- `PricingTable`: Custom component with comparison
- `TestimonialVideo`: Custom video player component
- `Accordion`: shadcn/ui for expandable details
- `Tabs`: shadcn/ui for service categorization

### Tools Components
- `StepForm`: Custom multi-stage component
- `ResultsVisualizer`: Custom data visualization component
- `InteractiveSlider`: Custom preference selector
- `CountryMatch`: Custom recommendation component
- `Form`: shadcn/ui form elements
- `Dialog`: shadcn/ui for additional information

### Jobs Portal Components
- `JobSearchFilter`: Custom filter component
- `JobCard`: Custom component with save functionality
- `CompanyProfile`: Custom expandable component
- `LocationMap`: Custom map integration component
- `Select`: shadcn/ui dropdown elements
- `Checkbox`: shadcn/ui for filter options

### Blog Components
- `ArticleCard`: Custom card with reading indicators
- `AuthorBio`: Custom component with social links
- `CategoryGrid`: Custom filter/category system
- `ProgressBar`: Custom reading progress component
- `Tabs`: shadcn/ui for content categorization
- `Search`: shadcn/ui for content search

### Contact & Support Components
- `ContactForm`: Custom form with validation
- `BookingCalendar`: Custom date/time selector
- `SupportCategoryCard`: Custom help category cards
- `ChatInitiator`: Custom support chat component
- `Form`: shadcn/ui form elements
- `Dialog`: shadcn/ui for confirmation messages

## Conclusion

This design system provides a comprehensive framework for creating a visually engaging, user-friendly website that reflects Qogent's mission of democratizing access to international education. By following these guidelines, we'll create a consistent yet distinctive experience across all pages while maintaining the conversational, friendly tone that defines the Qogent brand.

Each page is designed not just to inform but to engage and inspire action, guiding prospective students through their international education journey with clarity and enthusiasm. The design balances professionalism with approachability, creating a digital experience that feels like getting advice from a knowledgeable friend who's been through the process themselves. 