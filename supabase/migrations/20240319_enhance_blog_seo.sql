-- Add SEO fields to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN meta_title VARCHAR(60), -- Optimal length for search engines
ADD COLUMN meta_description VARCHAR(160), -- Optimal length for search snippets
ADD COLUMN canonical_url TEXT, -- For handling duplicate content
ADD COLUMN is_indexed BOOLEAN DEFAULT true, -- Control search engine indexing
ADD COLUMN structured_data JSONB, -- For rich snippets/structured data
ADD COLUMN og_image_url TEXT, -- Specific image for social sharing
ADD COLUMN og_image_alt TEXT, -- Alt text for social image
ADD COLUMN keywords TEXT[], -- SEO keywords array
ADD COLUMN last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- For sitemap
ADD COLUMN priority DECIMAL(2,1) DEFAULT 0.5, -- For sitemap priority
ADD COLUMN change_frequency VARCHAR(10) DEFAULT 'weekly'; -- For sitemap

-- Create blog_redirects table for handling URL redirects
CREATE TABLE IF NOT EXISTS blog_redirects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    old_path TEXT NOT NULL,
    new_path TEXT NOT NULL,
    status_code INTEGER DEFAULT 301,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique index on old_path
CREATE UNIQUE INDEX blog_redirects_old_path_idx ON blog_redirects(old_path);

-- Add language support for internationalization
ALTER TABLE blog_posts
ADD COLUMN language VARCHAR(5) DEFAULT 'en-US',
ADD COLUMN translations JSONB;

-- Create function to automatically update last_modified
CREATE OR REPLACE FUNCTION update_blog_post_last_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update last_modified
CREATE TRIGGER blog_post_last_modified
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_post_last_modified();

-- Update existing posts with default SEO values
UPDATE blog_posts
SET 
    meta_title = title,
    meta_description = description,
    canonical_url = CONCAT('https://qogent.com/blog/', slug),
    keywords = ARRAY[category],
    structured_data = jsonb_build_object(
        '@context', 'https://schema.org',
        '@type', 'BlogPosting',
        'headline', title,
        'description', description,
        'image', image_url,
        'datePublished', published_at,
        'dateModified', updated_at
    ); 