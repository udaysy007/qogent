-- ====================================================================
-- BLOG POST: Entrepreneurship Options for International Students
-- ====================================================================
-- Target Keywords: student entrepreneur visa, start business abroad
-- Focus: Country-wise startup policies, success stories, resources
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
  'entrepreneurship-options-international-students',
  'Entrepreneurship Options for International Students',
  'Discover practical pathways to launch your business as an international student, including visa regulations, funding opportunities, and inspiring success stories from student entrepreneurs worldwide.',
  E'# Content placeholder\n\n[Content will be added separately]',
  '/images/blog/entrepreneurship-international-students.jpg',
  'career-development',
  18,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'International Student Entrepreneurship Guide 2025',
  'Start a business as an international student with our guide to visa requirements, funding options, and startup resources in major study destinations.',
  'https://qogent.in/blog/entrepreneurship-options-international-students',
  TRUE,
  ARRAY['international student entrepreneur', 'startup visa options', 'student business abroad', 'international founder visa', 'student startup guide'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
); 