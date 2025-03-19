-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('[Tag 1]') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('[Tag 2]') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('[Tag 3]') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('[Tag 4]') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = '[slug-with-hyphens]';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = '[Tag 1]';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = '[Tag 2]';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = '[Tag 3]';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = '[Tag 4]';
  END IF;
END;
$$; 