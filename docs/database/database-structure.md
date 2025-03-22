# Qogent.in Database Structure

## Overview

This document outlines the complete database structure for Qogent.in using Supabase as our backend solution. It defines all tables, relationships, access patterns, and implementation details needed to support the application's features as specified in the PRD.

## Core Principles

1. **Relational Integrity**: Maintain proper relationships between entities
2. **Performance Optimization**: Structure data for efficient querying
3. **Scalability**: Design for future growth and feature expansion
4. **Security**: Implement proper access controls and data protection
5. **Flexibility**: Allow for content management without code changes

## Database Schema

### Tables Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   countries     │     │  universities   │     │    programs     │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │1───┐│ id              │1───┐│ id              │
│ name            │    ││ name            │    ││ name            │
│ slug            │    ││ country_id      │n   ││ university_id   │n
│ code            │    ││ city            │    ││ degree_level    │
│ region          │    ││ slug            │    ││ title           │
│ flag_url        │    ││ is_public       │    ││ description     │
│ hero_image_url  │    ││ ranking         │    ││ duration        │
│ description     │    ││ description     │    ││ tuition_fee     │
│ long_description│    ││ website         │    ││ language        │
│ featured        │    ││ logo_url        │    ││ requirements    │
│ tags            │    ││ campus_images   │    ││ application_url │
└─────────────────┘    │└─────────────────┘    │└─────────────────┘
                       │                        │
┌─────────────────┐    │  ┌─────────────────┐  │  ┌─────────────────┐
│  visa_requirements │  │  │  cost_of_living │  │  │  testimonials   │
├─────────────────┤    │  ├─────────────────┤  │  ├─────────────────┤
│ id              │    │  │ id              │  │  │ id              │
│ country_id      │n───┘  │ country_id      │n─┘  │ student_name    │
│ student_visa    │       │ accommodation_low│     │ student_image   │
│ processing_time │       │ accommodation_high    │ country_id      │n─┘
│ application_fee │       │ food_low        │     │ university_id   │n─┘
│ documents       │       │ food_high       │     │ program_id      │n─┘
└─────────────────┘       │ transport_low   │     │ content         │
                          │ transport_high  │     │ rating          │
┌─────────────────┐       │ utilities_low   │     │ featured        │
│  work_opportunities │   │ utilities_high  │     └─────────────────┘
├─────────────────┤       │ currency        │
│ id              │       └─────────────────┘     ┌─────────────────┐
│ country_id      │n───┐                          │     faqs        │
│ during_studies  │    │  ┌─────────────────┐     ├─────────────────┤
│ after_graduation│    │  │     jobs        │     │ id              │
│ average_salary  │    │  ├─────────────────┤     │ country_id      │n─┘
└─────────────────┘    │  │ id              │     │ question        │
                       │  │ title           │     │ answer          │
┌─────────────────┐    │  │ department      │     │ category        │
│  language_requirements │ location        │     └─────────────────┘
├─────────────────┤    │  │ type            │
│ id              │    │  │ description     │     ┌─────────────────┐
│ country_id      │n───┘  │ responsibilities│     │     blogs       │
│ english_required│       │ requirements    │     ├─────────────────┤
│ english_tests   │       │ benefits        │     │ id              │
│ english_scores  │       │ posted_date     │     │ title           │
│ local_required  │       │ application_url │     │ slug            │
│ local_tests     │       │ is_active       │     │ content         │
│ local_scores    │       └─────────────────┘     │ excerpt         │
└─────────────────┘                               │ author          │
                                                  │ published_date  │
                                                  │ featured_image  │
                                                  │ tags            │
                                                  │ country_id      │n─┘
                                                  └─────────────────┘
