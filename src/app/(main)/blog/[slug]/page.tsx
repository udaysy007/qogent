import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { Clock, Calendar, ArrowLeft, Share2, Bookmark, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { ContentFormatter } from '@/components/blog/content-formatter'
import { RelatedPosts, type RelatedPost as UIRelatedPost } from '@/components/blog/related-posts'
import { CallToAction } from '@/components/blog/call-to-action'
import { FragmentScroller } from '@/components/blog/fragment-scroller'
import { BlogService } from '@/lib/services/blog'
import { createServerClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/lib/services/blog'

function transformRelatedPosts(posts: BlogPost['related_posts']): UIRelatedPost[] {
  return posts?.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category,
    image: post.image_url
  })) || []
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const blogService = BlogService.getInstance(supabase)
  const post = await blogService.getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - Qogent',
      description: 'The requested blog post could not be found.'
    }
  }
  
  return {
    title: post.meta_title || `${post.title} - Qogent Blog`,
    description: post.meta_description || post.description,
    keywords: post.keywords?.join(', '),
    robots: {
      index: post.is_indexed,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
    alternates: {
      canonical: post.canonical_url
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.description,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.last_modified || post.updated_at,
      authors: [post.author.name],
      images: [
        {
          url: post.og_image_url || post.image_url,
          width: 1200,
          height: 630,
          alt: post.og_image_alt || post.title
        }
      ],
      locale: post.language || 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.description,
      images: [post.og_image_url || post.image_url]
    }
  }
}

// Blog Post Header Component
function BlogPostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="relative min-h-[70vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 sm:px-6 pb-16 pt-32">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="rounded-full">
              {post.category}
            </Badge>
            <span className="inline-flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {post.read_time}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            {post.description}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {post.author.avatar_url && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex flex-col text-left">
              <span className="text-sm text-muted-foreground">Published</span>
              <time className="font-medium">
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const blogService = BlogService.getInstance(supabase)
  
  // Get the post with dynamic TOC generation (now the default)
  const post = await blogService.getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.structured_data) }}
      />
      <article className="min-h-screen" lang={post.language}>
        <BlogPostHeader post={post} />
        <FragmentScroller />
        
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto lg:mx-0">
              <ContentFormatter content={post.content} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Share and Save */}
              <div className="flex items-center gap-4 mt-12">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
              </div>

              {/* Author Bio */}
              {post.author.bio && (
                <div className="mt-12 p-6 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4 mb-4">
                    {post.author.avatar_url && (
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={post.author.avatar_url}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              )}

              {/* Related Posts */}
              {post.related_posts && post.related_posts.length > 0 && (
                <div className="mt-16">
                  <RelatedPosts posts={transformRelatedPosts(post.related_posts)} />
                </div>
              )}

              {/* Call to Action */}
              <div className="mt-16">
                <CallToAction />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:block">
              <div className="sticky top-8">
                {post.toc && post.toc.length > 0 && (
                  <TableOfContents items={post.toc} />
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
} 