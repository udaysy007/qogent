import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { BlogService } from '@/lib/services/blog'
import { createServerClient } from '@/lib/supabase/server'
import { BlogListing } from '@/components/blog/blog-listing'

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
    canonical: 'https://qogent.com/blog'
  },
  openGraph: {
    title: 'Qogent Blog',
    description: 'Explore our latest insights, tutorials, and updates on education, technology, and more.',
    type: 'website',
    url: 'https://qogent.com/blog',
    siteName: 'Qogent',
    images: [
      {
        url: 'https://qogent.com/images/blog/og-image.jpg',
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
    images: ['https://qogent.com/images/blog/og-image.jpg']
  }
}

export default async function BlogPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const blogService = BlogService.getInstance(supabase)
  const posts = await blogService.getAllPosts()
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Qogent Blog',
            description: 'Explore our latest insights, tutorials, and updates on education, technology, and more.',
            url: 'https://qogent.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'Qogent',
              logo: {
                '@type': 'ImageObject',
                url: 'https://qogent.com/logo.png'
              }
            }
          })
        }}
      />
      <div className="container py-8 md:py-12">
        <BlogListing initialPosts={posts} />
      </div>
    </>
  )
} 