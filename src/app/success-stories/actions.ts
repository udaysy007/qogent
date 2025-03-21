'use server'

import { AirtableService, SuccessStory } from '@/lib/services/airtable'

export async function getSuccessStories(): Promise<SuccessStory[]> {
  const airtableService = AirtableService.getInstance();
  return await airtableService.getSuccessStories();
} 