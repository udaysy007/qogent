'use client'

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { University, UniversityCard, UniversityFilterOptions } from '@/types/university';

// Function to fetch all universities from Supabase
async function getUniversities(): Promise<University[]> {
  try {
    // Fetch basic university data first
    const { data: universityData, error: universityError } = await supabase
      .from('universities')
      .select('*, countries(name, code, slug)');
    
    if (universityError || !universityData) return [];
    
    // Fetch all related data in bulk
    const [programsResponse, requirementsResponse, scholarshipsResponse, faqsResponse] = await Promise.all([
      supabase.from('university_programs').select('*'),
      supabase.from('admission_requirements').select('*'),
      supabase.from('scholarships').select('*'),
      supabase.from('university_faqs').select('*'),
    ]);
    
    const allPrograms = programsResponse.data || [];
    const allRequirements = requirementsResponse.data || [];
    const allScholarships = scholarshipsResponse.data || [];
    const allFaqs = faqsResponse.data || [];
    
    // Group related data by university_id
    const programsByUniversity = groupBy(allPrograms, 'university_id');
    const requirementsByUniversity = groupBy(allRequirements, 'university_id');
    const scholarshipsByUniversity = groupBy(allScholarships, 'university_id');
    const faqsByUniversity = groupBy(allFaqs, 'university_id');
    
    // Map universities with their related data
    return universityData.map(uni => ({
      id: uni.id,
      name: uni.name,
      slug: uni.slug,
      countryId: uni.country_id,
      countryName: uni.countries?.name || '',
      location: uni.city || '',
      foundingYear: uni.founding_year || 1900,
      isPublic: uni.is_public || false,
      ranking: {
        qs: uni.ranking || undefined,
        the: uni.ranking_the || undefined,
        arwu: uni.ranking_arwu || undefined,
      },
      logo: '',
      image: uni.campus_image_url || '',
      website: uni.website || '',
      description: uni.description || '',
      studentPopulation: uni.student_population || 0,
      internationalStudentPercentage: uni.international_student_percentage || 0,
      
      // Map related data
      featuredPrograms: (programsByUniversity[uni.id] || []).map(program => ({
        id: program.id,
        universityId: program.university_id,
        name: program.name,
        degree: program.degree as 'Bachelor' | 'Master' | 'PhD' | 'Certificate' | 'Diploma',
        field: program.field,
        language: program.language,
        duration: program.duration,
        description: program.description,
        tuitionFee: program.tuition_fee,
        applicationDeadlines: program.application_deadlines,
        isPopular: program.is_popular
      })),
      
      admissionRequirements: (requirementsByUniversity[uni.id] || []).map(req => ({
        id: req.id,
        universityId: req.university_id,
        type: req.type as 'Academic' | 'Language' | 'Documents' | 'Other',
        description: req.description,
        qogentInsight: req.qogent_insight
      })),
      
      costs: {
        tuitionDomestic: uni.tuition_fee_domestic || '',
        tuitionInternational: uni.tuition_fee_international || '',
        applicationFee: uni.application_fee,
        otherFees: uni.other_fees,
        healthInsurance: uni.health_insurance || '',
        livingExpenses: {
          accommodation: uni.living_expense_accommodation || '',
          food: uni.living_expense_food || '',
          transportation: uni.living_expense_transportation || '',
          other: uni.living_expense_other || '',
        }
      },
      
      scholarships: (scholarshipsByUniversity[uni.id] || []).map(scholarship => ({
        id: scholarship.id,
        universityId: scholarship.university_id,
        name: scholarship.name,
        provider: scholarship.provider as 'University' | 'Government' | 'Private' | 'Other',
        amount: scholarship.amount,
        description: scholarship.description,
        eligibility: scholarship.eligibility,
        applicationProcess: scholarship.application_process,
        deadline: scholarship.deadline,
        successRate: scholarship.success_rate
      })),
      
      studentLife: {
        housing: uni.housing_info || '',
        campusFacilities: uni.campus_facilities || [],
        internationalSupport: uni.international_support || '',
        clubs: uni.clubs_info || '',
      },
      
      qogentMetrics: {
        admissionSuccessRate: uni.admission_success_rate || '85%',
        studentsPlaced: uni.students_placed || 200,
      },
      
      faq: (faqsByUniversity[uni.id] || []).map(faq => ({
        question: faq.question,
        answer: faq.answer
      })),
    }));
  } catch (error) {
    console.error('Error fetching universities:', error);
    return [];
  }
}

// Helper function to group array items by a key
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const keyValue = String(item[key]);
    (result[keyValue] = result[keyValue] || []).push(item);
    return result;
  }, {});
}

