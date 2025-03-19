-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Career Development') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Global Careers') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Networking') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Professional Development') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'building-international-career-study-global-professional';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Career Development';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Global Careers';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Networking';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Professional Development';
  END IF;
END;
$$; 