# Blog Creation Process

This document outlines the step-by-step process for creating new blog posts in the Qogent system.

## Step 1: Planning and Preparation

1. Review the `blogtopics.md` file to identify the next priority topic for blog creation
2. Verify the blog doesn't already exist by checking the database:
   ```sql
   SELECT slug FROM blog_posts ORDER BY published_at DESC;
   ```
3. Review blog-related documentation:
   - `blog-setup.md`: Technical requirements and database schema
   - `blog-voice-tone.md`: Writing style guidelines
   - Blog template files in `supabase/migrations/templates/`

## Step 2: Create New SQL Migration Files Using Templates

We now have standardized templates for blog creation in the `supabase/migrations/templates/` directory:

1. `blog_template_basic.sql`: Creates the initial blog post entry
2. `blog_template_tags.sql`: Associates tags with the blog post
3. `blog_template_related.sql`: Links related posts
4. `blog_template_content.sql`: Updates the post with the full content

For each new blog post, create four separate SQL files by copying and modifying these templates:

```
supabase/migrations/[date]_blog_[topic].sql
supabase/migrations/[date]_blog_[topic]_tags.sql
supabase/migrations/[date]_blog_[topic]_related.sql
supabase/migrations/[date]_blog_[topic]_content.sql
```

### 2.1. Create the Basic Blog Post File

1. Copy `supabase/migrations/templates/blog_template_basic.sql` to your new file
2. Update all placeholder values:
   - `[TITLE]`: The blog post title
   - `[keyword1]`, `[keyword2]`, etc.: Target keywords
   - `[Focus description]`: The blog post focus
   - `[Update frequency]`: How often the blog should be updated
   - `[slug-with-hyphens]`: URL-friendly slug with hyphens
   - `[Full Title]`: The complete blog post title
   - `[Short description under 160 characters]`: Blog description (keep under 160 chars)
   - `[image-name]`: The filename of the blog image
   - `[category]`: Blog category
   - `[estimated_minutes]`: Estimated reading time in minutes
   - `[SEO Title (under 60 characters)]`: SEO-optimized title (keep under 60 chars)
   - `[SEO Description (under 160 characters)]`: SEO description (keep under 160 chars)
   - `[monthly/quarterly/annual]`: Content update frequency

## Step 3: Prepare and Add the Image

1. Find a relevant, high-quality image from Unsplash
2. Download the image to the correct location:
   ```
   curl -L "https://images.unsplash.com/[image-id]?q=80&w=1200&h=630&fit=crop&auto=format" --output public/images/blog/[image-name].jpg
   ```
3. Verify the image download was successful

## Step 4: Execute the Basic Migration

1. Run the basic SQL migration to create the post without content:
   ```
   export PGPASSWORD="E1d_1di4u:)" && psql -h db.kavkopyjktifvtxqgcft.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/[date]_blog_[topic].sql
   ```
2. If you encounter errors:
   - Check for character limit issues (meta_title: 60 chars, meta_description: 160 chars)
   - Look for syntax errors, especially with escaping single quotes
   - Fix and retry until the basic post is created

## Step 5: Prepare and Execute the Tags Migration

1. Copy `supabase/migrations/templates/blog_template_tags.sql` to your new tags file
2. Update the following:
   - Replace `[Tag 1]`, `[Tag 2]`, etc. with your actual tag names
   - Update `[slug-with-hyphens]` to match your blog post slug
3. Execute the tags migration:
   ```
   export PGPASSWORD="E1d_1di4u:)" && psql -h db.kavkopyjktifvtxqgcft.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/[date]_blog_[topic]_tags.sql
   ```

## Step 6: Prepare and Execute the Content Migration

1. Copy `supabase/migrations/templates/blog_template_content.sql` to your new content file
2. Update the content with your full blog post, replacing all placeholders
3. Important: Escape all single quotes in the content with double single quotes (`''`)
4. Update `[slug-with-hyphens]` to match your blog post slug
5. Execute the content migration:
   ```
   export PGPASSWORD="E1d_1di4u:)" && psql -h db.kavkopyjktifvtxqgcft.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/[date]_blog_[topic]_content.sql
   ```

## Step 7: Prepare and Execute the Related Posts Migration

1. Copy `supabase/migrations/templates/blog_template_related.sql` to your new related posts file
2. Update the following:
   - Replace `[slug-with-hyphens]` with your blog post slug
   - Replace `[related-post-1-slug]` and `[related-post-2-slug]` with actual related post slugs
3. Execute the related posts migration:
   ```
   export PGPASSWORD="E1d_1di4u:)" && psql -h db.kavkopyjktifvtxqgcft.supabase.co -p 5432 -d postgres -U postgres -f supabase/migrations/[date]_blog_[topic]_related.sql
   ```

## Step 8: Update the blogtopics.md File

1. Edit the `docs/blogtopics.md` file to mark the topic as completed:
   ```markdown
   10. **Letter of Recommendation Guide: Getting Strong Letters** ✅
   ```

## Common Problems and Solutions

### 1. Meta Title/Description Length

**Problem**: Error when meta_title exceeds 60 characters or meta_description exceeds 160 characters.
```
ERROR: value too long for type character varying(60)
```

**Solution**: Shorten them to fit within limits.

### 2. SQL Syntax Issues with Apostrophes and Quotes

**Problem**: SQL errors when content contains single quotes.
```
ERROR: syntax error at or near "m"
```

**Solution**: Escape all single quotes with double single quotes (`''`).

### 3. Null Foreign Key Issues with Tags and Related Posts

**Problem**: Error when trying to link tags or related posts to a post that doesn't exist yet.
```
ERROR: null value in column "post_id" of relation "blog_posts_tags" violates not-null constraint
```

**Solution**: Use the template files which already include PL/pgSQL blocks with proper error handling.

### 4. Content Too Large for Single Migration

**Problem**: Large content can cause issues during migration.

**Solution**: Follow the multi-file approach with our templates - create a minimal post first, then update content separately.

## Recommendations for Blog Creation Workflow

1. **Use the Template Files**: Always start with the template files from `supabase/migrations/templates/` directory.

2. **Verify Character Limits Early**: Check meta_title (60 chars) and meta_description (160 chars) before migration.

3. **Follow the Four-File Approach**: Maintain separation between:
   - Base post creation (blog_template_basic.sql)
   - Tag linking (blog_template_tags.sql)
   - Content update (blog_template_content.sql)
   - Related posts linking (blog_template_related.sql)

4. **Test Content Migration Separately**: For complex content, test small sections of the SQL before running the full migration.

5. **Keep Migration Files for Reference**: After successful migrations, move files to the `supabase/migrations/backup/` directory rather than deleting them.

6. **Always Escape Special Characters**: Be especially careful with single quotes in content.

7. **Follow the Order of Operations**: Always create posts in this sequence:
   1. Basic post creation
   2. Tag linking
   3. Content update
   4. Related posts linking 