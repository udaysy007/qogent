-- ====================================================================
-- BLOG POST: How to Create a Study Abroad Budget: Universal Planning Template
-- ====================================================================
-- Target Keywords: study abroad budget, international student expenses
-- Focus: Comprehensive cost planning, saving strategies, financial tools
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
  'study-abroad-budget-universal-planning-template',
  'How to Create a Study Abroad Budget: Universal Planning Template',
  'Master your study abroad finances with our comprehensive budget planning template covering all hidden costs and saving strategies.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/study-abroad-budget-template.jpg',
  'financial-planning',
  15,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'Study Abroad Budget: Universal Planning Template',
  'Create a realistic study abroad budget with our comprehensive template covering tuition, living expenses, and hidden costs.',
  'https://qogent.com/blog/study-abroad-budget-universal-planning-template',
  TRUE,
  ARRAY['study abroad budget', 'international student expenses', 'financial planning template', 'student budget calculator'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 