// Function to fetch a single university by slug
async function getUniversityBySlug(slug: string): Promise<University | undefined> {
  try {
    // First, fetch the main university data
    const { data: universityData, error: universityError } = await supabase
      .from('universities')
      .select('*, countries(name, code, slug)')
      .eq('slug', slug)
      .single();
    
    if (universityError || !universityData) return undefined;

    // Now fetch all the related data
    const [
      programsResponse,
      requirementsResponse,
      scholarshipsResponse,
      faqsResponse
    ] = await Promise.all([
      // Fetch programs
      supabase
        .from('university_programs')
        .select('*')
        .eq('university_id', universityData.id),
      
      // Fetch admission requirements
      supabase
        .from('admission_requirements')
        .select('*')
        .eq('university_id', universityData.id),
      
      // Fetch scholarships
      supabase
        .from('scholarships')
        .select('*')
        .eq('university_id', universityData.id),
      
      // Fetch FAQs
      supabase
        .from('university_faqs')
        .select('*')
        .eq('university_id', universityData.id)
    ]);
    
    const programs = programsResponse.data || [];
    const requirements = requirementsResponse.data || [];
    const scholarships = scholarshipsResponse.data || [];
    const faqs = faqsResponse.data || [];
    
    // Map all the data to our University interface
    return {
      id: universityData.id,
      name: universityData.name,
      slug: universityData.slug,
      countryId: universityData.country_id,
      countryName: universityData.countries?.name || '',
      location: universityData.city || '',
      foundingYear: universityData.founding_year || 1900,
      isPublic: universityData.is_public || false,
      ranking: {
        qs: universityData.ranking || undefined,
        the: universityData.ranking_the || undefined,
        arwu: universityData.ranking_arwu || undefined,
      },
      logo: universityData.logo_url || '',
      image: universityData.campus_image_url || '',
      website: universityData.website || '',
      description: universityData.description || '',
      studentPopulation: universityData.student_population || 0,
      internationalStudentPercentage: universityData.international_student_percentage || 0,
      
      // Map related data
      featuredPrograms: programs.map(program => ({
        id: program.id,
        universityId: program.university_id,
        name: program.name,
        degree: program.degree as 'Bachelor' | 'Master' | 'PhD' | 'Certificate' | 'Diploma',
        field: program.field,
        language: program.language,
        duration: program.duration,
        description: program.description,
        tuitionFee: program.tuition_fee,
        applicationDeadlines: program.application_deadlines,
        isPopular: program.is_popular
      })),
      
      admissionRequirements: requirements.map(req => ({
        id: req.id,
        universityId: req.university_id,
        type: req.type as 'Academic' | 'Language' | 'Documents' | 'Other',
        description: req.description,
        qogentInsight: req.qogent_insight
      })),
      
      costs: {
        tuitionDomestic: universityData.tuition_fee_domestic || '',
        tuitionInternational: universityData.tuition_fee_international || '',
        applicationFee: universityData.application_fee,
        otherFees: universityData.other_fees,
        healthInsurance: universityData.health_insurance || '',
        livingExpenses: {
          accommodation: universityData.living_expense_accommodation || '',
          food: universityData.living_expense_food || '',
          transportation: universityData.living_expense_transportation || '',
          other: universityData.living_expense_other || '',
        }
      },
      
      scholarships: scholarships.map(scholarship => ({
        id: scholarship.id,
        universityId: scholarship.university_id,
        name: scholarship.name,
        provider: scholarship.provider as 'University' | 'Government' | 'Private' | 'Other',
        amount: scholarship.amount,
        description: scholarship.description,
        eligibility: scholarship.eligibility,
        applicationProcess: scholarship.application_process,
        deadline: scholarship.deadline,
        successRate: scholarship.success_rate
      })),
      
      studentLife: {
        housing: universityData.housing_info || '',
        campusFacilities: universityData.campus_facilities || [],
        internationalSupport: universityData.international_support || '',
        clubs: universityData.clubs_info || '',
      },
      
      qogentMetrics: {
        admissionSuccessRate: universityData.admission_success_rate || '85%',
        studentsPlaced: universityData.students_placed || 200,
      },
      
      faq: faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      })),
    };
  } catch (error) {
    console.error('Error fetching university by slug:', error);
    return undefined;
  }
}

