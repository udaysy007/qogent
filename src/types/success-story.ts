export interface SuccessStory {
  id: string
  name: string
  university: string
  course: string
  imageUrl: string // This will be the Airtable attachment URL
  createdTime: string
  // Add any additional fields we might want to include later
  country?: string
  intake?: string
  testimonial?: string
} 