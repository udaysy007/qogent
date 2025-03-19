-- Create authors table
CREATE TABLE IF NOT EXISTS blog_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES blog_authors(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create posts_tags junction table
CREATE TABLE IF NOT EXISTS blog_posts_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create table of contents items table
CREATE TABLE IF NOT EXISTS blog_toc_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  level INTEGER NOT NULL,
  parent_id UUID REFERENCES blog_toc_items(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create related posts table
CREATE TABLE IF NOT EXISTS blog_related_posts (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  related_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  PRIMARY KEY (post_id, related_post_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_toc_items_post_id_idx ON blog_toc_items(post_id);
CREATE INDEX IF NOT EXISTS blog_posts_tags_post_id_idx ON blog_posts_tags(post_id);
CREATE INDEX IF NOT EXISTS blog_posts_tags_tag_id_idx ON blog_posts_tags(tag_id);

-- Add RLS policies
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_toc_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_related_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON blog_authors
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "Allow public read access" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON blog_posts_tags
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON blog_toc_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON blog_related_posts
  FOR SELECT USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Allow admin full access" ON blog_authors
  FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Allow admin full access" ON blog_posts
  FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Allow admin full access" ON blog_tags
  FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Allow admin full access" ON blog_posts_tags
  FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Allow admin full access" ON blog_toc_items
  FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Allow admin full access" ON blog_related_posts
  FOR ALL USING (auth.role() = 'admin');

-- Create functions for managing timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updating timestamps
CREATE TRIGGER update_blog_authors_updated_at
  BEFORE UPDATE ON blog_authors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at(); 