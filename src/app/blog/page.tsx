import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { BlogService } from '@/lib/services/blog'
import { createClient } from '@/lib/supabase-client'
import { BlogListing } from '@/components/blog/blog-listing'
import { BlogHero } from '@/components/sections/blog-hero'

export const metadata: Metadata = {
  title: 'Blog - Qogent',
  description: 'Explore our latest insights, tutorials, and updates on education, technology, and more.',
  keywords: 'education, technology, career, study abroad, student life, research',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  },
  alternates: {
    canonical: 'https://qogent.in/blog'
  },
  openGraph: {
    title: 'Qogent Blog',
    description: 'Explore our latest insights, tutorials, and updates on education, technology, and more.',
    type: 'website',
    url: 'https://qogent.in/blog',
    siteName: 'Qogent',
    images: [
      {
        url: 'https://qogent.in/images/blog/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Qogent Blog'
      }
    ],
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qogent Blog',
    description: 'Explore our latest insights, tutorials, and updates on education, technology, and more.',
    images: ['https://qogent.in/images/blog/og-image.jpg']
  }
}

export default async function BlogPage() {
  try {
    // Create the Supabase client
    const supabase = createClient()
    
    // Initialize the blog service
    const blogService = BlogService.getInstance(supabase)
    
    // Get all posts - no need to wait for session for public blog
    const posts = await blogService.getAllPosts()

    return (
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Qogent Blog',
              description: 'Explore our latest insights, tutorials, and updates on education, technology, and more.',
              url: 'https://qogent.in/blog',
              publisher: {
                '@type': 'Organization',
                name: 'Qogent',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://qogent.in/logo.png'
                }
              }
            })
          }}
        />
        <BlogHero />
        <div className="container pt-0 pb-8 md:pb-12">
          <BlogListing initialPosts={posts} />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error in BlogPage:', error)
    // Return a fallback UI in case of error
    return (
      <main>
        <BlogHero />
        <div className="container pt-0 pb-8 md:pb-12">
          <BlogListing initialPosts={[]} />
        </div>
      </main>
    )
  }
} 