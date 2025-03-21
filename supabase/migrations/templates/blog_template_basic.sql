-- ====================================================================
-- BLOG POST: [TITLE]
-- ====================================================================
-- Target Keywords: [keyword1], [keyword2], [keyword3]
-- Focus: [Focus description]
-- Update Frequency: [Update frequency]
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
  '[slug-with-hyphens]',
  '[Full Title]',
  '[Short description under 160 characters]',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/[image-name].jpg',
  '[category]',
  [estimated_minutes],
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '[SEO Title (under 60 characters)]',
  '[SEO Description (under 160 characters)]',
  'https://qogent.in/blog/[slug-with-hyphens]',
  TRUE,
  ARRAY['[keyword1]', '[keyword2]', '[keyword3]', '[keyword4]', '[keyword5]'],
  0.8,
  '[monthly/quarterly/annual]',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 