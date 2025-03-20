'use client'

import { notFound, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UniversityDetail } from './university-detail'
import { useUniversity } from '@/hooks/use-universities'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function UniversityPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [isClient, setIsClient] = useState(false);
  
  // Use the hook to fetch university data
  const { data: university, isLoading, error } = useUniversity(slug)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Show loading state while data is being fetched
  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <LoadingSpinner />
      </div>
    )
  }
  
  // Show 404 if university not found
  if (!university) {
    notFound()
  }
  
  return <UniversityDetail university={university} />
} 