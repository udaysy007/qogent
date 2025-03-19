-- Add related posts for the Letter of Recommendation Guide
DO $$
DECLARE
  lor_post_id UUID;
  sop_post_id UUID;
  destination_post_id UUID;
BEGIN
  -- Get post IDs
  SELECT id INTO lor_post_id FROM blog_posts WHERE slug = 'letter-of-recommendation-guide-getting-strong-letters';
  SELECT id INTO sop_post_id FROM blog_posts WHERE slug = 'how-to-write-powerful-statement-of-purpose-global-template';
  SELECT id INTO destination_post_id FROM blog_posts WHERE slug = 'choosing-study-destination-step-by-step-guide';

  -- Add related posts if all IDs are found
  IF lor_post_id IS NOT NULL AND sop_post_id IS NOT NULL THEN
    INSERT INTO blog_related_posts (post_id, related_post_id, position)
    VALUES (lor_post_id, sop_post_id, 1)
    ON CONFLICT (post_id, related_post_id) DO NOTHING;
  END IF;

  IF lor_post_id IS NOT NULL AND destination_post_id IS NOT NULL THEN
    INSERT INTO blog_related_posts (post_id, related_post_id, position)
    VALUES (lor_post_id, destination_post_id, 2)
    ON CONFLICT (post_id, related_post_id) DO NOTHING;
  END IF;
END;
$$; 