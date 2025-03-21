import axios from 'axios';

export interface SuccessStory {
  id: string;
  name: string;
  university: string;
  course: string;
  intake: string;
  imageUrl: string;
  instagramUrl?: string;
}

export class AirtableService {
  private static instance: AirtableService | null = null;
  private baseId: string;
  private apiKey: string;

  private constructor() {
    // In Next.js, process.env is available in server components
    this.baseId = process.env.AIRTABLE_BASE_ID || '';
    this.apiKey = process.env.AIRTABLE_API_KEY || '';
  }

  public static getInstance(): AirtableService {
    if (!AirtableService.instance) {
      AirtableService.instance = new AirtableService();
    }
    return AirtableService.instance;
  }

  private splitUniversityAndCourse(universityField: string): { university: string; course: string } {
    const parts = universityField.split('-').map(part => part.trim());
    if (parts.length >= 2) {
      return {
        university: parts[0],
        course: parts.slice(1).join(' - ') // Rejoin remaining parts in case course name contains hyphens
      };
    }
    return {
      university: universityField,
      course: ''
    };
  }

  public async getSuccessStories(): Promise<SuccessStory[]> {
    try {
      // If this is being called from a client component, these values might be empty
      if (!this.baseId || !this.apiKey) {
        console.error('Missing Airtable API credentials');
        return [];
      }

      const response = await axios.get(
        `https://api.airtable.com/v0/${this.baseId}/Success%20Stories`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
          params: {
            filterByFormula: "{Status}='Publish To Website'",
            sort: [{ field: 'Number', direction: 'desc' }],
          },
        }
      );

      if (!response.data || !response.data.records) {
        console.error('Invalid response from Airtable API');
        return [];
      }

      return response.data.records.map((record: any) => {
        const fields = record.fields;
        const { university, course } = this.splitUniversityAndCourse(fields['University Name'] || '');
        return {
          id: record.id,
          name: fields.Name || '',
          university,
          course,
          intake: fields['Intake '] || '',
          imageUrl: fields.Image && fields.Image.length > 0 ? fields.Image[0].url : '',
          instagramUrl: fields['Instagram Link'] || '',
        };
      });
    } catch (error) {
      console.error('Error fetching success stories:', error);
      return [];
    }
  }
}

// Export a standalone function that uses the singleton instance
export async function getSuccessStories(): Promise<SuccessStory[]> {
  const airtableService = AirtableService.getInstance();
  return airtableService.getSuccessStories();
} 