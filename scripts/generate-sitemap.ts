import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import { globby } from 'globby'
import prettier from 'prettier'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Verify environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function generateSitemap() {
  try {
    // Base URL of your website
    const BASE_URL = 'https://qogent.com'

    // Get all static routes based on pages
    const pages = await globby([
      'src/app/**/page.tsx',
      '!src/app/api',
      '!src/app/_*',
      '!src/app/**/[*',
    ])

    // Get dynamic routes from database
    const { data: universities } = await supabase
      .from('universities')
      .select('slug')
    
    const { data: countries } = await supabase
      .from('countries')
      .select('slug')
    
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug')

    const { data: jobs } = await supabase
      .from('jobs')
      .select('slug')

    // Create URL list
    const staticUrls = pages.map((page) => {
      const path = page
        .replace('src/app', '')
        .replace('/page.tsx', '')
        .replace('/index', '')
      return `${BASE_URL}${path}`
    }).filter(url => !url.includes('[slug]')) // Remove dynamic route templates

    const dynamicUrls = [
      ...(universities?.map((uni) => `${BASE_URL}/universities/${uni.slug}`) || []),
      ...(countries?.map((country) => `${BASE_URL}/destinations/${country.slug}`) || []),
      ...(blogs?.map((blog) => `${BASE_URL}/blog/${blog.slug}`) || []),
      ...(jobs?.map((job) => `${BASE_URL}/jobs/${job.slug}`) || []),
    ]

    const allUrls = [...staticUrls, ...dynamicUrls]

    // Generate sitemap XML
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allUrls
          .map((url) => {
            return `
              <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `
          })
          .join('')}
      </urlset>
    `

    // Format the XML
    const formatted = await prettier.format(sitemap, {
      parser: 'html',
      printWidth: 120,
    })

    // Write the sitemap
    await fs.writeFile('public/sitemap.xml', formatted)
    
    // Generate robots.txt
    const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`
    await fs.writeFile('public/robots.txt', robotsTxt.trim())

    console.log('Sitemap generated successfully!')
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

generateSitemap() 