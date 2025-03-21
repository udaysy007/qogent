-- ====================================================================
-- BLOG POST TEMPLATE SQL FILE
-- ====================================================================
-- This template includes all required fields and proper formatting for blog posts
-- Field length limitations:
-- - meta_title: STRICT 60 character limit (e.g. "Study in Germany: Complete Guide for International Students")
-- - meta_description: STRICT 160 character limit (e.g. "Learn everything about studying in Germany as an international student. Get details on universities, courses, costs, visas, scholarships and application process.")
-- - Always use Uday Yatnalli's author ID: 8d6e5aff-491e-4d51-9be5-fbef9b106ad9
-- - Keywords must be proper PostgreSQL arrays
-- ====================================================================

-- Insert the new blog post
-- NOTE: Use E'' string format for content to handle special characters properly
INSERT INTO blog_posts (
  -- URL slug (should be SEO-friendly, use hyphens)
  slug,
  
  -- Post title (main H1 heading)
  title,
  
  -- Brief description/excerpt (shown in previews)
  description,
  
  -- Full content in Markdown format (use E'' for proper escaping)
  content,
  
  -- Featured image URL (relative path from public directory)
  image_url,
  
  -- Category (e.g., 'study-abroad', 'applications', etc.)
  category,
  
  -- Estimated reading time in minutes
  read_time,
  
  -- Publication date (use CURRENT_TIMESTAMP for immediate publishing)
  published_at,
  
  -- Last update date (typically same as published_at for new posts)
  updated_at,
  
  -- SEO title (STRICT 60 CHARACTER LIMIT - will cause errors if exceeded)
  meta_title,
  
  -- SEO description (STRICT 160 CHARACTER LIMIT - will cause errors if exceeded)
  meta_description,
  
  -- Canonical URL (typically the full URL to the post)
  canonical_url,
  
  -- Whether search engines should index this post
  is_indexed,
  
  -- SEO keywords as PostgreSQL array (use ARRAY['keyword1', 'keyword2'])
  keywords,
  
  -- Sitemap priority (decimal between 0.0-1.0)
  priority,
  
  -- Sitemap change frequency ('weekly', 'monthly', etc.)
  change_frequency,
  
  -- Content language code
  language,
  
  -- Author ID (MUST be Uday Yatnalli's ID)
  author_id
) VALUES (
  'post-slug-with-keywords',
  'Your Post Title',
  'A brief 1-2 sentence description of your blog post that will appear in previews and search results.',
  
  -- IMPORTANT: Add {#section-id} to ALL headings (## and ###) for table of contents functionality
  '# Your Post Title

Here is where you should start with a personal anecdote or engaging hook that draws the reader in immediately.

For markdown formatting:
- Use **bold text** for emphasis
- Use *italics* for secondary emphasis
- Use > for blockquotes
- Use numbered lists for sequential steps
- Use bullet points for unordered lists

## First Section Heading {#first-section}

Your first section content goes here. Make sure to include a heading ID for each heading using {#heading-id} format.

### Subsection Heading {#subsection-heading}

More detailed content about this specific subtopic.

## Second Main Section {#second-section}

Continue with your content, maintaining a conversational yet informative tone.

You can add a table like this:

| Country | Tuition Cost | Living Cost |
|---------|--------------|-------------|
| Germany | €0           | €800/month  |
| USA     | $20,000/year | $1,200/month|

## Conclusion {#conclusion}

Wrap up your post with actionable advice and a personal note. Invite comments or questions if appropriate.

*Italicized text can be used for final thoughts or disclaimers.*',

  '/images/blog/your-image-name.jpg',
  'study-abroad',
  12,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'SEO-Optimized Title (Max 60 Characters)',
  'Concise, compelling meta description with focus keywords. Should be under 160 characters for search engines.',
  'https://qogent.in/blog/post-slug-with-keywords',
  TRUE,
  ARRAY['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
  0.8,
  'monthly',
  'en',
  '8d6e5aff-491e-4d51-9be5-fbef9b106ad9'
);

-- ====================================================================
-- OPTIONAL: ADD TAGS TO THE POST
-- ====================================================================
-- First ensure your tags exist in the blog_tags table
-- Then associate them with your post

-- 1. Insert tags if they don't exist
INSERT INTO blog_tags (name)
VALUES 
  ('tag1'),
  ('tag2'),
  ('tag3')
ON CONFLICT (name) DO NOTHING;

-- 2. Link tags to the post
INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
  (SELECT id FROM blog_tags WHERE name = 'tag1')
UNION ALL
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
  (SELECT id FROM blog_tags WHERE name = 'tag2')
UNION ALL
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
  (SELECT id FROM blog_tags WHERE name = 'tag3');

-- ====================================================================
-- REQUIRED: ADD TABLE OF CONTENTS ITEMS
-- ====================================================================
-- Important: Always add table of contents items for all H2 and H3 headings
-- Do not leave this section commented out - it's a required part of blog post creation
-- Make sure the titles here EXACTLY match your heading text in the content

INSERT INTO blog_toc_items (post_id, title, level, position, parent_id)
VALUES
  (
    (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
    'First Section Heading',
    2,
    1,
    NULL
  ),
  (
    (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
    'Subsection Heading',
    3,
    2,
    (SELECT id FROM blog_toc_items WHERE title = 'First Section Heading' 
      AND post_id = (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'))
  ),
  (
    (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
    'Second Main Section',
    2,
    3,
    NULL
  ),
  (
    (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
    'Conclusion',
    2,
    4,
    NULL
  );

-- ====================================================================
-- REQUIRED: ADD RELATED POSTS (MINIMUM 2)
-- ====================================================================
-- Important: Always add at least 2 related posts for better internal linking
-- If there aren't enough posts yet, add them as they become available

INSERT INTO blog_related_posts (post_id, related_post_id, position)
VALUES
  (
    (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
    (SELECT id FROM blog_posts WHERE slug = 'other-related-post-slug'),
    1
  ),
  (
    (SELECT id FROM blog_posts WHERE slug = 'post-slug-with-keywords'),
    (SELECT id FROM blog_posts WHERE slug = 'another-related-post-slug'),
    2
  ); 