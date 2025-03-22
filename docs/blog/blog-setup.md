# Blog Setup Documentation

## Overview
The blog system is built using Next.js and Supabase, providing a modern, performant, and easy-to-maintain blogging platform. It supports features like table of contents, tags, related posts, and comprehensive SEO optimization.

## Database Schema

### Tables

#### 1. blog_posts
Main table for storing blog posts.
- `id` (uuid): Unique identifier
- `slug` (string): URL-friendly identifier
- `title` (string): Post title
- `description` (text): Brief description/excerpt
- `content` (text): Main content in Markdown format
- `image_url` (string): Featured image URL
- `category` (string): Post category
- `read_time` (integer): Estimated reading time in minutes
- `published_at` (timestamp): Publication date
- `updated_at` (timestamp): Last update date
- `meta_title` (string, 60 chars max): SEO-optimized title (strict 60 character limit)
- `meta_description` (string, 160 chars max): SEO-optimized description (strict 160 character limit)
- `canonical_url` (text): Canonical URL for handling duplicates
- `is_indexed` (boolean): Control search engine indexing
- `structured_data` (jsonb): Schema.org structured data
- `og_image_url` (text): Open Graph specific image
- `og_image_alt` (text): Alt text for OG image
- `keywords` (text[]): SEO keywords array
- `last_modified` (timestamp): Last content modification
- `priority` (decimal): Sitemap priority (0.0-1.0)
- `change_frequency` (string): Sitemap update frequency
- `language` (string): Content language code
- `translations` (jsonb): Translations data
- `author_id` (uuid, required): Reference to blog_authors table (cannot be null)

#### 2. blog_authors
Table for storing author information.
- `id` (uuid): Unique identifier
- `name` (string): Author's name
- `role` (string): Author's role/title
- `avatar_url` (string): Author's profile image URL
- `bio` (text): Author's biography

#### 3. blog_tags
Table for storing available tags.
- `id` (uuid): Unique identifier
- `name` (string): Tag name

#### 4. blog_posts_tags
Junction table for post-tag relationships.
- `post_id` (uuid): Reference to blog_posts
- `tag_id` (uuid): Reference to blog_tags

#### 5. blog_toc_items
Table for storing table of contents items.
- `id` (uuid): Unique identifier
- `post_id` (uuid): Reference to blog_posts
- `title` (string): Section title
- `level` (integer): Heading level (1-6)
- `position` (integer): Order in the TOC
- `parent_id` (uuid, nullable): Reference to parent TOC item

#### 6. blog_related_posts
Table for managing related posts.
- `post_id` (uuid): Reference to the main post
- `related_post_id` (uuid): Reference to the related post
- `position` (integer): Order in the related posts list

#### 7. blog_redirects
Table for managing URL redirects.
- `id` (uuid): Unique identifier
- `old_path` (text): Original URL path
- `new_path` (text): Target URL path
- `status_code` (integer): HTTP status code (default: 301)
- `created_at` (timestamp): Redirect creation date

## Features

### 1. Blog Listing
- Responsive grid layout
- Search functionality
- Category filtering
- Loading states with skeleton UI
- Mobile-first design

### 2. Individual Blog Posts
- Rich content formatting
- Table of contents with smooth scrolling
- Author information
- Related posts
- Share and bookmark functionality
- Tags
- Responsive images

### 3. SEO
- Dynamic metadata generation
- OpenGraph and Twitter card support
- Structured data (Schema.org)
- Canonical URLs
- Multi-language support
- Automatic sitemap generation
- Meta tags optimization
- URL redirection management
- Search engine indexing control
- Rich snippets support
- Social media optimization
- Content internationalization

## How to Publish a New Blog Post

1. **Prepare the Content**
   - Write the content in Markdown format
   - Prepare a featured image (recommended size: 1200x630px)
   - Prepare an Open Graph image (if different from featured)
   - Identify relevant tags and category
   - Write SEO-optimized title (max 60 characters) and description (max 160 characters)
   - Identify target keywords

2. **Insert into Database**
   ```sql
   -- 1. Insert the blog post with SEO fields
   INSERT INTO blog_posts (
     slug,
     title,
     description,
     content,
     image_url,
     category,
     read_time,
     published_at,
     updated_at,
     meta_title,
     meta_description,
     canonical_url,
     og_image_url,
     og_image_alt,
     keywords,
     priority,
     change_frequency,
     language,
     author_id
   ) VALUES (
     'your-post-slug',
     'Your Post Title',
     'Brief description',
     'Markdown content',
     'image-url',
     'category-name',
     5,
     NOW(),
     NOW(),
     'SEO-Optimized Title (max 60 chars)',
     'SEO-Optimized description (max 160 chars)',
     'https://qogent.in/blog/your-post-slug',
     'og-image-url',
     'Descriptive alt text for social sharing',
     ARRAY['keyword1', 'keyword2', 'keyword3'],
     0.8,
     'weekly',
     'en-US',
     '8d6e5aff-491e-4d51-9be5-fbef9b106ad9' -- Uday Yatnalli's author ID (use for ALL blog posts)
   );

   -- 2. Add tags
   INSERT INTO blog_posts_tags (post_id, tag_id)
   SELECT 
     (SELECT id FROM blog_posts WHERE slug = 'your-post-slug'),
     id 
   FROM blog_tags 
   WHERE name = ANY(ARRAY['tag1', 'tag2']);

   -- 3. Add table of contents (if needed)
   INSERT INTO blog_toc_items (
     post_id,
     title,
     level,
     position,
     parent_id
   ) VALUES (
     'post-id',
     'Section Title',
     2,
     1,
     null
   );
   ```

