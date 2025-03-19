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
      <ul className="space-y-2">
        {items.map((item) => (
          <li 
            key={item.id} 
            className={cn(
              "relative",
              item.level > 2 ? 'ml-4' : ''
            )}
          >
            <a
              href={`#${item.slug}`}
              onClick={(e) => handleLinkClick(item.slug, e)}
              className={cn(
                "block py-2 px-4 rounded-md text-sm transition-all duration-200",
                "hover:bg-blue-light dark:hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-opacity-50",
                activeId === item.slug ? [
                  "bg-blue-light dark:bg-gray-800",
                  "text-blue-primary dark:text-blue-primary font-medium",
                  "before:absolute before:left-0 before:top-0 before:h-full",
                  "before:w-1 before:bg-blue-primary before:rounded-full"
                ] : "text-gray-600 dark:text-gray-400"
              )}
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
    <div className={cn(
      "rounded-xl border border-gray-200 dark:border-gray-700",
      "bg-white dark:bg-gray-900",
      "p-6 max-h-[calc(100vh-200px)] overflow-auto",
      "shadow-lg dark:shadow-gray-800/30",
      "backdrop-blur-sm dark:backdrop-blur-sm",
      "sticky top-24"
    )}>
      <div className="flex items-center gap-2 mb-6">
        <List className="w-5 h-5 text-blue-primary" />
        <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
          On this page
        </h3>
      </div>
      {renderItems(items)}
    </div>
  )
}