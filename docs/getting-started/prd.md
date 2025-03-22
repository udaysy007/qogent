# Qogent.in – Comprehensive Product Requirements Document (PRD)

---

## 1. Overview

**Project Name:** Qogent.in

### Objective

Serve as **Qogent's** central digital hub, unifying the brand's global presence and offering an authoritative gateway for students exploring international education. This hub also supports features like specialized tools (e.g., country selection), and integrated links to country-specific sites.

### Key Goals

1. **Global Brand Positioning**: Present Qogent as the definitive global name in study abroad consulting.
2. **Unified Hub Experience**: Central website linking seamlessly to localized domains (e.g., studyingermany.app, studyincanada.app) while retaining consistent branding.
3. **Empowering Resources**: Provide admissions guidance, visa support, and tools to help students find the right country.
4. **Scalable Architecture**: Easily add new country sites, content modules, or expansions without reinventing core functionality.
5. **High-Impact SEO**: Optimize Qogent.in for both brand and general study abroad keywords, ensuring top-notch discoverability.

---

## 2. Target Audience

1. **Prospective International Students**: Those evaluating multiple study destinations or seeking in-depth guidance.
2. **Parents & Sponsors**: Concerned about costs, financing, safety, and overall viability of studying abroad.
3. **Academic & Corporate Partners**: Universities, organizations, or employers wanting to collaborate.
4. **Qogent Alumni & Community**: Former students, mentors, and potential ambassadors who contribute testimonials and resources.

---

## 3. Key Features & Requirements

### 3.1 Core Features

1. **Homepage**

   - **Hero Section**: Bold tagline (e.g., "Qogent: Your Gateway to Global Education") with concise brand pitch.
   - **Highlights & Stats**: Quick snapshots showcasing success stories (e.g., 88% success rate in German public universities, 100+ unique courses globally).
   - **Destination Quick Links**: Prominent buttons/cards linking to specific country `.app` sites.

2. **Destinations Overview**

   - **Interactive Map/Grid** of major study destinations (Germany, USA, Canada, etc.).
   - **Brief Summaries**: Key points (cost, top universities, scholarships) with a CTA linking to specialized country site.

3. **About Us**

   - **Our Story**: Qogent's humble beginnings from a small blog to a leading study abroad platform.
   - **Mission & Vision**: "Democratize access to international education, focusing on merit-based admissions."
   - **Student-First Philosophy**: No university commissions; purely aligned with student preferences.
   - **Data & Technology**: "We use data analytics and a carefully designed approach to unlock the golden gates of global universities." Evolving proprietary systems that help maintain an impressively high success rate.
   - **Team & Culture**: Diverse group of educational consultants, tech wizards, and former international students, united to make education accessible for all.
   - **Fun Facts**: 88% success rate for German Public Universities, 2000+ students admitted to top global universities, expanding to 100+ unique programs.

4. **"Which Country is Right for You?" Tool**

   - **Interactive Questionnaire**: Collects academic background, budget, career goals.
   - **Real-Time Recommendations**: Suggests potential countries and programs aligned with the student's profile.
   - **Merit-Based Focus**: Leverages Qogent's admissions data to provide acceptance likelihood and scholarship insights.
   - **Call-to-Action**: Routes students to relevant country `.app` site or specialized blog posts.

5. **Blog/Resources**

   - **General Study Abroad Content**: Funding, standardized tests, cultural tips.
   - **Cross-Links** to relevant country sites for deeper or more localized articles.
   - **Content Marketing / SEO Strategy**: Showcasing Qogent's expertise, boosting organic traffic.

6. **Testimonials & Case Studies**

   - **Student Success Stories**: Narratives of aspiration and triumph.
   - **Video/Photo Testimonials**: Multimedia for stronger engagement.

7. **Contact & Support**

   - **Central Inquiry Form**: One-stop channel for prospective students, parents, partners.
   - **Help Desk / Chat**: Basic triaging for common queries.

8. **Brand Consolidation**

- **Consistent Branding**: Uniform color palette, typography, and design across Qogent.in and all sub-sites.
- **"by Qogent"** Tagline: Reinforce the global brand identity on every specialized platform.

9. **Footer Components**

- **Careers at Qogent**: Information about job opportunities at Qogent (not for international students).
- **Legal Information**: Privacy policy, terms of service, and other legal documentation.
- **Support Links**: Access to help resources and frequently asked questions.

### 3.2 Extended Requirements

1. **User Account System** (Phase 2+)
   - Single Sign-On (SSO) across Qogent domains.
   - Potential for personalized dashboards (saved universities, job applications).
2. **Localization**
   - Multi-language support if targeting non-English-speaking audiences.
3. **SEO & Structured Data**
   - Clear meta tags, schema markup for articles, job postings, and event listings.
   - Content targeting global keywords: "Study Abroad Consultant," "Jobs for International Students," etc.

### 3.3 Brand Identity & Items

To maintain a cohesive, recognizable presence across all Qogent platforms, we adopt a unified brand identity reflecting the **Qogent logo** and color scheme:

