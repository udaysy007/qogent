-- ====================================================================
-- BLOG POST: International Student Banking Guide: Setting Up Finances Abroad
-- ====================================================================
-- Target Keywords: international student banking, overseas student account
-- Focus: Country-wise banking systems, account opening procedures
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
  'international-student-banking-guide',
  'International Student Banking Guide: Setting Up Finances Abroad',
  'Learn how to set up bank accounts as an international student in different countries, navigate banking systems, and manage your finances efficiently while studying abroad.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/international-student-banking.jpg',
  'financial-planning',
  14,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'International Student Banking Guide: Managing Money Abroad',
  'Essential guide to setting up bank accounts as an international student in different countries, with tips on avoiding fees and managing finances.',
  'https://qogent.in/blog/international-student-banking-guide',
  TRUE,
  ARRAY['international student banking', 'overseas student account', 'student bank account abroad', 'banking for foreign students', 'study abroad finances'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 