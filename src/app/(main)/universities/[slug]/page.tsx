'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import { UniversityDetail } from './university-detail'
import { useUniversity } from '@/hooks/use-universities'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface PageProps {
  params: {
    slug: string
  }
}

export default function UniversityPage(props: PageProps) {
  // Use React.use() to unwrap params
  const params = use(props.params)
  const slug = params.slug
  const [isClient, setIsClient] = useState(false)
  
  // Use the hook to fetch university data
  const { data: university, isLoading, error } = useUniversity(slug)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Show loading state while data is being fetched
  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  
  // Show not found if there's an error or no university data
  if (error || !university) {
    notFound()
  }
  
  return <UniversityDetail university={university} />
} 