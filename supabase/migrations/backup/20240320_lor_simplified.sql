-- ====================================================================
-- BLOG POST: Letter of Recommendation Guide: Getting Strong Letters
-- ====================================================================

-- Insert the new blog post with a unique ID
WITH new_post AS (
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
    'Learn how to request compelling letters of recommendation for your study abroad applications. From approaching professors to providing the right materials, this guide covers everything you need.',
    
    E'# Letter of Recommendation Guide: Getting Strong Letters\n\n[Full content will be added separately]',

    '/images/blog/recommendation-letter-guide.jpg',
    'applications',
    15,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'LOR Guide: Getting Strong Reference Letters',
    'Get powerful recommendation letters for academic applications. Learn who to ask, when to ask, and how to provide materials that make writing strong letters easy.',
    'https://qogent.in/blog/letter-of-recommendation-guide-getting-strong-letters',
    TRUE,
    ARRAY['LOR guide', 'recommendation letter tips', 'reference letter for students'],
    0.8,
    'annual',
    'en',
    '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
  )
  RETURNING id
)

-- Handle tags properly
SELECT 1;

-- First, ensure the tags exist
INSERT INTO blog_tags (name)
VALUES ('Letter of Recommendation')
ON CONFLICT (name) DO NOTHING;

INSERT INTO blog_tags (name)
VALUES ('Applications')
ON CONFLICT (name) DO NOTHING;

INSERT INTO blog_tags (name)
VALUES ('Academic References')
ON CONFLICT (name) DO NOTHING;

INSERT INTO blog_tags (name)
VALUES ('Study Abroad')
ON CONFLICT (name) DO NOTHING;

INSERT INTO blog_tags (name)
VALUES ('University Applications')
ON CONFLICT (name) DO NOTHING;

-- Now link them with the post, making sure to retrieve the tags first
INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters'),
  (SELECT id FROM blog_tags WHERE name = 'Letter of Recommendation');

INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters'),
  (SELECT id FROM blog_tags WHERE name = 'Applications');

INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters'),
  (SELECT id FROM blog_tags WHERE name = 'Academic References');

INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters'),
  (SELECT id FROM blog_tags WHERE name = 'Study Abroad');

INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters'),
  (SELECT id FROM blog_tags WHERE name = 'University Applications'); 