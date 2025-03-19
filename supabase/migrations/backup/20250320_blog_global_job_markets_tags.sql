-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Career Development') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Post-Study Work') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('International Jobs') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Work Visas') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'global-job-markets-best-countries-post-study-work';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Career Development';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Post-Study Work';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'International Jobs';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Work Visas';
  END IF;
END;
$$; 