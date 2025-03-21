-- ====================================================================
-- BLOG POST: Global Scholarship Guide: Top Opportunities for International Students
-- ====================================================================
-- Target Keywords: international student scholarships, study abroad scholarships
-- Focus: Merit-based opportunities, application strategies, deadlines
-- Update Frequency: Quarterly
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
  'global-scholarship-guide-international-students',
  'Global Scholarship Guide: Top Opportunities for International Students',
  'Discover the best scholarships for international students with application strategies and key deadlines to fund your education abroad.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/global-scholarship-guide.jpg',
  'financial-planning',
  12,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Global Scholarship Guide for International Students',
  'Find the best scholarships for international students with tips on applications, deadlines, and success strategies.',
  'https://qogent.in/blog/global-scholarship-guide-international-students',
  TRUE,
  ARRAY['international student scholarships', 'study abroad scholarships', 'merit scholarships', 'scholarship application tips'],
  0.8,
  'quarterly',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 