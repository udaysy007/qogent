'use client'

import { useState, useEffect } from 'react'
import { BlogService } from '@/lib/services/blog'
import type { BlogPost } from '@/lib/services/blog'
import { SearchBar } from './search-bar'
import { CategoryFilter } from './category-filter'
import { BlogCard } from './blog-card'
import { cn } from '@/lib/utils'

// Refined categories based on database
const CATEGORIES = [
  'all',
  'study-abroad',
  'application-preparation',
  'test-preparation',
  'career-development',
  'financial-planning',
  'country-comparison',
  'study-destinations'
]

interface BlogListingProps {
  initialPosts: BlogPost[]
}

export function BlogListing({ initialPosts }: BlogListingProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const searchPosts = async () => {
      if (!searchQuery && activeCategory === 'all') {
        setPosts(initialPosts)
        return
      }

      setIsLoading(true)
      try {
        const blogService = BlogService.getInstance()
        const filteredPosts = await blogService.searchPosts(searchQuery, activeCategory !== 'all' ? activeCategory : undefined)
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
      {/* Search and Filter Section */}
      <div className="sticky top-4 z-10 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-2xl mx-auto"
        />
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Blog Posts Grid */}
      <div className={cn(
        'grid gap-6',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        isLoading && 'opacity-50'
      )}>
        {isLoading ? (
          // Skeleton Loading
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'relative overflow-hidden rounded-xl',
                'bg-muted/50 animate-pulse',
                'border border-border/50',
                'aspect-[1.5]'
              )}
            />
          ))
        ) : (
          // Actual Posts
          posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              priority={index < 6}
            />
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            No posts found for your search.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
} 