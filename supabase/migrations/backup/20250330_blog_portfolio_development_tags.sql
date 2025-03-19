-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Application Preparation') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Portfolio') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Creative Programs') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Technical Programs') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'portfolio-development-guide-creative-technical-programs';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Application Preparation';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Portfolio';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Creative Programs';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Technical Programs';
  END IF;
END;
$$; 