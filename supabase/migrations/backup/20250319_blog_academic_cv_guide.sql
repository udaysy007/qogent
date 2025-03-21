-- ====================================================================
-- BLOG POST: Creating a Perfect Academic CV: International Standards & Examples
-- ====================================================================
-- Target Keywords: academic CV template, international student resume
-- Focus: Country-wise CV standards, formatting, content guidelines
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
  'academic-cv-international-standards-examples',
  'Creating a Perfect Academic CV: International Standards & Examples',
  'Learn how to craft an outstanding academic CV that meets international standards with country-specific examples and formatting guidelines.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/academic-cv-guide.jpg',
  'application-documents',
  14,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Academic CV Guide: International Standards & Examples',
  'Create a standout academic CV with our guide to international formatting standards and country-specific examples.',
  'https://qogent.in/blog/academic-cv-international-standards-examples',
  TRUE,
  ARRAY['academic CV template', 'international student resume', 'CV formatting', 'academic resume', 'country-specific CV'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 