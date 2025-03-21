import { useEffect, useState } from 'react'
import type { SuccessStory } from '@/types/success-story'

export function useSuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchStories() {
      try {
        // We'll use the Airtable MCP to fetch records
        // For now, returning empty array until we integrate with Airtable
        setStories([])
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch success stories'))
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  return {
    stories,
    isLoading,
    error,
  }
} 