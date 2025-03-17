import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UniversityDetail } from './university-detail'

interface PageProps {
  params: {
    slug: string
  }
}

// Dynamically generate metadata based on the university
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  
  try {
    // In a real implementation, this would be an API call
    const data = await import('@/data/universities.json').then(
      (module) => module.default
    )
    const university = data.find((uni: any) => uni.slug === slug)
    
    if (!university) {
      return {
        title: 'University Not Found',
      }
    }
    
    return {
      title: `${university.name} | Study in ${university.countryName}`,
      description: university.description.slice(0, 160),
    }
  } catch (error) {
    return {
      title: 'University Details',
      description: 'Detailed information about studying at this university.',
    }
  }
}

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = params
  
  try {
    // In a real implementation, this would be an API call
    const data = await import('@/data/universities.json').then(
      (module) => module.default
    )
    const university = data.find((uni: any) => uni.slug === slug)
    
    if (!university) {
      notFound()
    }
    
    return <UniversityDetail university={university} />
  } catch (error) {
    notFound()
  }
} 