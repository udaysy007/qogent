import { createClient } from '@/lib/supabase-client'

/**
 * Get a Supabase Storage URL for a file
 * @param bucket - The bucket name in Supabase Storage
 * @param path - The path to the file within the bucket
 * @returns The public URL for the file
 * @throws Error if the URL couldn't be retrieved
 */
export function getStorageUrl(bucket: string, path: string): string {
  if (!bucket || !path) {
    throw new Error(`Invalid bucket or path: ${bucket}/${path}`)
  }
  
  try {
    const supabase = createClient()
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    
    if (!data || !data.publicUrl) {
      throw new Error(`Could not get public URL for ${bucket}/${path}`)
    }
    
    return data.publicUrl
  } catch (error) {
    console.error(`Error getting storage URL for ${bucket}/${path}:`, error)
    throw new Error(`Failed to get storage URL for ${bucket}/${path}`)
  }
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadToStorage(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  try {
    const { data, error } = await createClient().storage.from(bucket).upload(path, file, {
      upsert: true,
      cacheControl: '3600',
    })

    if (error) {
      console.error('Error uploading file:', error)
      return null
    }

    return getStorageUrl(bucket, path)
  } catch (error) {
    console.error(`Error in uploadToStorage for ${bucket}/${path}:`, error)
    return null
  }
}

/**
 * Check if a file exists in Supabase Storage
 */
export async function fileExistsInStorage(bucket: string, path: string): Promise<boolean> {
  try {
    const { data } = await createClient().storage.from(bucket).download(path)
    return !!data
  } catch (error) {
    return false
  }
}

/**
 * Get university logo URL from Supabase Storage
 * @param slug - The university slug
 * @returns The university logo URL
 */
export function getUniversityLogoUrl(slug: string): string {
  if (!slug) {
    throw new Error('University slug is required')
  }
  
  // First try SVG format
  try {
    return getStorageUrl('universities', `logos/${slug}.svg`)
  } catch (error) {
    // Fallback to PNG format
    try {
      return getStorageUrl('universities', `logos/${slug}.png`)
    } catch (error) {
      // Fallback to JPG format
      try {
        return getStorageUrl('universities', `logos/${slug}.jpg`)
      } catch (error) {
        throw new Error(`Could not find any logo for university: ${slug}`)
      }
    }
  }
}

/**
 * Get university campus image URL from Supabase Storage
 * @param slug - The university slug
 * @returns The university campus image URL
 */
export function getUniversityCampusUrl(slug: string): string {
  if (!slug) {
    throw new Error('University slug is required')
  }
  
  try {
    return getStorageUrl('universities', `campus/${slug}.jpg`)
  } catch (error) {
    throw new Error(`Could not get campus image for university: ${slug}`)
  }
}

/**
 * Get country flag URL from Supabase Storage
 * @param code - The country code (two-letter ISO)
 * @returns The country flag URL
 */
export function getCountryFlagUrl(code: string): string {
  if (!code) {
    throw new Error('Country code is required')
  }
  
  try {
    return getStorageUrl('countries', `flags/${code.toLowerCase()}.svg`)
  } catch (error) {
    throw new Error(`Could not get flag for country: ${code}`)
  }
}

/**
 * Get country hero image URL from Supabase Storage
 * @param slug - The country slug
 * @returns The country hero image URL
 */
export function getCountryHeroUrl(slug: string): string {
  if (!slug) {
    throw new Error('Country slug is required')
  }
  
  try {
    return getStorageUrl('countries', `hero/${slug}.jpg`)
  } catch (error) {
    throw new Error(`Could not get hero image for country: ${slug}`)
  }
}

/**
 * Get team member avatar URL from Supabase Storage
 * @param id - The team member ID
 * @returns The team member avatar URL
 */
export function getTeamMemberAvatarUrl(id: string): string {
  if (!id) {
    throw new Error('Team member ID is required')
  }
  
  try {
    return getStorageUrl('people', `team/${id}.jpg`)
  } catch (error) {
    throw new Error(`Could not get avatar for team member: ${id}`)
  }
}

/**
 * Get blog image URL from Supabase Storage
 * @param slug - The blog post slug
 * @returns The blog image URL
 */
export function getBlogImageUrl(slug: string): string {
  if (!slug) {
    throw new Error('Blog post slug is required')
  }
  
  try {
    return getStorageUrl('blog', `${slug}.jpg`)
  } catch (error) {
    throw new Error(`Could not get image for blog post: ${slug}`)
  }
} 