-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Countries table
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by slug
CREATE INDEX idx_countries_slug ON countries(slug);

-- Universities table
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

-- Programs table
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

-- Visa requirements table
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

-- Cost of living table
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

-- Work opportunities table
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

-- Language requirements table
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

-- Testimonials table
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

-- FAQs table
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

-- Jobs table
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

-- Blogs table
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