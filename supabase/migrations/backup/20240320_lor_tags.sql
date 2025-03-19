-- First, ensure the tags exist
INSERT INTO blog_tags (name) VALUES ('Letter of Recommendation') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Applications') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Academic References') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('Study Abroad') ON CONFLICT (name) DO NOTHING;
INSERT INTO blog_tags (name) VALUES ('University Applications') ON CONFLICT (name) DO NOTHING;

-- Get post_id
DO $$
DECLARE
  post_id UUID;
BEGIN
  SELECT id INTO post_id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters';
  
  IF post_id IS NOT NULL THEN
    -- Link tags to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Letter of Recommendation';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Applications';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Academic References';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'Study Abroad';
    
    INSERT INTO blog_posts_tags (post_id, tag_id)
    SELECT post_id, id FROM blog_tags WHERE name = 'University Applications';
  END IF;
END;
$$; 