```

### Detailed Table Specifications

#### 1. countries

The central table for all destination countries.

```sql
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL,
  region TEXT NOT NULL,
  flag_url TEXT,
  hero_image_url TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  
  /* Basic Information */
  capital TEXT,
  population TEXT,
  language TEXT,
  currency TEXT,
  academic_year TEXT,
  education_system TEXT,
  
  /* Education Statistics */
  international_students TEXT,
  top_universities TEXT,
  english_programs TEXT,
  post_study_work TEXT,
  
  /* Education System */
  bachelor_info TEXT,
  master_info TEXT,
  phd_info TEXT,
  teaching_style TEXT,
  grading_system TEXT,
  instruction_language TEXT,
  academic_calendar TEXT,
  universities_intro TEXT,
  
  /* Admission & Visa Requirements */
  educational_requirements TEXT,
  transcript_requirements TEXT,
  entrance_exams TEXT,
  english_requirements TEXT,
  language_exemptions TEXT,
  visa_requirements TEXT,
  financial_requirements TEXT,
  health_requirements TEXT,
  additional_documents TEXT,
  visa_tip TEXT,
  
  /* Tuition & Living Costs */
  bachelor_fee_public TEXT,
  bachelor_fee_private TEXT,
  bachelor_fee_medical TEXT,
  master_fee_public TEXT,
  master_fee_private TEXT,
  master_fee_business TEXT,
  accommodation_cost TEXT,
  accommodation_note TEXT,
  food_cost TEXT,
  food_note TEXT,
  transport_cost TEXT,
  transport_note TEXT,
  utilities_cost TEXT,
  utilities_note TEXT,
  other_cost TEXT,
  other_note TEXT,
  total_monthly_cost TEXT,
  budget_tip1 TEXT,
  budget_tip2 TEXT,
  budget_tip3 TEXT,
  budget_tip4 TEXT,
  government_scholarships TEXT,
  university_scholarships TEXT,
  external_scholarships TEXT,
  
  /* Student Life */
  campus_life TEXT,
  campus_life_extra TEXT,
  work_opportunities TEXT,
  work_opportunities_extra TEXT,
  cultural_experience TEXT,
  cultural_experience_extra TEXT,
  student_life_image1 TEXT,
  student_life_image2 TEXT,
  student_life_image3 TEXT,
  student_life_image4 TEXT,
  
  /* Testimonials */
  testimonial1_name TEXT,
  testimonial1_image TEXT,
  testimonial1_program TEXT,
  testimonial1_university TEXT,
  testimonial1_quote TEXT,
  testimonial1_country TEXT,
  testimonial2_name TEXT,
  testimonial2_image TEXT,
  testimonial2_program TEXT,
  testimonial2_university TEXT,
  testimonial2_quote TEXT,
  testimonial2_country TEXT,
  testimonial3_name TEXT,
  testimonial3_image TEXT,
  testimonial3_program TEXT,
  testimonial3_university TEXT,
  testimonial3_quote TEXT,
  testimonial3_country TEXT,
  
  /* FAQs */
  faq1_question TEXT,
  faq1_answer TEXT,
  faq2_question TEXT,
  faq2_answer TEXT,
  faq3_question TEXT,
  faq3_answer TEXT,
  faq4_question TEXT,
  faq4_answer TEXT,
  faq5_question TEXT,
  faq5_answer TEXT,
  faq6_question TEXT,
  faq6_answer TEXT,
  faq7_question TEXT,
  faq7_answer TEXT,
  faq8_question TEXT,
  faq8_answer TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by slug
CREATE INDEX idx_countries_slug ON countries(slug);
```

#### 2. universities

Universities associated with each country.

```sql
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  ranking INTEGER,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  campus_images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_universities_country_id ON universities(country_id);
CREATE INDEX idx_universities_slug ON universities(slug);
```

#### 3. programs

Academic programs offered by universities.

```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  degree_level TEXT NOT NULL, -- 'bachelor', 'master', 'phd'
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  tuition_fee JSONB, -- { "amount": 10000, "currency": "EUR", "period": "year" }
  language TEXT,
  requirements TEXT[] DEFAULT '{}',
  application_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_programs_university_id ON programs(university_id);
```

#### 4. visa_requirements

Visa information for each country.

```sql
CREATE TABLE visa_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  student_visa TEXT NOT NULL,
  processing_time TEXT,
  application_fee JSONB, -- { "amount": 60, "currency": "EUR" }
  documents TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country_id)
);
```

#### 5. cost_of_living

Cost of living details for each country.

```sql
CREATE TABLE cost_of_living (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  accommodation_low INTEGER,
  accommodation_high INTEGER,
  food_low INTEGER,
  food_high INTEGER,
  transport_low INTEGER,
  transport_high INTEGER,
  utilities_low INTEGER,
  utilities_high INTEGER,
  currency TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country_id)
);
```

#### 6. work_opportunities

Work-related information for each country.

```sql
CREATE TABLE work_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  during_studies TEXT,
  after_graduation TEXT,
  average_salary JSONB, -- { "low": 30000, "high": 45000, "currency": "EUR", "period": "year" }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country_id)
);
```

#### 7. language_requirements

Language requirements for each country.

```sql
CREATE TABLE language_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  english_required BOOLEAN DEFAULT true,
  english_tests TEXT[] DEFAULT '{}',
  english_scores JSONB DEFAULT '{}', -- { "IELTS": "6.5", "TOEFL": "90" }
  local_required BOOLEAN DEFAULT false,
  local_tests TEXT[] DEFAULT '{}',
  local_scores JSONB DEFAULT '{}', -- { "TestDaF": "TDN 4", "DSH": "DSH-2" }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country_id)
);
```

#### 8. testimonials

Student testimonials and success stories.

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  student_image TEXT,
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  university_id UUID REFERENCES universities(id) ON DELETE SET NULL,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for featured testimonials
CREATE INDEX idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
```

