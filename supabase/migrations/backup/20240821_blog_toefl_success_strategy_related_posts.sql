-- Add related posts
DO $$
DECLARE
  blog_post_id UUID;
  related_post_id1 UUID;
  related_post_id2 UUID;
  related_post_id3 UUID;
BEGIN
  -- Get post IDs
  SELECT id INTO blog_post_id FROM blog_posts WHERE slug = 'toefl-success-strategy';
  SELECT id INTO related_post_id1 FROM blog_posts WHERE slug = 'ielts-vs-toefl-which-english-test-should-you-take';
  SELECT id INTO related_post_id2 FROM blog_posts WHERE slug = 'ultimate-ielts-preparation-guide';
  SELECT id INTO related_post_id3 FROM blog_posts WHERE slug = 'how-to-write-a-powerful-statement-of-purpose';
  
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
  
  IF blog_post_id IS NOT NULL AND related_post_id3 IS NOT NULL THEN
    INSERT INTO blog_related_posts (post_id, related_post_id, position)
    VALUES (blog_post_id, related_post_id3, 3)
    ON CONFLICT (post_id, related_post_id) DO NOTHING;
  END IF;
END;
$$; 