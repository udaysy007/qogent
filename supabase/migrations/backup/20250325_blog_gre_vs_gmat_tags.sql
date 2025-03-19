-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Test Preparation') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Graduate School') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Admissions') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Business School') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'gre-vs-gmat-which-test-right-for-graduate-program';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Test Preparation';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Graduate School';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Admissions';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Business School';
  END IF;
END;
$$; 