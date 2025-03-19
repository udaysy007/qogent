-- ====================================================================
-- BLOG POST: Remote Work Opportunities for International Students
-- ====================================================================
-- Target Keywords: remote jobs international students, online work study abroad
-- Focus: Legal considerations, job platforms, success stories
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
  'remote-work-opportunities-international-students',
  'Remote Work Opportunities for International Students',
  'Discover legitimate remote work opportunities for international students, including legal considerations, top platforms, and strategies to build a successful online career while studying abroad.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/remote-work-opportunities.jpg',
  'career-development',
  16,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Remote Work Guide for International Students (2025)',
  'Find legitimate remote work opportunities as an international student with our guide to online jobs, legal considerations, and success strategies.',
  'https://qogent.com/blog/remote-work-opportunities-international-students',
  TRUE,
  ARRAY['remote jobs for international students', 'online work while studying abroad', 'legal remote work for students', 'international student side hustles', 'digital jobs for students'],
  0.8,
  'quarterly',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 