#### 9. faqs

Frequently asked questions for each country.

```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_faqs_country_id ON faqs(country_id);
```

#### 10. jobs

Job listings for the job portal.

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Full-time', 'Part-time', 'Contract', 'Remote'
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  application_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for active jobs
CREATE INDEX idx_jobs_is_active ON jobs(is_active) WHERE is_active = true;
```

#### 11. blogs

Blog posts and articles.

```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_tags ON blogs USING GIN(tags);
```

## Row-Level Security (RLS) Policies

To secure our data, we'll implement the following RLS policies:

```sql
-- Enable RLS on all tables
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_of_living ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE language_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public read-only access for most tables
CREATE POLICY "Public can view countries" ON countries FOR SELECT USING (true);
CREATE POLICY "Public can view universities" ON universities FOR SELECT USING (true);
CREATE POLICY "Public can view programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public can view visa_requirements" ON visa_requirements FOR SELECT USING (true);
CREATE POLICY "Public can view cost_of_living" ON cost_of_living FOR SELECT USING (true);
CREATE POLICY "Public can view work_opportunities" ON work_opportunities FOR SELECT USING (true);
CREATE POLICY "Public can view language_requirements" ON language_requirements FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public can view active jobs" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published blogs" ON blogs FOR SELECT USING (published_date <= now());

-- Admin access policies (to be used with admin authentication)
CREATE POLICY "Admins can manage countries" ON countries FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage universities" ON universities FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage visa_requirements" ON visa_requirements FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage cost_of_living" ON cost_of_living FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage work_opportunities" ON work_opportunities FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage language_requirements" ON language_requirements FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage faqs" ON faqs FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage jobs" ON jobs FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admins can manage blogs" ON blogs FOR ALL USING (auth.role() = 'admin');
```

## Supabase Integration

### Client Setup

Create a Supabase client for use throughout the application:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### TypeScript Types

Generate TypeScript types for the database schema:

```typescript
// src/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          id: string
          name: string
          slug: string
          code: string
          region: string
          flag_url: string | null
          hero_image_url: string | null
          description: string
          long_description: string | null
          featured: boolean
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          code: string
          region: string
          flag_url?: string | null
          hero_image_url?: string | null
          description: string
          long_description?: string | null
          featured?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          code?: string
          region?: string
          flag_url?: string | null
          hero_image_url?: string | null
          description?: string
          long_description?: string | null
          featured?: boolean
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      // Additional table types would follow the same pattern
    }
  }
}
```

## Data Hooks

Create React Query hooks for data fetching:

```typescript
// src/hooks/use-countries.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
}

export function useCountry(slug: string) {
  return useQuery({
    queryKey: ['country', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select(`
          *,
          universities(*),
          visa_requirements(*),
          cost_of_living(*),
          work_opportunities(*),
          language_requirements(*),
          faqs(*)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });
}
```

## Implementation Plan

### Phase 1: Database Setup

1. Create Supabase project
2. Execute SQL scripts to create tables and indexes
3. Set up RLS policies
4. Generate TypeScript types

### Phase 2: Core Data Integration

1. Implement Supabase client
2. Create data hooks for countries, universities, and programs
3. Integrate with destination pages
4. Implement country selector tool

### Phase 3: Extended Features

1. Implement job portal data integration
2. Add blog functionality
3. Create testimonials section
4. Develop FAQ system

### Phase 4: Admin Interface

1. Create admin authentication
2. Build admin dashboard for content management
3. Implement CRUD operations for all data entities

## Data Migration Strategy

For initial data population:

1. Create CSV templates for each table
2. Populate with initial content based on datamocking.md
3. Use Supabase's import functionality to load data
4. Verify relationships and data integrity

## Backup and Maintenance

1. Schedule regular database backups
2. Implement database monitoring
3. Create maintenance procedures for data cleanup and optimization

## Security Considerations

1. Use environment variables for all sensitive credentials
2. Implement proper authentication for admin access
3. Apply RLS policies to restrict data access
4. Regularly audit database access patterns

## Performance Optimization

1. Use appropriate indexes for frequent query patterns
2. Implement caching for frequently accessed data
3. Use pagination for large data sets
4. Monitor query performance and optimize as needed

## Conclusion

This database structure provides a solid foundation for Qogent.in, supporting all the features outlined in the PRD while maintaining flexibility for future growth. By implementing this structure in Supabase, we'll have a robust, scalable backend that enables efficient data management and retrieval.

The design prioritizes relational integrity, performance, and security while providing a comprehensive data model that captures all the information needed for the application's core functionality. 