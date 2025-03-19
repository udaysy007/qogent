'use client'

import { useEffect } from 'react'

// Constant for header offset - matching TableOfContents
const SCROLL_OFFSET = 100

export function FragmentScroller() {
  useEffect(() => {
    // Function to scroll to element with retries
    const scrollToHashElement = (retries = 10, delay = 100) => {
      if (!window.location.hash) return
      
      const slug = window.location.hash.substring(1)
      const element = document.getElementById(slug)
      
      if (element) {
        // Element found, scroll to it
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else if (retries > 0) {
        // Element not found yet, retry after delay
        console.log(`FragmentScroller: Element #${slug} not found, retrying... (${retries} attempts left)`)
        setTimeout(() => scrollToHashElement(retries - 1, delay), delay)
      } else {
        console.warn(`FragmentScroller: Element #${slug} not found after multiple attempts`)
      }
    }
    
    // Initial attempt with a slight delay to ensure DOM is ready
    setTimeout(() => scrollToHashElement(), 200)
    
    // Also handle hash changes
    const handleHashChange = () => {
      scrollToHashElement()
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  return null
} 