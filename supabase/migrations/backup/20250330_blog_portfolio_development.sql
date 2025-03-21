-- ====================================================================
-- BLOG POST: Portfolio Development Guide for Creative & Technical Programs
-- ====================================================================
-- Target Keywords: student portfolio guide, academic portfolio development
-- Focus: Portfolio requirements by field, presentation tips, examples
-- Update Frequency: Annual
-- ====================================================================

-- Insert the blog post without tags
INSERT INTO blog_posts (
  slug,
  title,
  description,
  content,
  image_url,
  category,
  read_time,
  published_at,
  updated_at,
  meta_title,
  meta_description,
  canonical_url,
  is_indexed,
  keywords,
  priority,
  change_frequency,
  language,
  author_id
) VALUES (
  'portfolio-development-guide-creative-technical-programs',
  'Portfolio Development Guide for Creative & Technical Programs',
  'Learn how to create a standout portfolio for your academic applications. This guide covers field-specific requirements, presentation formats, and real examples that impressed admissions officers.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/portfolio-development-guide.jpg',
  'application-preparation',
  16,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Portfolio Development Guide for Academic Applications (2025)',
  'Create a standout portfolio for creative and technical programs with field-specific tips, formats, and examples from successful applicants.',
  'https://qogent.in/blog/portfolio-development-guide-creative-technical-programs',
  TRUE,
  ARRAY['portfolio development', 'student portfolio guide', 'academic portfolio', 'creative program application', 'technical portfolio examples'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 