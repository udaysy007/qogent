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
  'letter-of-recommendation-guide-getting-strong-letters',
  'Letter of Recommendation Guide: Getting Strong Letters',
  'Learn how to request compelling letters of recommendation for your study abroad applications.',
  
  E'# Letter of Recommendation Guide: Getting Strong Letters\n\n[Full content will be added separately]',

  '/images/blog/recommendation-letter-guide.jpg',
  'applications',
  15,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'LOR Guide: Getting Strong Reference Letters',
  'Get powerful recommendation letters. Learn who to ask, when to ask, and how to provide materials for strong letters.',
  'https://qogent.com/blog/letter-of-recommendation-guide-getting-strong-letters',
  TRUE,
  ARRAY['LOR guide', 'recommendation letter tips'],
  0.8,
  'annual',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
);

-- Tags will be added separately 