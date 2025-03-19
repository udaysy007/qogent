-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Academic CV') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Resume Writing') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Application Documents') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('International Students') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'academic-cv-international-standards-examples';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Academic CV';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Resume Writing';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Application Documents';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'International Students';
  END IF;
END;
$$; 