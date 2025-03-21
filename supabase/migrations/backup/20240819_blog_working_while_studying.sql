-- ====================================================================
-- BLOG POST: Working While Studying Abroad: Country-wise Policies
-- ====================================================================
-- Target Keywords: part-time jobs study abroad, international student work
-- Focus: Work regulations, job hunting tips, salary expectations
-- Update Frequency: Bi-annual
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
  'working-while-studying-abroad-country-wise-policies',
  'Working While Studying Abroad: Country-wise Policies',
  'Discover the working policies for international students across top study destinations, including work hours, salary expectations, and job hunting tips.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/working-while-studying-abroad.jpg',
  'financial-planning',
  15,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Working While Studying Abroad: Country-wise Policies & Tips',
  'Learn about work regulations for international students, job opportunities, and salary expectations in top study abroad destinations.',
  'https://qogent.in/blog/working-while-studying-abroad-country-wise-policies',
  TRUE,
  ARRAY['part-time jobs study abroad', 'international student work', 'study abroad work permit', 'student jobs abroad', 'working while studying'],
  0.8,
  'bi-annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 