-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Study Destinations') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('International Education') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Country Comparison') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Study Abroad') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'best-countries-international-students-2025-comparison';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Study Destinations';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'International Education';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Country Comparison';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Study Abroad';
  END IF;
END;
$$; 