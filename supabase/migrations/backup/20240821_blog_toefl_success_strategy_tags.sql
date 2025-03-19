-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('TOEFL') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Test Preparation') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('English Language') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Study Abroad') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Study Tips') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'toefl-success-strategy';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'TOEFL';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Test Preparation';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'English Language';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Study Abroad';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Study Tips';
  END IF;
END;
$$; 