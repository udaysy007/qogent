'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  items?: TableOfContentsItem[]
}

export function TableOfContents({ items }: { items?: TableOfContentsItem[] }) {
  const [activeId, setActiveId] = useState<string>('')
  
  useEffect(() => {
    if (!items || items.length === 0) return
    
    // Function to get all heading IDs
    const getAllIds = (items: TableOfContentsItem[]): string[] => {
      return items.reduce<string[]>((acc, item) => {
        return [
          ...acc, 
          item.id, 
          ...(item.items ? getAllIds(item.items) : [])
        ]
      }, [])
    }
    
    const headingIds = getAllIds(items)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66% 0px' }
    )
    
    // Observe all section headings
    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })
    
    return () => {
      headingIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])
  
  if (!items || items.length === 0) {
    return null
  }
  
  return (
    <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-5 mb-8 sticky top-20 not-prose max-h-[calc(100vh-8rem)] overflow-auto">
      <div className="flex items-center gap-2 font-medium mb-4">
        <List className="h-5 w-5" />
        <h2 className="text-lg">Table of Contents</h2>
      </div>
      <nav>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block py-1 transition-colors hover:text-primary",
                  activeId === item.id 
                    ? "text-primary font-medium" 
                    : "text-foreground/90"
                )}
              >
                {item.title}
              </a>
              {item.items && item.items.length > 0 && (
                <ul className="mt-1 ml-4 space-y-1 border-l-2 border-muted-foreground/20 pl-3">
                  {item.items.map((subItem) => (
                    <li key={subItem.id}>
                      <a
                        href={`#${subItem.id}`}
                        className={cn(
                          "block py-1 text-muted-foreground transition-colors hover:text-primary",
                          activeId === subItem.id 
                            ? "text-primary font-medium" 
                            : "text-muted-foreground"
                        )}
                      >
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
} 