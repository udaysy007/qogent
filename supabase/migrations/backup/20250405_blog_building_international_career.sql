-- ====================================================================
-- BLOG POST: Building an International Career: From Study to Global Professional
-- ====================================================================
-- Target Keywords: international career guide, global job opportunities
-- Focus: Career planning, skill development, networking strategies
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
  'building-international-career-study-global-professional',
  'Building an International Career: From Study to Global Professional',
  'Transform your international education into a thriving global career with practical strategies for networking, skill development, and overcoming common challenges faced by international professionals.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/building-international-career.jpg',
  'career-development',
  17,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Global Career Building Guide for International Students',
  'Learn how to transform your international education into a successful global career with practical strategies from former international students.',
  'https://qogent.com/blog/building-international-career-study-global-professional',
  TRUE,
  ARRAY['international career guide', 'global job opportunities', 'career planning for international students', 'international networking strategies', 'global professional development'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 