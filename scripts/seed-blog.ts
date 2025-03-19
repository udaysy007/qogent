import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seedBlogData() {
  console.log('🌱 Seeding blog data...')

  // Create author
  const { data: author, error: authorError } = await supabase
    .from('blog_authors')
    .upsert({
      name: 'John Doe',
      role: 'Content Writer',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop&auto=format',
      bio: 'John is a passionate writer with over 5 years of experience in technical content creation. He specializes in making complex topics accessible to everyone.'
    })
    .select()
    .single()

  if (authorError) {
    throw new Error(`Error creating author: ${authorError.message}`)
  }

  // Create blog posts
  const posts = [
    {
      slug: 'getting-started-with-web-development',
      title: 'Getting Started with Web Development in 2024',
      description: 'A comprehensive guide to starting your journey in web development, covering essential tools, languages, and best practices.',
      content: `
# Getting Started with Web Development in 2024

Web development is an exciting field that's constantly evolving. Whether you're looking to build a career or just want to create your own websites, this guide will help you get started.

## Essential Tools

Before you begin, you'll need:

1. A code editor (VS Code is highly recommended)
2. Git for version control
3. Node.js and npm/pnpm
4. A modern web browser with developer tools

## Learning Path

### 1. HTML & CSS Fundamentals

Start with the basics:
- HTML structure and semantics
- CSS styling and layouts
- Responsive design principles

### 2. JavaScript Essentials

Learn the core concepts:
- Variables and data types
- Functions and scope
- DOM manipulation
- Async programming

### 3. Modern Development

Explore modern tools and frameworks:
- React or Next.js
- TypeScript
- Package management
- Build tools

## Best Practices

Remember to:
- Write clean, maintainable code
- Follow accessibility guidelines
- Optimize for performance
- Test thoroughly

## Next Steps

Practice is key! Start building projects and:
- Join developer communities
- Contribute to open source
- Stay updated with latest trends
- Build a portfolio

Happy coding! 🚀
      `,
      published_at: new Date().toISOString(),
      read_time: '8 min read',
      category: 'Development',
      image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&h=630&fit=crop&auto=format',
      author_id: author.id
    },
    {
      slug: 'modern-ui-design-principles',
      title: 'Modern UI Design Principles for Better User Experience',
      description: 'Learn the key principles of modern UI design that help create intuitive and engaging user experiences.',
      content: `
# Modern UI Design Principles for Better User Experience

Creating an effective user interface is crucial for any digital product. Let's explore the key principles that make UI designs both beautiful and functional.

## Core Principles

### 1. Clarity

- Clear hierarchy
- Consistent patterns
- Readable typography
- Purposeful spacing

### 2. Feedback

- Interactive elements
- Loading states
- Success/error messages
- Visual feedback

### 3. Accessibility

- Color contrast
- Keyboard navigation
- Screen reader support
- Alternative text

## Design Elements

### Typography

Choose fonts that are:
- Readable
- Scalable
- Consistent
- Hierarchical

### Color

Use color to:
- Create hierarchy
- Show state
- Guide attention
- Maintain consistency

### Layout

Focus on:
- Grid systems
- White space
- Responsive design
- Visual balance

## Best Practices

1. Design for mobile first
2. Maintain consistency
3. Use visual hierarchy
4. Provide clear feedback
5. Keep it simple

Remember: Good design is invisible. Users should focus on their tasks, not the interface.
      `,
      published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      read_time: '6 min read',
      category: 'Design',
      image_url: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?q=80&w=1200&h=630&fit=crop&auto=format',
      author_id: author.id
    }
  ]

  for (const post of posts) {
    const { error: postError } = await supabase
      .from('blog_posts')
      .upsert(post)

    if (postError) {
      throw new Error(`Error creating post "${post.title}": ${postError.message}`)
    }
  }

  // Create tags
  const tags = [
    { name: 'Web Development' },
    { name: 'JavaScript' },
    { name: 'UI Design' },
    { name: 'UX' },
    { name: 'Best Practices' }
  ]

  for (const tag of tags) {
    const { error: tagError } = await supabase
      .from('blog_tags')
      .upsert(tag)

    if (tagError) {
      throw new Error(`Error creating tag "${tag.name}": ${tagError.message}`)
    }
  }

  // Get posts and tags for creating relationships
  const { data: createdPosts, error: postsError } = await supabase
    .from('blog_posts')
    .select('id, slug')

  if (postsError) {
    throw new Error(`Error fetching posts: ${postsError.message}`)
  }

  const { data: createdTags, error: tagsError } = await supabase
    .from('blog_tags')
    .select('id, name')

  if (tagsError) {
    throw new Error(`Error fetching tags: ${tagsError.message}`)
  }

  // Associate tags with posts
  const postTags = [
    {
      post_id: createdPosts.find(p => p.slug === 'getting-started-with-web-development')?.id,
      tag_ids: [
        createdTags.find(t => t.name === 'Web Development')?.id,
        createdTags.find(t => t.name === 'JavaScript')?.id,
        createdTags.find(t => t.name === 'Best Practices')?.id
      ]
    },
    {
      post_id: createdPosts.find(p => p.slug === 'modern-ui-design-principles')?.id,
      tag_ids: [
        createdTags.find(t => t.name === 'UI Design')?.id,
        createdTags.find(t => t.name === 'UX')?.id,
        createdTags.find(t => t.name === 'Best Practices')?.id
      ]
    }
  ]

  for (const { post_id, tag_ids } of postTags) {
    for (const tag_id of tag_ids) {
      const { error: postTagError } = await supabase
        .from('blog_posts_tags')
        .upsert({ post_id, tag_id })

      if (postTagError) {
        throw new Error(`Error associating post ${post_id} with tag ${tag_id}: ${postTagError.message}`)
      }
    }
  }

  // Create table of contents items
  const tocItems = [
    {
      post_id: createdPosts.find(p => p.slug === 'getting-started-with-web-development')?.id,
      items: [
        { title: 'Essential Tools', level: 2, position: 1 },
        { title: 'Learning Path', level: 2, position: 2 },
        { title: 'HTML & CSS Fundamentals', level: 3, position: 3 },
        { title: 'JavaScript Essentials', level: 3, position: 4 },
        { title: 'Modern Development', level: 3, position: 5 },
        { title: 'Best Practices', level: 2, position: 6 },
        { title: 'Next Steps', level: 2, position: 7 }
      ]
    },
    {
      post_id: createdPosts.find(p => p.slug === 'modern-ui-design-principles')?.id,
      items: [
        { title: 'Core Principles', level: 2, position: 1 },
        { title: 'Clarity', level: 3, position: 2 },
        { title: 'Feedback', level: 3, position: 3 },
        { title: 'Accessibility', level: 3, position: 4 },
        { title: 'Design Elements', level: 2, position: 5 },
        { title: 'Typography', level: 3, position: 6 },
        { title: 'Color', level: 3, position: 7 },
        { title: 'Layout', level: 3, position: 8 },
        { title: 'Best Practices', level: 2, position: 9 }
      ]
    }
  ]

  for (const { post_id, items } of tocItems) {
    for (const item of items) {
      const { error: tocError } = await supabase
        .from('blog_toc_items')
        .upsert({ ...item, post_id })

      if (tocError) {
        throw new Error(`Error creating TOC item "${item.title}": ${tocError.message}`)
      }
    }
  }

  // Set up related posts
  const relatedPosts = [
    {
      post_id: createdPosts.find(p => p.slug === 'getting-started-with-web-development')?.id,
      related_post_id: createdPosts.find(p => p.slug === 'modern-ui-design-principles')?.id,
      position: 1
    },
    {
      post_id: createdPosts.find(p => p.slug === 'modern-ui-design-principles')?.id,
      related_post_id: createdPosts.find(p => p.slug === 'getting-started-with-web-development')?.id,
      position: 1
    }
  ]

  for (const relation of relatedPosts) {
    const { error: relationError } = await supabase
      .from('blog_related_posts')
      .upsert(relation)

    if (relationError) {
      throw new Error(`Error creating related post relationship: ${relationError.message}`)
    }
  }

  console.log('✅ Blog data seeded successfully!')
}

seedBlogData().catch(console.error) 