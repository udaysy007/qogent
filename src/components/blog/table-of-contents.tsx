'use client'

import { useState, useEffect, useRef } from 'react'
import { List } from 'lucide-react'
import { cn } from '@/lib/utils'

// Constant for header offset - matching FragmentScroller
const SCROLL_OFFSET = 100

export interface TableOfContentsItem {
  id: string
  slug: string
  title: string
  level: number
  items?: TableOfContentsItem[]
}

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  const [activeId, setActiveId] = useState<string>('')
  
  // Get all slugs flat list for intersection observer
  const getAllSlugs = (items: TableOfContentsItem[]): string[] => {
    return items.reduce<string[]>((acc, item) => {
      const itemSlugs = item.items ? getAllSlugs(item.items) : []
      return [...acc, item.slug, ...itemSlugs]
    }, [])
  }

  useEffect(() => {
    const slugs = getAllSlugs(items)
    console.log('TOC: Available heading slugs:', slugs)
    
    // Debug: Log all headings IDs present in the document
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const presentIds = Array.from(headingElements).map(el => el.id)
    console.log('TOC: Actual heading IDs in document:', presentIds)
    
    // Check for mismatches to help debugging
    const mismatches = slugs.filter(slug => !presentIds.includes(slug))
    if (mismatches.length > 0) {
      console.warn('TOC: Slugs not found in document:', mismatches)
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px', // Updated to match SCROLL_OFFSET
        threshold: 0
      }
    )

    // Observe all headings
    slugs.forEach((slug) => {
      const element = document.getElementById(slug)
      if (element) {
        observer.observe(element)
      } else {
        console.warn('TOC: Could not find element with ID:', slug)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [items])

  const handleLinkClick = (slug: string, event: React.MouseEvent) => {
    event.preventDefault()
    
    const element = document.getElementById(slug)
    
    if (element) {
      // Update the URL hash
      window.history.pushState(null, '', `#${slug}`)
      
      // Scroll to the element
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - SCROLL_OFFSET // Using the constant
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      setActiveId(slug)
    } else {
      console.warn('TOC: Link clicked but element not found:', slug)
    }
  }

  const renderItems = (items: TableOfContentsItem[]) => {
    return (
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id} className={`${item.level > 2 ? 'ml-4' : ''}`}>
            <a
              href={`#${item.slug}`}
              onClick={(e) => handleLinkClick(item.slug, e)}
              className={`block py-1 hover:text-foreground transition-colors ${
                activeId === item.slug
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {item.title}
            </a>
            {item.items && item.items.length > 0 && renderItems(item.items)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-6 max-h-[500px] overflow-auto shadow-sm">
      <h3 className="text-lg font-semibold mb-4">On this page</h3>
      {renderItems(items)}
    </div>
  )
} 