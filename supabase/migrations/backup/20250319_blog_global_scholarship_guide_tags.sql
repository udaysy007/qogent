-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Scholarships') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Financial Planning') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Study Abroad') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Application Tips') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'global-scholarship-guide-international-students';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Scholarships';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Financial Planning';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Study Abroad';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Application Tips';
  END IF;
END;
$$; 