1. **Brand Name & Logo**

   - **Qogent Wordmark & Figure**: A dynamic, celebratory figure, wearing an orange mortarboard.
   - **Color Variations**: Light/dark mode versions to ensure clarity on variable backgrounds.
   - **Usage Rules**: The logo must appear on sub-sites ("by Qogent"), with consistent spacing and size.

2. **Color Palette**
   As decided in Style guide

3. **Typography**

   - **Primary Font**: A modern sans-serif consistent with Qogent's brand (e.g., Inter, Open Sans, or similar), used for headings and body.
   - **Font Hierarchy**: Clear headings (H1, H2, H3) and standardized sizes for readability.
   - **Web-Friendly**: Hosted via modern solutions (e.g., Google Fonts), tested for performance.

4. **Brand Voice & Tone**

   - **Confident, Knowledgeable, Empowering**: Encourages students to explore global opportunities.
   - **Welcoming & Approachable**: Addresses concerns of parents and students.
   - **Inspirational**: Showcases success stories, fosters trust and motivation.

5. **Imagery & Iconography**

   - **Minimalist Icons**: From Lucide or similar, using Qogent style guide
   - **Photography**: Authentic visuals featuring real students, campuses, and global settings.
   - **Illustrations**: Subtle, theme-aligned images for sections like Visa Guidance, Scholarship Info, or the Job Portal.

6. **Consistent Application**
   - **All Websites**: qogent.in and each specialized domain unify look-and-feel via shared brand elements.
   - **Print & Digital Collateral**: Flyers, brochures, email campaigns, social media maintain the same identity.
   - **Guidelines Enforcement**: All design/dev teams reference the Qogent Style Guide to avoid fragmentation.

---

## 4. Technical Requirements

1. **Framework**: Next.js (App Router) + TypeScript for performance and modularity.
2. **UI/UX**: Tailwind CSS + Qogent's design system ensuring brand uniformity.
3. **Database**: Supabase (recommended) or an alternative for dynamic content (job listings, user data, etc.).
4. **Deployment & DevOps**: Netlify or Vercel (CI/CD), environment-based configs.
5. **Analytics**: GA4 or alternative—track page views, user flows, conversions.
6. **Accessibility**: WCAG 2.1 AA compliance, focusing on keyboard navigation, color contrast, alt text.
7. **Performance Goals**:
   - **LCP** < 2.5s
   - **TTFB** < 0.5s
   - Leverage Next.js optimizations (ISR, dynamic imports).

---

## 5. Project Milestones & Deliverables

1. **MVP Launch** (~4–6 Weeks)

   - **Core Pages**: Homepage, About Us, Contact.
   - **Country-Selector Tool**: Basic version of "Which Country is Right for You?"
   - **Careers in Footer**: Basic information about opportunities at Qogent.
   - **Blog/Resource Section**: Setup for broad content topics.
   - **Essential SEO**: Basic metadata, sitemaps, GSC integration.

2. **Phase 2** (~6–10 Weeks)

   - **Advanced Resource Library**: Category-based articles, in-depth guides, potential video tutorials.
   - **User Accounts**: Possibly store favorites, track applications.
   - **Enhanced Careers Page**: More detailed job descriptions and application process.
   - **Deeper SEO**: Structured data, link-building, region-specific SERPs.

3. **Phase 3** (Ongoing)
   - **Localization**: Multi-language content, region-based marketing.
   - **Advanced Partnerships**: University portals, scholarship or corporate sponsorship programs.
   - **Enhanced Integration**: Cross-site single sign-on, consolidated analytics.

---

## 6. Success Metrics

1. **Traffic Growth**: Increase in unique visitors to Qogent.in, especially from relevant queries.
2. **Lead Generation**: Form submissions, usage of the "Which Country is Right for You?" tool.
3. **User Engagement**: Time on site, bounce rate, pages per session.
4. **Conversion to Spoke Sites**: Click-through rates from Qogent.in to country-specific `.app` domains.
5. **Brand Recognition**: Rising brand-related searches (e.g., "Qogent," "Qogent Careers," "Qogent Merit Admissions").

---

## 7. Risk & Mitigation

1. **Brand Dilution**: Consistent styling, messaging, and domain structure ensures a unified identity.
2. **Overlapping Content**: Clearly differentiate general info (Qogent.in) vs. localized content (sub-sites).
3. **Technical Complexity**: Plan expansions (job portal, SSO, advanced country tool) in incremental phases.
4. **SEO Competition**: Ongoing content creation and link-building to maintain authority.

---

## 8. Stakeholders & Approvals

- **Product Owner**: Qogent Leadership Team.
- **Development**: In-house or external dev partners.
- **Design**: Must follow Qogent Style Guide.
- **Marketing/SEO**: Oversees content/campaign strategies.
- **Partnership Team**: Employer/university listing expansions.

---

## 9. Conclusion

This updated PRD integrates both Qogent's inspiring "About Us" content and a novel "Which Country is Right for You?" feature, fully aligning with Qogent's mission to **democratize access to international education**. The site's robust brand identity—centered around the Qogent logo—AI-assisted country recommendation, and data-driven job portal collectively create a one-stop platform for students, fulfilling Qogent's core promise: making global education transparent, merit-focused, and accessible to all.
