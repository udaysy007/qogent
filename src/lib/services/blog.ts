import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import { generateSlug, extractTableOfContents } from '@/lib/utils'

export interface Author {
  id: string
  name: string
  role: string
  avatar_url: string
  bio?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  content: string
  image_url: string
  category: string
  read_time: number
  published_at: string
  updated_at: string
  author: Author
  tags: string[]
  related_posts: RelatedPost[]
  toc?: TableOfContentsItem[]
  // SEO fields
  meta_title?: string
  meta_description?: string
  canonical_url?: string
  is_indexed?: boolean
  structured_data?: any
  og_image_url?: string
  og_image_alt?: string
  keywords?: string[]
  last_modified?: string
  priority?: number
  change_frequency?: string
  language?: string
  translations?: Record<string, {
    title: string
    description: string
    content: string
    meta_title: string
    meta_description: string
  }>
}

export interface TableOfContentsItem {
  id: string
  slug: string
  title: string
  level: number
  items?: TableOfContentsItem[]
}

export interface RelatedPost {
  id: string
  slug: string
  title: string
  category: string
  image_url: string
}

interface BlogTag {
  blog_tags: {
    name: string;
  };
}

interface RawBlogPost {
  id: string
  slug: string
  title: string
  description: string
  content: string
  image_url: string
  category: string
  read_time: number
  published_at: string
  updated_at: string
  meta_title?: string
  meta_description?: string
  canonical_url?: string
  is_indexed?: boolean
  structured_data?: any
  og_image_url?: string
  og_image_alt?: string
  keywords?: string[]
  last_modified?: string
  priority?: number
  change_frequency?: string
  language?: string
  translations?: Record<string, {
    title: string
    description: string
    content: string
    meta_title: string
    meta_description: string
  }>
  author: {
    id: string
    name: string
    role: string
    avatar_url: string
    bio?: string
  }
  tags?: string[]
  toc?: TableOfContentsItem[]
  related_posts?: RelatedPost[]
}

export class BlogService {
  private static instance: BlogService | null = null
  private supabase: SupabaseClient

