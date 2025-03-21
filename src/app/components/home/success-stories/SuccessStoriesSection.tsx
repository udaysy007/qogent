"use client";

import { useEffect, useState } from 'react'
import { SuccessStoriesCarousel } from '@/components/sections/success-stories-carousel'
import { SuccessStory } from '@/lib/services/airtable'
import { getSuccessStories } from './actions'

export function SuccessStoriesSection() {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStories() {
      try {
        const loadedStories = await getSuccessStories()
        setStories(loadedStories)
      } catch (error) {
        console.error('Failed to load success stories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStories()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center animate-pulse">
            <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-4 w-full max-w-2xl bg-muted rounded mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  if (stories.length === 0) {
    return null
  }

  return <SuccessStoriesCarousel stories={stories} />
}