-- Add related posts
DO $$
DECLARE
  blog_post_id UUID;
  related_post_id1 UUID;
  related_post_id2 UUID;
BEGIN
  -- Get post IDs
  SELECT id INTO blog_post_id FROM blog_posts WHERE slug = 'entrepreneurship-options-international-students';
  SELECT id INTO related_post_id1 FROM blog_posts WHERE slug = 'remote-work-opportunities-international-students';
  SELECT id INTO related_post_id2 FROM blog_posts WHERE slug = 'building-international-career-study-global-professional';

  -- Add related posts if all IDs are found
  IF blog_post_id IS NOT NULL AND related_post_id1 IS NOT NULL THEN
    INSERT INTO blog_related_posts (post_id, related_post_id, position)
    VALUES (blog_post_id, related_post_id1, 1)
    ON CONFLICT (post_id, related_post_id) DO NOTHING;
  END IF;

  IF blog_post_id IS NOT NULL AND related_post_id2 IS NOT NULL THEN
    INSERT INTO blog_related_posts (post_id, related_post_id, position)
    VALUES (blog_post_id, related_post_id2, 2)
    ON CONFLICT (post_id, related_post_id) DO NOTHING;
  END IF;
END;
$$; 