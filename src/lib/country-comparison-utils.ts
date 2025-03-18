import { createClient } from '@supabase/supabase-js';

// Types
export interface CountryBasic {
  id: string;
  name: string;
  code: string;
  region: string;
  flagUrl: string;
}

export interface CountryData {
  id: string;
  name: string;
  code: string;
  region: string;
  flagUrl: string;
  
  education: {
    academicYear: string;
    internationalStudents: string;
    englishPrograms: string;
    teachingStyle: string;
    gradingSystem: string;
  };
  
  tuition: {
    bachelorFeePublic: string;
    bachelorFeePrivate: string;
    masterFeePublic: string;
    masterFeePrivate: string;
    currency: string;
  };
  
  livingCosts: {
    accommodationCost: string;
    foodCost: string;
    transportCost: string;
    utilitiesCost: string;
    totalMonthlyCost: string;
    currency: string;
  };
  
  visa: {
    visaRequirements: string;
    financialRequirements: string;
    healthRequirements: string;
    additionalDocuments: string;
  };
  
  employment: {
    postStudyWork: string;
    workOpportunities: string;
  };
  
  lifestyle: {
    campusLife: string;
    culturalExperience: string;
  };
}

export type MetricCategory = 
  | "tuition" 
  | "livingCosts"
  | "visa"
  | "employment"
  | "education"
  | "lifestyle";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to get all countries (basic info only)
export async function getCountries(): Promise<CountryBasic[]> {
  const { data, error } = await supabase
    .from('countries')
    .select('id, name, code, region, flag_url')
    .order('name');

  if (error) {
    console.error('Error fetching countries:', error);
    return [];
  }

  return data.map(country => ({
    id: country.id,
    name: country.name,
    code: country.code,
    region: country.region,
    flagUrl: country.flag_url || `/images/flags/${country.code.toLowerCase()}.svg`
  }));
}

// Function to get detailed country data for comparison
export async function getCountryData(countryIds: string[]): Promise<CountryData[]> {
  if (!countryIds.length) return [];

  const { data, error } = await supabase
    .from('countries')
    .select(`
      id, 
      name, 
      code, 
      region, 
      flag_url,
      currency,
      academic_year,
      international_students,
      english_programs,
      teaching_style,
      grading_system,
      bachelor_fee_public,
      bachelor_fee_private,
      master_fee_public,
      master_fee_private,
      accommodation_cost,
      food_cost,
      transport_cost,
      utilities_cost,
      total_monthly_cost,
      visa_requirements,
      financial_requirements,
      health_requirements,
      additional_documents,
      post_study_work,
      work_opportunities,
      campus_life,
      cultural_experience
    `)
    .in('id', countryIds);

  if (error) {
    console.error('Error fetching country data:', error);
    return [];
  }

  return data.map(country => ({
    id: country.id,
    name: country.name,
    code: country.code,
    region: country.region,
    flagUrl: country.flag_url || `/images/flags/${country.code.toLowerCase()}.svg`,
    
    education: {
      academicYear: country.academic_year || 'Information not available',
      internationalStudents: country.international_students || 'Information not available',
      englishPrograms: country.english_programs || 'Information not available',
      teachingStyle: country.teaching_style || 'Information not available',
      gradingSystem: country.grading_system || 'Information not available',
    },
    
    tuition: {
      bachelorFeePublic: country.bachelor_fee_public || 'Information not available',
      bachelorFeePrivate: country.bachelor_fee_private || 'Information not available',
      masterFeePublic: country.master_fee_public || 'Information not available',
      masterFeePrivate: country.master_fee_private || 'Information not available',
      currency: country.currency || 'EUR',
    },
    
    livingCosts: {
      accommodationCost: country.accommodation_cost || 'Information not available',
      foodCost: country.food_cost || 'Information not available',
      transportCost: country.transport_cost || 'Information not available',
      utilitiesCost: country.utilities_cost || 'Information not available',
      totalMonthlyCost: country.total_monthly_cost || 'Information not available',
      currency: country.currency || 'EUR',
    },
    
    visa: {
      visaRequirements: country.visa_requirements || 'Information not available',
      financialRequirements: country.financial_requirements || 'Information not available',
      healthRequirements: country.health_requirements || 'Information not available',
      additionalDocuments: country.additional_documents || 'Information not available',
    },
    
    employment: {
      postStudyWork: country.post_study_work || 'Information not available',
      workOpportunities: country.work_opportunities || 'Information not available',
    },
    
    lifestyle: {
      campusLife: country.campus_life || 'Information not available',
      culturalExperience: country.cultural_experience || 'Information not available',
    }
  }));
}

// Get countries by region
export async function getCountriesByRegion(region: string): Promise<CountryBasic[]> {
  const { data, error } = await supabase
    .from('countries')
    .select('id, name, code, region, flag_url')
    .ilike('region', `%${region}%`)
    .order('name');

  if (error) {
    console.error('Error fetching countries by region:', error);
    return [];
  }

  return data.map(country => ({
    id: country.id,
    name: country.name,
    code: country.code,
    region: country.region,
    flagUrl: country.flag_url || `/images/flags/${country.code.toLowerCase()}.svg`
  }));
}

// Get country regions
export async function getRegions(): Promise<string[]> {
  const { data, error } = await supabase
    .from('countries')
    .select('region')
    .order('region');

  if (error) {
    console.error('Error fetching regions:', error);
    return [];
  }

  // Extract regions and normalize them to ensure consistency
  const regionsArray = data.map(item => {
    // Normalize region names - trim, capitalize first letter, lowercase the rest
    const region = item.region.trim();
    return region.charAt(0).toUpperCase() + region.slice(1).toLowerCase();
  });
  
  // Extract unique regions using a Set
  const uniqueRegions = [...new Set(regionsArray)];
  
  return uniqueRegions;
}

// Get metric information
export function getMetricInfo(): { [key in MetricCategory]: { title: string; icon: string; description: string } } {
  return {
    tuition: {
      title: "Tuition Fees",
      icon: "School",
      description: "Compare bachelor's and master's program costs"
    },
    livingCosts: {
      title: "Living Costs",
      icon: "Wallet",
      description: "Monthly expenses including accommodation, food, and transportation"
    },
    visa: {
      title: "Visa Requirements",
      icon: "FileText",
      description: "Application process and required documentation"
    },
    employment: {
      title: "Work Opportunities",
      icon: "Briefcase",
      description: "Post-study work options and job prospects"
    },
    education: {
      title: "Education System",
      icon: "GraduationCap",
      description: "Academic calendar, grading, and program availability"
    },
    lifestyle: {
      title: "Student Lifestyle",
      icon: "HeartPulse",
      description: "Campus life and cultural experience"
    }
  };
} 