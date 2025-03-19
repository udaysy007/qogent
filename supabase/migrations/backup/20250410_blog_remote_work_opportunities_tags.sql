-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Remote Work') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Career Development') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Student Jobs') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Digital Skills') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'remote-work-opportunities-international-students';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Remote Work';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Career Development';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Student Jobs';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Digital Skills';
  END IF;
END;
$$; 