// Function to fetch universities by country
async function getUniversitiesByCountry(countryId: number): Promise<University[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*, countries(name, code, slug)')
    .eq('country_id', countryId);
  
  if (error) throw error;
  
  if (!data) return [];
  
  return data.map(uni => ({
    id: uni.id,
    name: uni.name,
    slug: uni.slug,
    countryId: uni.country_id,
    countryName: uni.countries?.name || '',
    location: uni.city || '',
    foundingYear: uni.founding_year || 1900,
    isPublic: uni.is_public || false,
    ranking: {
      qs: uni.ranking || undefined,
      the: undefined,
      arwu: undefined,
    },
    logo: uni.logo_url || '',
    image: uni.campus_image_url || '',
    website: uni.website || '',
    description: uni.description || '',
    studentPopulation: uni.student_population || 0,
    internationalStudentPercentage: uni.international_student_percentage || 0,
    featuredPrograms: [],
    admissionRequirements: [],
    costs: {
      tuitionDomestic: uni.tuition_fee_domestic || '',
      tuitionInternational: uni.tuition_fee_international || '',
      livingExpenses: {
        accommodation: '',
        food: '',
        transportation: '',
        other: '',
      },
      healthInsurance: '',
    },
    scholarships: [],
    studentLife: {
      housing: '',
      campusFacilities: [],
      internationalSupport: '',
      clubs: '',
    },
    qogentMetrics: {
      admissionSuccessRate: '85%',
      studentsPlaced: 200,
    },
    faq: [],
  }));
}

// Function to fetch simplified university card data
async function getUniversityCards(): Promise<UniversityCard[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*, countries(name, code, slug)');
  
  if (error) throw error;
  
  if (!data) return [];
  
  return data.map(uni => {
    return {
      id: uni.id,
      name: uni.name,
      slug: uni.slug,
      countryId: uni.country_id,
      countryName: uni.countries?.name || '',
      logo: uni.logo_url || '',
      isPublic: uni.is_public || false,
      ranking: {
        qs: uni.ranking || undefined,
      },
      location: uni.city || '',
      featuredFields: [],
      qogentSuccessRate: '85%',
    };
  });
}

// Function to fetch filtered university cards
async function getFilteredUniversityCards(
  filters: UniversityFilterOptions
): Promise<UniversityCard[]> {
  let query = supabase
    .from('universities')
    .select('*, countries(name, code, slug)');
  
  // Apply country filter if present
  if (filters.countries.length > 0) {
    // Get universities for the specified countries
    const { data: countriesData } = await supabase
      .from('countries')
      .select('id')
      .in('name', filters.countries);
    
    if (countriesData && countriesData.length > 0) {
      const countryIds = countriesData.map(c => c.id);
      query = query.in('country_id', countryIds);
    }
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  if (!data) return [];
  
  const cards = data.map(uni => {
    return {
      id: uni.id,
      name: uni.name,
      slug: uni.slug,
      countryId: uni.country_id,
      countryName: uni.countries?.name || '',
      logo: uni.logo_url || '',
      isPublic: uni.is_public || false,
      ranking: {
        qs: uni.ranking || undefined,
      },
      location: uni.city || '',
      featuredFields: [],
      qogentSuccessRate: '85%',
    };
  });
  
  // Apply client-side filters that couldn't be done in the query
  return cards.filter((card) => {
    // Filter by public/private
    if (filters.isPublic !== undefined && card.isPublic !== filters.isPublic) {
      return false;
    }
    
    // Filter by fields (any match) - skip for now since we don't have featuredFields
    /* if (filters.fields.length > 0 && 
        !card.featuredFields.some(field => filters.fields.includes(field))) {
      return false;
    } */
    
    return true;
  });
}

// Hook for accessing all universities
export function useUniversities() {
  return useQuery({
    queryKey: ['universities'],
    queryFn: getUniversities,
  });
}

// Hook for accessing a single university by slug
export function useUniversity(slug: string) {
  return useQuery({
    queryKey: ['university', slug],
    queryFn: () => getUniversityBySlug(slug),
    enabled: !!slug,
  });
}

// Hook for accessing universities by country
export function useUniversitiesByCountry(countryId: number) {
  return useQuery({
    queryKey: ['universities', 'country', countryId],
    queryFn: () => getUniversitiesByCountry(countryId),
    enabled: !!countryId,
  });
}

// Hook for accessing simplified university card data
export function useUniversityCards() {
  return useQuery({
    queryKey: ['universityCards'],
    queryFn: getUniversityCards,
  });
}

// Hook for accessing filtered university card data
export function useFilteredUniversityCards(filters: UniversityFilterOptions) {
  return useQuery({
    queryKey: ['universityCards', 'filtered', filters],
    queryFn: () => getFilteredUniversityCards(filters),
  });
} 