export interface University {
  id: number
  name: string
  slug: string
  countryId: number
  countryName: string
  location: string
  foundingYear: number
  isPublic: boolean
  ranking?: {
    qs?: number
    the?: number
    arwu?: number
  }
  logo?: string
  image?: string
  website: string
  description: string
  studentPopulation: number
  internationalStudentPercentage: number
  featuredPrograms: UniversityProgram[]
  admissionRequirements: AdmissionRequirement[]
  costs: UniversityCosts
  scholarships: Scholarship[]
  studentLife: StudentLife
  qogentMetrics: QogentMetrics
  faq: FAQ[]
}

export interface UniversityProgram {
  id: number
  universityId: number
  name: string
  degree: 'Bachelor' | 'Master' | 'PhD' | 'Certificate' | 'Diploma'
  field: string
  language: string
  duration: string
  description: string
  tuitionFee: string
  applicationDeadlines: string
  isPopular: boolean
}

export interface AdmissionRequirement {
  id: number
  universityId: number
  type: 'Academic' | 'Language' | 'Documents' | 'Other'
  description: string
  qogentInsight?: string
}

export interface UniversityCosts {
  tuitionDomestic: string
  tuitionInternational: string
  livingExpenses: {
    accommodation: string
    food: string
    transportation: string
    other: string
  }
  healthInsurance: string
  applicationFee?: string
  otherFees?: string
}

export interface Scholarship {
  id: number
  universityId: number
  name: string
  provider: 'University' | 'Government' | 'Private' | 'Other'
  amount: string
  description: string
  eligibility: string
  applicationProcess: string
  deadline: string
  successRate?: string
}

export interface StudentLife {
  housing: string
  campusFacilities: string[]
  internationalSupport: string
  clubs: string
}

export interface QogentMetrics {
  admissionSuccessRate: string
  studentsPlaced: number
  testimonials?: Testimonial[]
}

export interface Testimonial {
  id: number
  universityId: number
  studentName: string
  studentImage?: string
  program: string
  year: number
  quote: string
  rating: number
}

export interface FAQ {
  question: string
  answer: string
}

export interface UniversityFilterOptions {
  countries: string[]
  degrees: string[]
  isPublic?: boolean
  fields: string[]
}

// For simplified university card view
export interface UniversityCard {
  id: number
  name: string
  slug: string
  countryId: number
  countryName: string
  logo?: string
  isPublic: boolean
  ranking?: {
    qs?: number
  }
  location: string
  featuredFields: string[]
  qogentSuccessRate: string
} 