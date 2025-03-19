'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogService } from '@/lib/services/blog'
import type { BlogPost } from '@/lib/services/blog'

const CATEGORIES = [
  'All',
  'Education',
  'Technology',
  'Career',
  'Study Abroad',
  'Student Life',
  'Research'
]

interface BlogPostCardProps {
  post: BlogPost
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="flex flex-col space-y-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {post.read_time} min read
            </div>
          </div>
          <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="text-muted-foreground">{post.description}</p>
        </div>
      </article>
    </Link>
  )
}

interface BlogListingProps {
  initialPosts: BlogPost[]
}

export function BlogListing({ initialPosts }: BlogListingProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const searchPosts = async () => {
      if (!searchQuery && activeCategory === 'All') {
        setPosts(initialPosts)
        return
      }

      setIsLoading(true)
      try {
        const blogService = BlogService.getInstance()
        const filteredPosts = await blogService.searchPosts(searchQuery, activeCategory !== 'All' ? activeCategory : undefined)
        setPosts(filteredPosts)
      } catch (error) {
        console.error('Error searching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPosts, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, activeCategory, initialPosts])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category} className="flex-1 sm:flex-none">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse flex-col space-y-4"
            >
              <div className="aspect-[16/9] rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-1/3 rounded bg-muted" />
                <div className="h-6 w-full rounded bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
} 