  private constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || createClient()
  }

  public static getInstance(supabaseClient?: SupabaseClient): BlogService {
    if (!BlogService.instance || supabaseClient) {
      BlogService.instance = new BlogService(supabaseClient)
    }
    return BlogService.instance
  }

  public async getFeaturedPost(): Promise<BlogPost | null> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        description,
        content,
        published_at,
        updated_at,
        read_time,
        category,
        image_url,
        author:blog_authors(
          id,
          name,
          role,
          avatar_url,
          bio
        )
      `)
      .eq('published_at', true)
      .order('published_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching featured post:', error)
      return null
    }

    return this.transformBlogPost(data)
  }

  public async getLatestPosts(limit: number = 6): Promise<BlogPost[]> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        description,
        content,
        published_at,
        updated_at,
        read_time,
        category,
        image_url,
        author:blog_authors(
          id,
          name,
          role,
          avatar_url,
          bio
        )
      `)
      .eq('published_at', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching latest posts:', error)
      return []
    }

    return data.map(this.transformBlogPost)
  }

  public async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data: post, error: postError } = await this.supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        description,
        content,
        published_at,
        updated_at,
        read_time,
        category,
        image_url,
        meta_title,
        meta_description,
        canonical_url,
        is_indexed,
        structured_data,
        og_image_url,
        og_image_alt,
        keywords,
        last_modified,
        priority,
        change_frequency,
        language,
        translations,
        author:blog_authors(
          id,
          name,
          role,
          avatar_url,
          bio
        )
      `)
      .eq('slug', slug)
      .single() as { data: RawBlogPost | null, error: any }

    if (postError || !post) {
      console.error('Error fetching post:', postError)
      return null
    }

    // Fetch tags
    const { data: tags, error: tagsError } = await this.supabase
      .from('blog_posts_tags')
      .select('blog_tags(name)')
      .eq('post_id', post.id) as { data: BlogTag[] | null; error: any }

    if (tagsError) {
      console.error('Error fetching tags:', tagsError)
    }

    // Always generate TOC dynamically from content
    const tocItems = extractTableOfContents(post.content);
    console.log('Using dynamically generated TOC for:', post.slug);

    // Fetch related posts
    const { data: relatedPosts, error: relatedError } = await this.supabase
      .from('blog_related_posts')
      .select(`
        blog_posts!blog_related_posts_related_post_id_fkey(
          id,
          slug,
          title,
          category,
          image_url
        )
      `)
      .eq('post_id', post.id)
      .order('position')

    if (relatedError) {
      console.error('Error fetching related posts:', relatedError)
    }

    return this.transformBlogPost({
      ...post,
      tags: tags?.map(t => t.blog_tags.name) || [],
      toc: tocItems,
      related_posts: relatedPosts?.map(r => r.blog_posts) || [],
      // SEO fields
      meta_title: post.meta_title || post.title,
      meta_description: post.meta_description || post.description,
      canonical_url: post.canonical_url || `https://qogent.com/blog/${post.slug}`,
      is_indexed: post.is_indexed ?? true,
      structured_data: post.structured_data || this.generateStructuredData(post),
      og_image_url: post.og_image_url || post.image_url,
      og_image_alt: post.og_image_alt || post.title,
      keywords: post.keywords || [post.category, ...(post.tags || [])],
      last_modified: post.last_modified || post.updated_at,
      priority: post.priority || 0.5,
      change_frequency: post.change_frequency || 'weekly',
      language: post.language || 'en-US',
      translations: post.translations || {}
    })
  }

  public async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        description,
        content,
        published_at,
        updated_at,
        read_time,
        category,
        image_url,
        author:blog_authors(
          id,
          name,
          role,
          avatar_url,
          bio
        )
      `)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching all posts:', error)
      return []
    }

    return data.map(post => this.transformBlogPost(post))
  }

  public async searchPosts(query?: string, category?: string): Promise<BlogPost[]> {
    let supabaseQuery = this.supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*)
      `)

    if (query) {
      supabaseQuery = supabaseQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`
      )
    }

    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category)
    }

    const { data: posts, error } = await supabaseQuery.order('published_at', { ascending: false })

    if (error) {
      console.error('Error searching posts:', error)
      return []
    }

    return posts.map(post => ({
      ...post,
      tags: [],
      related_posts: [],
      // SEO fields
      meta_title: post.meta_title || post.title,
      meta_description: post.meta_description || post.description,
      canonical_url: post.canonical_url || `https://qogent.com/blog/${post.slug}`,
      is_indexed: post.is_indexed ?? true,
      structured_data: post.structured_data || this.generateStructuredData(post),
      og_image_url: post.og_image_url || post.image_url,
      og_image_alt: post.og_image_alt || post.title,
      keywords: post.keywords || [post.category, ...(post.tags || [])],
      last_modified: post.last_modified || post.updated_at,
      priority: post.priority || 0.5,
      change_frequency: post.change_frequency || 'weekly',
      language: post.language || 'en-US',
      translations: post.translations || {}
    }))
  }

  private transformBlogPost(data: any): BlogPost {
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      content: data.content,
      image_url: data.image_url,
      category: data.category,
      read_time: data.read_time,
      published_at: data.published_at,
      updated_at: data.updated_at,
      author: data.author,
      tags: data.tags || [],
      related_posts: data.related_posts || [],
      toc: data.toc || [],
      // SEO fields
      meta_title: data.meta_title || data.title,
      meta_description: data.meta_description || data.description,
      canonical_url: data.canonical_url || `https://qogent.com/blog/${data.slug}`,
      is_indexed: data.is_indexed ?? true,
      structured_data: data.structured_data || this.generateStructuredData(data),
      og_image_url: data.og_image_url || data.image_url,
      og_image_alt: data.og_image_alt || data.title,
      keywords: data.keywords || [data.category, ...(data.tags || [])],
      last_modified: data.last_modified || data.updated_at,
      priority: data.priority || 0.5,
      change_frequency: data.change_frequency || 'weekly',
      language: data.language || 'en-US',
      translations: data.translations || {}
    }
  }

  private generateStructuredData(post: any) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: post.image_url,
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: `https://qogent.com/authors/${post.author.id}`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Qogent',
        logo: {
          '@type': 'ImageObject',
          url: 'https://qogent.com/logo.png'
        }
      },
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://qogent.com/blog/${post.slug}`
      },
      keywords: post.keywords?.join(', ') || post.category
    }
  }

  private buildTableOfContents(items: any[]): TableOfContentsItem[] {
    const itemsById = new Map<string, TableOfContentsItem>()
    const rootItems: TableOfContentsItem[] = []

    // Helper function to generate a slug if missing
    const ensureSlug = (item: any): string => {
      if (item.slug) return item.slug;
      // Generate a slug from the title if not provided
      return generateSlug(item.title);
    };

    // First pass: create all items
    items.forEach(item => {
      // Ensure the item has a slug
      const slug = ensureSlug(item);
      
      itemsById.set(item.id, {
        id: item.id,
        slug: slug,
        title: item.title,
        level: item.level,
        items: []
      })
    })

    // Second pass: build hierarchy
    items.forEach(item => {
      const tocItem = itemsById.get(item.id)!
      if (item.parent_id) {
        const parent = itemsById.get(item.parent_id)
        if (parent) {
          parent.items = parent.items || []
          parent.items.push(tocItem)
        } else {
          // If parent not found, add to root
          console.warn(`Parent item ${item.parent_id} not found for TOC item ${item.id}. Adding to root.`)
          rootItems.push(tocItem)
        }
      } else {
        rootItems.push(tocItem)
      }
    })

    return rootItems
  }
} 