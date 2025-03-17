-- Migration: Update countries table with detailed destination fields
-- This migration adds all the fields needed for the destination page

-- Check if the countries table exists, if not create it
CREATE TABLE IF NOT EXISTS countries (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by slug if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_countries_slug ON countries(slug);

-- Add all the new columns if they don't exist

-- Basic Information
ALTER TABLE countries ADD COLUMN IF NOT EXISTS capital TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS population TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS language TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS currency TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS academic_year TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS education_system TEXT;

-- Education Statistics
ALTER TABLE countries ADD COLUMN IF NOT EXISTS international_students TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS top_universities TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS english_programs TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS post_study_work TEXT;

-- Education System
ALTER TABLE countries ADD COLUMN IF NOT EXISTS bachelor_info TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS master_info TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS phd_info TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS teaching_style TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS grading_system TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS instruction_language TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS academic_calendar TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS universities_intro TEXT;

-- Admission & Visa Requirements
ALTER TABLE countries ADD COLUMN IF NOT EXISTS educational_requirements TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS transcript_requirements TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS entrance_exams TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS english_requirements TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS language_exemptions TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS visa_requirements TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS financial_requirements TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS health_requirements TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS additional_documents TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS visa_tip TEXT;

-- Tuition & Living Costs
ALTER TABLE countries ADD COLUMN IF NOT EXISTS bachelor_fee_public TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS bachelor_fee_private TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS bachelor_fee_medical TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS master_fee_public TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS master_fee_private TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS master_fee_business TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS accommodation_cost TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS accommodation_note TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS food_cost TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS food_note TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS transport_cost TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS transport_note TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS utilities_cost TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS utilities_note TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS other_cost TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS other_note TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS total_monthly_cost TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS budget_tip1 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS budget_tip2 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS budget_tip3 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS budget_tip4 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS government_scholarships TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS university_scholarships TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS external_scholarships TEXT;

-- Student Life
ALTER TABLE countries ADD COLUMN IF NOT EXISTS campus_life TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS campus_life_extra TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS work_opportunities TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS work_opportunities_extra TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cultural_experience TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cultural_experience_extra TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS student_life_image1 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS student_life_image2 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS student_life_image3 TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS student_life_image4 TEXT;

-- Testimonials
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial1_name TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial1_image TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial1_program TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial1_university TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial1_quote TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial1_country TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial2_name TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial2_image TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial2_program TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial2_university TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial2_quote TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial2_country TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial3_name TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial3_image TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial3_program TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial3_university TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial3_quote TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS testimonial3_country TEXT;

-- FAQs
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq1_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq1_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq2_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq2_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq3_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq3_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq4_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq4_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq5_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq5_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq6_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq6_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq7_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq7_answer TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq8_question TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS faq8_answer TEXT; 