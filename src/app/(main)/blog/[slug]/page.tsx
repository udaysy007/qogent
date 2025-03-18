import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TableOfContents, TableOfContentsItem } from '@/components/blog/table-of-contents'
import { ContentFormatter } from '@/components/blog/content-formatter'
import { RelatedPosts, RelatedPost as RelatedPostType } from '@/components/blog/related-posts'
import { CallToAction } from '@/components/blog/call-to-action'

// Types for blog content
export interface Author {
  id: string
  name: string
  role: string
  avatar: string
  bio?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  content: string
  publishDate: string
  updateDate?: string
  readTime: string
  category: string
  image: string
  author: Author
  tags?: string[]
  toc?: TableOfContentsItem[]
  relatedPosts?: RelatedPostType[]
}

// This would be replaced with a real data fetch in production
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // In a real implementation, this would fetch from a CMS or API
  // For now, return mock data if the slug matches our example
  if (slug === 'study-in-germany-guide') {
    return {
      id: 'study-in-germany-guide',
      slug: 'study-in-germany-guide',
      title: 'Study in Germany: The Complete Guide for 2024',
      description: 'Everything you need to know about German universities, application processes, visas, costs, and scholarships.',
      content: `
# Study in Germany: The Complete Guide for 2024

Germany has become one of the most popular destinations for international students, and for good reason. With its **tuition-free public universities**, strong economy, and high quality of life, studying in Germany offers an incredible opportunity for students from around the world.

This comprehensive guide will walk you through everything you need to know about studying in Germany, from choosing the right university to navigating the visa process and finding accommodation.

## German Education System Overview

The German higher education system is renowned for its quality and consists of several types of institutions:

### Universities (Universitäten)

Traditional universities in Germany focus on theoretical and research-oriented education. They offer a wide range of programs and are ideal for students interested in academic research.

### Universities of Applied Sciences (Fachhochschulen)

These institutions offer more practical, career-oriented programs and often have strong connections with industry partners. They're excellent choices for students seeking hands-on experience alongside their academic studies.

### Colleges of Art, Film, and Music

Specialized institutions focusing on creative disciplines and performing arts, perfect for students pursuing careers in these fields.

## Admission Requirements

Admission requirements vary depending on your country of origin and the specific program you're applying to. However, there are some common requirements:

1. **Secondary School Leaving Certificate** - Your high school diploma or equivalent must be recognized in Germany
2. **Language Proficiency** - Most programs require proof of German language skills (DSH or TestDaF) or English for international programs
3. **University Entrance Examination** - Some applicants may need to take an assessment test
4. **Previous Academic Records** - Transcripts and grades from prior education

## Application Process

The application process generally follows these steps:

1. **Research and Select Programs** - Identify universities and programs that match your interests and qualifications
2. **Check Requirements** - Review specific admission requirements for your chosen programs
3. **Prepare Documentation** - Gather all necessary documents (certificates, language test results, etc.)
4. **Submit Application** - Either directly to the university or through uni-assist (a centralized application service)
5. **Wait for Admission Decision** - This can take several weeks or months
6. **Accept Offer and Prepare for Arrival** - Once accepted, confirm your place and prepare for your move

## Tuition and Costs

One of Germany's biggest attractions for international students is its affordable education:

### Tuition Fees

Public universities in most German states offer tuition-free education for all students, regardless of nationality. However, there are some exceptions:

- Baden-Württemberg charges non-EU students approximately €1,500 per semester
- All students pay a semester contribution (€250-350) covering administrative costs and public transportation

### Living Expenses

Monthly living expenses typically range from €850-1,000, depending on the city and lifestyle:

- Accommodation: €300-500
- Food: €200-250
- Health insurance: €110
- Transportation: €50-100 (often included in semester fee)
- Study materials: €50
- Leisure activities: €100-150

## Visa and Residence Permit

### Student Visa Requirements

Non-EU students will need to apply for a student visa before arriving in Germany:

1. **Acceptance letter** from a German university
2. **Proof of financial resources** (approximately €11,208 per year)
3. **Health insurance** coverage
4. **Passport** valid for the duration of your stay
5. **Application forms** and photos

### Residence Permit

After arriving in Germany, you'll need to register with the local authorities and apply for a residence permit within 90 days.

## Scholarships and Funding

Several organizations offer scholarships for international students:

1. **DAAD (German Academic Exchange Service)** - Offers various scholarships for different academic levels
2. **Erasmus+** - For EU students and partner countries
3. **University-specific scholarships** - Many institutions offer their own funding opportunities
4. **Government-funded scholarships** - Both German and country-of-origin governments may offer funding

## Student Life and Accommodation

### Housing Options

1. **Student dormitories** - Affordable and convenient, but often have waiting lists
2. **Shared apartments (WGs)** - Popular option for students
3. **Private apartments** - More expensive but offer more privacy
4. **Homestays** - Living with a German family

### Student Services

German universities typically offer extensive support services:

- Orientation programs for new students
- Academic advising
- Career services
- International student offices
- Language support
- Sports facilities and clubs

## Working While Studying

International students have the opportunity to work while studying:

- EU students can work without restrictions
- Non-EU students can work 120 full days or 240 half days per year
- No permission needed for research assistant positions at universities

## After Graduation

Germany offers excellent opportunities for international graduates:

1. **18-month job-seeking visa** after graduation to find employment
2. **EU Blue Card** for qualified professionals
3. **Permanent residence** possible after two years of working with a Blue Card or five years with a regular work permit

## Conclusion

Studying in Germany offers an excellent combination of high-quality education, affordable costs, and promising career prospects. By understanding the application process, requirements, and student life, you'll be well-prepared to embark on this exciting journey.

Remember, thorough preparation is key to a successful study experience in Germany. Start your application process early, improve your language skills, and reach out to universities or the DAAD for guidance when needed.
      `,
      publishDate: 'April 5, 2024',
      readTime: '12 min',
      category: 'Country Guide',
      image: '/images/blog/featured-germany.jpg',
      author: {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        role: 'Education Consultant',
        avatar: '/images/blog/avatars/sarah-chen.jpg',
        bio: 'Sarah has helped hundreds of students successfully apply to German universities. With over 5 years of experience in international education consulting, she specializes in helping students navigate the German university system.'
      },
      tags: ['Germany', 'Study Abroad', 'Application Process', 'Scholarships'],
      toc: [
        {
          id: 'german-education-system-overview',
          title: 'German Education System Overview',
          level: 2,
          items: [
            { id: 'universities', title: 'Universities (Universitäten)', level: 3 },
            { id: 'universities-of-applied-sciences', title: 'Universities of Applied Sciences (Fachhochschulen)', level: 3 },
            { id: 'colleges-of-art-film-and-music', title: 'Colleges of Art, Film, and Music', level: 3 }
          ]
        },
        { id: 'admission-requirements', title: 'Admission Requirements', level: 2 },
        { id: 'application-process', title: 'Application Process', level: 2 },
        { 
          id: 'tuition-and-costs', 
          title: 'Tuition and Costs', 
          level: 2,
          items: [
            { id: 'tuition-fees', title: 'Tuition Fees', level: 3 },
            { id: 'living-expenses', title: 'Living Expenses', level: 3 }
          ]
        },
        { 
          id: 'visa-and-residence-permit', 
          title: 'Visa and Residence Permit', 
          level: 2,
          items: [
            { id: 'student-visa-requirements', title: 'Student Visa Requirements', level: 3 },
            { id: 'residence-permit', title: 'Residence Permit', level: 3 }
          ]
        },
        { id: 'scholarships-and-funding', title: 'Scholarships and Funding', level: 2 },
        {
          id: 'student-life-and-accommodation',
          title: 'Student Life and Accommodation',
          level: 2,
          items: [
            { id: 'housing-options', title: 'Housing Options', level: 3 },
            { id: 'student-services', title: 'Student Services', level: 3 }
          ]
        },
        { id: 'working-while-studying', title: 'Working While Studying', level: 2 },
        { id: 'after-graduation', title: 'After Graduation', level: 2 },
        { id: 'conclusion', title: 'Conclusion', level: 2 }
      ],
      relatedPosts: [
        {
          id: 'scholarships-guide',
          slug: '/blog/scholarships-guide',
          title: 'Complete Guide to Scholarships for International Students in 2024',
          category: 'Financial Planning',
          image: '/images/blog/scholarships.jpg'
        },
        {
          id: 'statement-of-purpose',
          slug: '/blog/statement-of-purpose',
          title: 'How to Write a Winning Statement of Purpose: Examples and Templates',
          category: 'Application Success',
          image: '/images/blog/statement-purpose.jpg'
        },
        {
          id: 'first-30-days',
          slug: '/blog/first-30-days',
          title: 'First 30 Days Abroad: What to Expect and How to Adapt',
          category: 'Student Experience',
          image: '/images/blog/first-30-days.jpg'
        }
      ]
    }
  }
  
  // Return null for posts that don't exist
  return null
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found | Qogent',
      description: 'The requested article could not be found.'
    }
  }
  
  return {
    title: `${post.title} | Qogent Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

// Blog Post Header Component
function BlogPostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-10">
      {/* Category & Reading Time */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
          {post.category}
        </Badge>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime} read</span>
        </div>
      </div>
      
      {/* Article Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
        {post.title}
      </h1>
      
      {/* Description */}
      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
        {post.description}
      </p>
      
      {/* Author & Publish Date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.author.role}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Published {post.publishDate}</span>
          {post.updateDate && (
            <span className="ml-1">(Updated {post.updateDate})</span>
          )}
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 border border-border shadow-sm">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
        />
      </div>
      
      {/* Social Sharing & Save */}
      <div className="flex justify-between items-center py-4 mb-8">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="px-2 py-1 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator className="mb-8" />
    </header>
  )
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  // Return 404 if the post doesn't exist
  if (!post) {
    notFound()
  }
  
  return (
    <article className="container py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Back to blog link */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="group">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </Link>
        </Button>
      </div>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main content */}
        <div className="lg:col-span-8">
          <div className="prose dark:prose-invert max-w-none">
            {/* Blog post header */}
            <BlogPostHeader post={post} />
            
            {/* Article content */}
            <ContentFormatter content={post.content} />
          </div>
          
          {/* Call to action */}
          <CallToAction />
          
          {/* Mobile author bio (shown only on mobile) */}
          <div className="lg:hidden bg-muted/40 dark:bg-muted/20 rounded-lg p-5 my-8">
            <h3 className="text-lg font-medium mb-3">About the Author</h3>
            <div className="flex items-start gap-3 mb-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full shrink-0 border border-border">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{post.author.bio}</p>
          </div>
        </div>
        
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 lg:pl-6">
          {/* Table of contents - now using position sticky */}
          <div className="relative">
            <TableOfContents items={post.toc} />
          </div>
          
          {/* Author bio - now positioned correctly after TOC */}
          <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-5 mt-6">
            <h3 className="text-lg font-medium mb-3">About the Author</h3>
            <div className="flex items-start gap-3 mb-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full shrink-0 border border-border">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{post.author.bio}</p>
          </div>
        </aside>
      </div>
      
      {/* Related posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mt-16">
          <Separator className="mb-16" />
          <RelatedPosts posts={post.relatedPosts} />
        </div>
      )}
    </article>
  )
} 