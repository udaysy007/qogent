'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, Clock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Temporary sample data - would be replaced with actual data from API/CMS
const FEATURED_POST = {
  id: 'study-in-germany-guide',
  title: 'Study in Germany: The Complete Guide for 2024',
  description: 'Everything you need to know about German universities, application processes, visas, costs, and scholarships.',
  category: 'Country Guide',
  readTime: '12 min',
  publishDate: 'Apr 5, 2024',
  author: {
    name: 'Sarah Chen',
    role: 'Education Consultant',
    avatar: '/images/blog/avatars/sarah-chen.jpg'
  },
  image: '/images/blog/featured-germany.jpg',
  slug: '/blog/study-in-germany-guide'
}

const BLOG_POSTS = [
  {
    id: 'canada-study-guide',
    title: 'Studying in Canada: Programs, Costs, and Opportunities',
    description: 'A comprehensive overview of what makes Canada an excellent destination for international students.',
    category: 'Country Guide',
    readTime: '10 min',
    publishDate: 'Apr 2, 2024',
    image: '/images/blog/canada-study.jpg',
    slug: '/blog/canada-study-guide'
  },
  {
    id: 'statement-of-purpose',
    title: 'How to Write a Winning Statement of Purpose: Examples and Templates',
    description: 'Learn how to craft a compelling statement that will make your application stand out from the crowd.',
    category: 'Application Success',
    readTime: '8 min',
    publishDate: 'Mar 28, 2024',
    image: '/images/blog/statement-purpose.jpg',
    slug: '/blog/statement-of-purpose'
  },
  {
    id: 'scholarships-guide',
    title: 'Complete Guide to Scholarships for International Students in 2024',
    description: 'Discover the best funding opportunities available for international students across the globe.',
    category: 'Financial Planning',
    readTime: '15 min',
    publishDate: 'Mar 25, 2024',
    image: '/images/blog/scholarships.jpg',
    slug: '/blog/scholarships-guide'
  },
  {
    id: 'first-30-days',
    title: 'First 30 Days Abroad: What to Expect and How to Adapt',
    description: 'Practical advice for navigating your first month as an international student in a new country.',
    category: 'Student Experience',
    readTime: '9 min',
    publishDate: 'Mar 20, 2024',
    image: '/images/blog/first-30-days.jpg',
    slug: '/blog/first-30-days'
  },
  {
    id: 'usa-study-guide',
    title: 'USA Study Guide: Finding Your Ideal University',
    description: 'Navigate the complex US higher education system and find the perfect institution for your goals.',
    category: 'Country Guide',
    readTime: '14 min',
    publishDate: 'Mar 15, 2024',
    image: '/images/blog/usa-study.jpg',
    slug: '/blog/usa-study-guide'
  },
  {
    id: 'career-opportunities',
    title: 'Leveraging Your International Degree for Career Success',
    description: 'How to maximize the career benefits of your international education experience.',
    category: 'Career Development',
    readTime: '11 min',
    publishDate: 'Mar 10, 2024',
    image: '/images/blog/career-success.jpg',
    slug: '/blog/career-opportunities'
  }
]

// Categories based on our content strategy
const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'country-guides', label: 'Country Guides' },
  { id: 'application', label: 'Application Success' },
  { id: 'financial', label: 'Financial Planning' },
  { id: 'experience', label: 'Student Experience' },
  { id: 'career', label: 'Career Development' }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS)

  // Filter posts based on search query and active category
  useEffect(() => {
    let filtered = [...BLOG_POSTS]
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      )
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      // Map UI categories to content categories
      const categoryMap: Record<string, string[]> = {
        'country-guides': ['Country Guide'],
        'application': ['Application Success'],
        'financial': ['Financial Planning'],
        'experience': ['Student Experience'],
        'career': ['Career Development']
      }
      
      const categories = categoryMap[activeCategory] || []
      filtered = filtered.filter(post => categories.includes(post.category))
    }
    
    setFilteredPosts(filtered)
  }, [searchQuery, activeCategory])

  return (
    <div className="container py-10 px-4 sm:px-6 lg:py-16">
      {/* SEO Heading */}
      <h1 className="sr-only">Qogent Blog: International Education Guides & Resources</h1>
      
      {/* Blog Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">The Qogent Blog</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Expert guides, practical advice, and insider perspectives on international education
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Featured Post */}
      <div className="mb-16">
        <div className="overflow-hidden rounded-lg shadow-md dark:shadow-primary/5 transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/10">
          <div className="md:grid md:grid-cols-2 md:items-center">
            <div className="relative aspect-[16/9] md:aspect-square h-full max-h-[400px] md:max-h-none overflow-hidden">
              <Image
                src={FEATURED_POST.image}
                alt={FEATURED_POST.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {FEATURED_POST.category}
                </span>
                <span className="inline-flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {FEATURED_POST.readTime}
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">
                {FEATURED_POST.title}
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {FEATURED_POST.description}
              </p>
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  {FEATURED_POST.author.avatar && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={FEATURED_POST.author.avatar}
                        alt={FEATURED_POST.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{FEATURED_POST.author.name}</p>
                    <p className="text-xs text-muted-foreground">{FEATURED_POST.author.role}</p>
                  </div>
                </div>
                <Button asChild className="w-full sm:w-auto">
                  <Link href={FEATURED_POST.slug}>
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Categories and Listings */}
      <Tabs defaultValue="all" className="mb-16" onValueChange={setActiveCategory}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm whitespace-nowrap">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value={activeCategory} className="mt-0">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No articles found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Newsletter Signup */}
      <div className="rounded-lg bg-muted p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"></div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Get the latest articles, tools, and resources delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="sm:max-w-md"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            By subscribing, you agree to our Privacy Policy. You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

// Blog Post Card Component
function BlogPostCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md dark:hover:shadow-primary/5">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {post.category}
          </span>
          <span className="inline-flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{post.publishDate}</span>
        <Button variant="ghost" size="sm" asChild>
          <Link href={post.slug}>
            Read more <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 