## SEO Best Practices

1. **Meta Tags**
   - Keep titles under 60 characters
   - Write descriptions between 150-160 characters
   - Use relevant keywords naturally
   - Create unique meta content for each page

2. **Content Structure**
   - Use proper heading hierarchy (H1-H6)
   - Include relevant internal links
   - Optimize images with alt text
   - Structure content with semantic HTML

3. **Technical SEO**
   - Implement canonical URLs
   - Use structured data appropriately
   - Maintain proper language tags
   - Set up 301 redirects for URL changes

4. **Social Media**
   - Customize Open Graph images
   - Write engaging social descriptions
   - Use appropriate social card types
   - Include author information

5. **Internationalization**
   - Use proper language codes
   - Implement hreflang tags
   - Provide translated content
   - Maintain consistent URL structure

## Content Formatting Guidelines

### Tables
Tables should be formatted using HTML syntax rather than Markdown to ensure proper rendering across all devices. Always wrap tables in a `table-wrapper` div for responsive behavior:

```html
<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Content 1</td>
      <td>Content 2</td>
    </tr>
  </tbody>
</table>
</div>
```

**Best practices for tables:**
- Keep tables simple and focused on essential information
- Ensure column headers are clear and concise
- Use consistent formatting within table cells
- Avoid overly wide tables that might break the mobile layout
- For data-heavy tables, consider adding a caption for accessibility

**Avoid:**
- Markdown table syntax (e.g., `| Header | Header |`)
- Nested tables
- Tables with excessive columns (more than 4-5 on mobile)
- Empty cells without content

### Markdown Formatting
For markdown formatting:
- Use **bold text** for emphasis
- Use *italics* for secondary emphasis
- Use > for blockquotes
- Use numbered lists for sequential steps
- Use bullet points for unordered lists

## Limitations

1. **Content Formatting**
   - Limited to Markdown format with HTML tables
   - No real-time preview during content creation
   - Manual table of contents creation

2. **Media Management**
   - No built-in media upload system
   - Images must be hosted externally
   - No image optimization pipeline

3. **Author Management**
   - Single author per post
   - No author roles/permissions system

4. **Search**
   - Basic text-based search
   - No full-text search capabilities
   - No search result highlighting

## Future Enhancements

1. **Content Management**
   - [ ] Admin interface for content creation
   - [ ] WYSIWYG editor with Markdown support
   - [ ] Automatic table of contents generation
   - [ ] Draft system with preview

2. **Media**
   - [ ] Integrated media upload system
   - [ ] Image optimization and responsive images
   - [ ] Asset management interface

3. **SEO & Performance**
   - [ ] Automatic meta description generation
   - [ ] Image alt text suggestions
   - [ ] Performance analytics
   - [ ] RSS feed generation

4. **Search & Discovery**
   - [ ] Elasticsearch integration
   - [ ] Related posts based on content similarity
   - [ ] Tag cloud and better taxonomy management

5. **Social & Engagement**
   - [ ] Comments system
   - [ ] Social sharing analytics
   - [ ] Newsletter integration
   - [ ] Reading progress tracking

## Best Practices

1. **Content Creation**
   - Use descriptive slugs for better SEO
   - Include a high-quality featured image
   - Write compelling meta descriptions
   - Structure content with proper headings
   - Include relevant tags for better discoverability
   - Follow voice and tone guidelines from `blog-voice-tone.md`

2. **Performance**
   - Optimize images before uploading
   - Keep content well-structured
   - Use appropriate heading levels
   - Limit the number of related posts

3. **Maintenance**
   - Regularly update content
   - Monitor and fix broken links
   - Keep tags and categories organized
   - Review and update related posts

## Support

For technical issues or feature requests, please create an issue in the project repository. For content-related questions, contact the content team.

## Common Issues and Troubleshooting

1. **Field Length Limitations**
   - `meta_title` has a strict 60 character limit
   - `meta_description` has a strict 160 character limit
   - Exceeding these limits will cause SQL errors when inserting/updating

2. **Required Fields**
   - `author_id` is a required field and cannot be null
   - **IMPORTANT**: Use Uday Yatnalli's ID for ALL blog posts: `8d6e5aff-491e-4d51-9be5-fbef9b106ad9`
   - This is the standard author ID for all content on the platform

3. **Tag Handling**
   - Ensure tags exist before associating them with posts
   - Best practice is to first insert tags with ON CONFLICT DO NOTHING
   - Use a WITH statement to get the post_id for related operations

4. **SQL Migrations Best Practices**
   - Use WITH statements to handle dependencies between tables
   - For TOC items and related posts, use the post slug to retrieve the ID
   - Validate all field lengths before running migrations 