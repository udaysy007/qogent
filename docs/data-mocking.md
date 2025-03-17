# Qogent.in Data Mocking Strategy

## Overview

This document outlines the approach for creating, managing, and using mock data in the Qogent.in frontend-only application. The strategy ensures consistent data representation, enables robust testing, and facilitates smooth development without backend dependencies.

## Core Principles

1. **Realistic Data**: Mock data should reflect real-world scenarios and edge cases
2. **Consistency**: Data structures must be consistent across all components
3. **Extensibility**: Data models should be easily expandable as requirements evolve
4. **Type Safety**: All data should have clear TypeScript interfaces
5. **Performance**: Data organization should optimize for frontend performance
6. **Maintainability**: Easy to update and manage as the application grows

## Data Organization

### Directory Structure

```
src/
└── data/
    ├── models/               # TypeScript interfaces
    │   ├── countries.ts
    │   ├── universities.ts
    │   ├── programs.ts
    │   └── ...
    ├── static/               # Static JSON data files
    │   ├── countries.json
    │   ├── universities.json
    │   ├── programs.json
    │   └── ...
    ├── seed/                 # Data generation scripts
    │   ├── generators.ts
    │   ├── universities-generator.ts
    │   └── ...
    └── api/                  # Mock API implementation
        ├── client.ts
        ├── endpoints.ts
        └── handlers/
            ├── countries.ts
            ├── universities.ts
            └── ...
```

### Data Models

TypeScript interfaces for all data entities should be defined in the `models` directory:

**Example: Country Model (src/data/models/countries.ts)**

```typescript
export interface Country {
  id: number
  name: string
  code: string
  region: string
  flagUrl: string
  description: string
  featured?: boolean
  costOfLiving: {
    accommodation: {
      low: number
      high: number
      currency: string
    }
    food: {
      low: number
      high: number
      currency: string
    }
    transportation: {
      low: number
      high: number
      currency: string
    }
  }
  studentVisaRequirements: string[]
  languageRequirements: {
    english?: {
      required: boolean
      tests: string[]
      minimumScores: Record<string, string>
    }
    local?: {
      required: boolean
      tests: string[]
      minimumScores: Record<string, string>
    }
  }
  universities: number[] // References to university IDs
}
```

**Example: University Model (src/data/models/universities.ts)**

```typescript
export interface University {
  id: number
  name: string
  countryId: number // Reference to country ID
  city: string
  website: string
  isPublic: boolean
  ranking?: number
  description: string
  programs: number[] // References to program IDs
  tuitionFees: {
    undergraduate: {
      domestic: {
        low: number
        high: number
        currency: string
      }
      international: {
        low: number
        high: number
        currency: string
      }
    }
    graduate: {
      domestic: {
        low: number
        high: number
        currency: string
      }
      international: {
        low: number
        high: number
        currency: string
      }
    }
  }
  admissionRequirements: {
    undergraduate: string[]
    graduate: string[]
  }
  applicationDeadlines: {
    fallSemester: string
    springSemester?: string
    summerSemester?: string
  }
  campusFeatures: string[]
  images: {
    campus: string[]
    logo: string
  }
}
```

**Example: Career Model (src/data/models/careers.ts)**

```typescript
export interface Career {
  id: number
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits?: string[]
  postedDate: string
  applicationUrl: string
  isActive: boolean
}
```

## Static Data Files

JSON files containing the actual data should be stored in the `static` directory:

**Example: Countries Data (src/data/static/countries.json)**

```json
[
  {
    "id": 1,
    "name": "Germany",
    "code": "DE",
    "region": "Europe",
    "flagUrl": "/images/flags/germany.svg",
    "description": "Germany offers high-quality, tuition-free education at public universities. It's known for engineering, sciences, and arts programs.",
    "featured": true,
    "costOfLiving": {
      "accommodation": {
        "low": 300,
        "high": 700,
        "currency": "EUR"
      },
      "food": {
        "low": 150,
        "high": 300,
        "currency": "EUR"
      },
      "transportation": {
        "low": 30,
        "high": 80,
        "currency": "EUR"
      }
    },
    "studentVisaRequirements": [
      "Proof of university admission",
      "Proof of financial resources (minimum €10,332 per year)",
      "Health insurance coverage",
      "Valid passport"
    ],
    "languageRequirements": {
      "english": {
        "required": false,
        "tests": ["IELTS", "TOEFL"],
        "minimumScores": {
          "IELTS": "6.0",
          "TOEFL": "80"
        }
      },
      "local": {
        "required": true,
        "tests": ["TestDaF", "DSH"],
        "minimumScores": {
          "TestDaF": "TDN 4",
          "DSH": "DSH-2"
        }
      }
    },
    "universities": [1, 5, 9, 12, 15]
  },
  {
    "id": 2,
    "name": "Canada",
    "code": "CA",
    "region": "North America",
    "flagUrl": "/images/flags/canada.svg",
    "description": "Canada offers a high standard of living, multicultural environment, and quality education with work opportunities during and after studies.",
    "featured": true,
    "costOfLiving": {
      "accommodation": {
        "low": 500,
        "high": 1200,
        "currency": "CAD"
      },
      "food": {
        "low": 200,
        "high": 400,
        "currency": "CAD"
      },
      "transportation": {
        "low": 80,
        "high": 120,
        "currency": "CAD"
      }
    },
    "studentVisaRequirements": [
      "Letter of acceptance from a Canadian institution",
      "Proof of funds (tuition plus $10,000 CAD for living expenses)",
      "Clean criminal record",
      "Good health and medical exam if required",
      "Intent to leave Canada after studies"
    ],
    "languageRequirements": {
      "english": {
        "required": true,
        "tests": ["IELTS", "TOEFL", "CAEL"],
        "minimumScores": {
          "IELTS": "6.5",
          "TOEFL": "90",
          "CAEL": "70"
        }
      }
    },
    "universities": [2, 6, 10, 13, 16]
  }
]
```

**Example: Careers Data (src/data/static/careers.json)**

```json
[
  {
    "id": 1,
    "title": "Full Stack Developer",
    "department": "Technology",
    "location": "Remote, India",
    "type": "Full-time",
    "description": "Join Qogent as a Full Stack Web Developer, where your efforts directly contribute to enhancing educational platforms globally. Shape the future by developing innovative technologies and fostering integration in the study abroad sector.",
    "responsibilities": [
      "Develop and maintain our React/Next.js frontend applications",
      "Build and improve RESTful APIs",
      "Collaborate with the design team to implement UI/UX improvements",
      "Participate in code reviews and maintain high code quality",
      "Optimize applications for maximum speed and scalability"
    ],
    "requirements": [
      "3+ years of experience in full-stack development",
      "Proficiency in React, Next.js, and TypeScript",
      "Experience with RESTful APIs and backend development",
      "Familiarity with Git and CI/CD pipelines",
      "Strong problem-solving skills and attention to detail"
    ],
    "benefits": [
      "Competitive salary",
      "Flexible work hours",
      "Remote work options",
      "Learning and development opportunities",
      "Health insurance"
    ],
    "postedDate": "2024-04-12",
    "applicationUrl": "/apply?position=full-stack-developer",
    "isActive": true
  },
  {
    "id": 2,
    "title": "SOP Writer",
    "department": "Content",
    "location": "Remote, India",
    "type": "Full-time",
    "description": "Join us as an SOP Writer at Qogent, where your words shape futures. Craft compelling Statements of Purpose that unlock global education opportunities, making a tangible impact on students' academic journeys.",
    "responsibilities": [
      "Create personalized Statements of Purpose for students applying to international universities",
      "Interview students to understand their academic and career goals",
      "Research university programs to tailor content appropriately",
      "Edit and refine content to meet high standards",
      "Meet deadlines consistently"
    ],
    "requirements": [
      "Excellent English writing and editing skills",
      "Understanding of higher education application processes",
      "Ability to capture individual voice and personality in writing",
      "Strong research skills",
      "Attention to detail and deadline-oriented"
    ],
    "benefits": [
      "Competitive pay structure",
      "Flexible work schedule",
      "Professional development opportunities",
      "Supportive team environment"
    ],
    "postedDate": "2024-04-03",
    "applicationUrl": "/apply?position=sop-writer",
    "isActive": true
  },
  {
    "id": 3,
    "title": "Digital Marketer",
    "department": "Marketing",
    "location": "Remote, India",
    "type": "Full-time",
    "description": "Join our dynamic team as a Digital Marketer and harness your creativity to inspire students' study abroad dreams. Shape futures with engaging content and innovative campaigns.",
    "responsibilities": [
      "Develop and implement digital marketing strategies",
      "Manage social media campaigns and content calendars",
      "Track and analyze marketing performance metrics",
      "Create engaging content for various platforms",
      "Collaborate with cross-functional teams"
    ],
    "requirements": [
      "2+ years of experience in digital marketing",
      "Proficiency in social media platforms and analytics tools",
      "Experience with content creation and SEO",
      "Understanding of the education sector (preferred)",
      "Creative mindset and analytical skills"
    ],
    "postedDate": "2024-03-04",
    "applicationUrl": "/apply?position=digital-marketer",
    "isActive": true
  }
]
```

## Data Generation

For generating large datasets or randomized test data, use scripts in the `seed` directory:

**Example: University Generator (src/data/seed/universities-generator.ts)**

```typescript
import { University } from '../models/universities'
import { faker } from '@faker-js/faker'

export function generateUniversities(
  count: number,
  countryIds: number[]
): University[] {
  const universities: University[] = []

  for (let i = 0; i < count; i++) {
    const countryId = faker.helpers.arrayElement(countryIds)
    const isPublic = faker.datatype.boolean(0.7) // 70% chance of being public

    universities.push({
      id: i + 1,
      name: faker.company.name() + ' University',
      countryId,
      city: faker.address.city(),
      website: `https://www.${faker.word.adjective().toLowerCase()}university.edu`,
      isPublic,
      ranking: faker.datatype.boolean(0.8)
        ? faker.datatype.number({ min: 1, max: 1000 })
        : undefined,
      description: faker.lorem.paragraph(3),
      programs: [...Array(faker.datatype.number({ min: 5, max: 20 }))].map(() =>
        faker.datatype.number({ min: 1, max: 100 })
      ),
      tuitionFees: {
        undergraduate: {
          domestic: {
            low: isPublic ? 0 : faker.datatype.number({ min: 1000, max: 5000 }),
            high: isPublic
              ? 500
              : faker.datatype.number({ min: 5000, max: 15000 }),
            currency: countryId === 1 ? 'EUR' : countryId === 2 ? 'CAD' : 'USD',
          },
          international: {
            low: faker.datatype.number({ min: 5000, max: 10000 }),
            high: faker.datatype.number({ min: 10000, max: 30000 }),
            currency: countryId === 1 ? 'EUR' : countryId === 2 ? 'CAD' : 'USD',
          },
        },
        graduate: {
          domestic: {
            low: isPublic ? 0 : faker.datatype.number({ min: 2000, max: 8000 }),
            high: isPublic
              ? 1000
              : faker.datatype.number({ min: 8000, max: 20000 }),
            currency: countryId === 1 ? 'EUR' : countryId === 2 ? 'CAD' : 'USD',
          },
          international: {
            low: faker.datatype.number({ min: 8000, max: 15000 }),
            high: faker.datatype.number({ min: 15000, max: 40000 }),
            currency: countryId === 1 ? 'EUR' : countryId === 2 ? 'CAD' : 'USD',
          },
        },
      },
      admissionRequirements: {
        undergraduate: [
          'High school diploma or equivalent',
          'Standardized test scores',
          'Language proficiency',
          ...Array(faker.datatype.number({ min: 1, max: 3 }))
            .fill('')
            .map(() => faker.lorem.sentence()),
        ],
        graduate: [
          'Undergraduate degree',
          'Letters of recommendation',
          'Statement of purpose',
          'Language proficiency',
          ...Array(faker.datatype.number({ min: 1, max: 3 }))
            .fill('')
            .map(() => faker.lorem.sentence()),
        ],
      },
      applicationDeadlines: {
        fallSemester: `${faker.date.month()} 15`,
        springSemester: faker.datatype.boolean(0.7)
          ? `${faker.date.month()} 1`
          : undefined,
        summerSemester: faker.datatype.boolean(0.3)
          ? `${faker.date.month()} 1`
          : undefined,
      },
      campusFeatures: Array(faker.datatype.number({ min: 3, max: 8 }))
        .fill('')
        .map(() => faker.lorem.words(2)),
      images: {
        campus: Array(faker.datatype.number({ min: 2, max: 5 }))
          .fill('')
          .map(
            (_, index) =>
              `/images/universities/campus-${i + 1}-${index + 1}.jpg`
          ),
        logo: `/images/universities/logo-${i + 1}.svg`,
      },
    })
  }

  return universities
}
```

## Mock API Implementation

Create a unified API client that simulates backend calls:

**Example: API Client (src/data/api/client.ts)**

```typescript
import countriesData from '../static/countries.json'
import universitiesData from '../static/universities.json'
import programsData from '../static/programs.json'
import careersData from '../static/careers.json'

import { Country } from '../models/countries'
import { University } from '../models/universities'
import { Program } from '../models/programs'
import { Career } from '../models/careers'

// Add realistic delay to simulate network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulate API request with random delay between 100-500ms
const simulateRequest = async <T>(data: T): Promise<T> => {
  const randomDelay = Math.floor(Math.random() * 400) + 100
  await delay(randomDelay)
  return data
}

export interface QueryOptions {
  limit?: number
  offset?: number
  filters?: Record<string, any>
  sort?: {
    field: string
    direction: 'asc' | 'desc'
  }
}

class QogentAPI {
  // Countries
  async getCountries(options: QueryOptions = {}): Promise<Country[]> {
    let countries: Country[] = [...countriesData]

    // Apply filtering
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (key === 'region') {
          countries = countries.filter((country) => country.region === value)
        } else if (key === 'featured') {
          countries = countries.filter((country) => country.featured === value)
        }
      })
    }

    // Apply sorting
    if (options.sort) {
      countries.sort((a, b) => {
        const aValue = a[options.sort.field]
        const bValue = b[options.sort.field]

        if (options.sort.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    // Apply pagination
    if (options.limit !== undefined) {
      const offset = options.offset || 0
      countries = countries.slice(offset, offset + options.limit)
    }

    return simulateRequest(countries)
  }

  async getCountryById(id: number): Promise<Country | null> {
    const country = countriesData.find((c) => c.id === id) || null
    return simulateRequest(country)
  }

  // Universities
  async getUniversities(options: QueryOptions = {}): Promise<University[]> {
    let universities: University[] = [...universitiesData]

    // Apply filtering
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (key === 'countryId') {
          universities = universities.filter((uni) => uni.countryId === value)
        } else if (key === 'isPublic') {
          universities = universities.filter((uni) => uni.isPublic === value)
        } else if (key === 'city') {
          universities = universities.filter((uni) => uni.city === value)
        }
      })
    }

    // Apply sorting
    if (options.sort) {
      universities.sort((a, b) => {
        const aValue = a[options.sort.field]
        const bValue = b[options.sort.field]

        if (options.sort.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    // Apply pagination
    if (options.limit !== undefined) {
      const offset = options.offset || 0
      universities = universities.slice(offset, offset + options.limit)
    }

    return simulateRequest(universities)
  }

  async getUniversityById(id: number): Promise<University | null> {
    const university = universitiesData.find((u) => u.id === id) || null
    return simulateRequest(university)
  }

  // Search functionality across data types
  async search(
    query: string,
    type?: 'country' | 'university' | 'program' | 'career'
  ): Promise<any[]> {
    const normalizedQuery = query.toLowerCase()
    let results = []

    if (!type || type === 'country') {
      const countryResults = countriesData.filter(
        (country) =>
          country.name.toLowerCase().includes(normalizedQuery) ||
          country.description.toLowerCase().includes(normalizedQuery)
      )
      results.push(
        ...countryResults.map((result) => ({ ...result, type: 'country' }))
      )
    }

    if (!type || type === 'university') {
      const universityResults = universitiesData.filter(
        (university) =>
          university.name.toLowerCase().includes(normalizedQuery) ||
          university.description.toLowerCase().includes(normalizedQuery)
      )
      results.push(
        ...universityResults.map((result) => ({
          ...result,
          type: 'university',
        }))
      )
    }

    if (!type || type === 'career') {
      const careerResults = careersData.filter(
        (career) =>
          career.title.toLowerCase().includes(normalizedQuery) ||
          career.description.toLowerCase().includes(normalizedQuery) ||
          career.department.toLowerCase().includes(normalizedQuery)
      )
      results.push(
        ...careerResults.map((result) => ({ ...result, type: 'career' }))
      )
    }

    // Add similar logic for other data types
    // ...

    return simulateRequest(results)
  }

  // Country selector tool simulation
  async getCountryRecommendations(criteria: {
    budget: 'low' | 'medium' | 'high'
    language: 'english' | 'german' | 'any'
    workOpportunities: 'essential' | 'important' | 'notImportant'
  }): Promise<(Country & { match: number })[]> {
    const countries = countriesData as any[]

    // This would be a complex algorithm in a real backend
    // Here we're using a simplified matching logic
    const recommendations = countries.map((country) => {
      let match = 50 // Base score

      // Budget matching
      if (criteria.budget === 'low') {
        if (country.id === 1) match += 30 // Germany is good for low budget
        if (country.id === 3) match -= 20 // USA is expensive
      } else if (criteria.budget === 'high') {
        if (country.id === 3) match += 20 // USA offers premium education
      }

      // Language matching
      if (criteria.language === 'english') {
        if (country.id === 2 || country.id === 3) match += 25 // Canada and USA are English-speaking
        if (country.id === 1) match -= 10 // Germany may require German
      } else if (criteria.language === 'german') {
        if (country.id === 1) match += 30 // Germany for German speakers
      }

      // Work opportunities
      if (
        criteria.workOpportunities === 'essential' ||
        criteria.workOpportunities === 'important'
      ) {
        if (country.id === 2) match += 25 // Canada has good work opportunities
        if (country.id === 1) match += 20 // Germany allows working during studies
      }

      // Ensure match is within bounds
      match = Math.max(0, Math.min(100, match))

      return {
        ...country,
        match,
      }
    })

    // Sort by match percentage
    return simulateRequest(recommendations.sort((a, b) => b.match - a.match))
  }

  // Career listings
  async getCareers(options: QueryOptions = {}): Promise<Career[]> {
    let careers: Career[] = [...careersData]

    // Apply filtering
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (key === 'department') {
          careers = careers.filter((career) => career.department === value)
        } else if (key === 'isActive') {
          careers = careers.filter((career) => career.isActive === value)
        }
      })
    }

    // Apply sorting
    if (options.sort) {
      careers.sort((a, b) => {
        const aValue = a[options.sort.field]
        const bValue = b[options.sort.field]

        if (options.sort.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    // Apply pagination
    if (options.limit !== undefined) {
      const offset = options.offset || 0
      careers = careers.slice(offset, offset + options.limit)
    }

    return simulateRequest(careers)
  }

  async getCareerById(id: number): Promise<Career | null> {
    const career = careersData.find((j) => j.id === id) || null
    return simulateRequest(career)
  }
}

export const qogentAPI = new QogentAPI()
```

## Integration with React Components

**Example: Using the mock API in a Country List component**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { qogentAPI } from '@/data/api/client'
import { Country } from '@/data/models/countries'
import { CountryCard } from '@/components/country-card'
import { Skeleton } from '@/components/ui/skeleton'

export function CountryList({ featured = false }: { featured?: boolean }) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const filters = featured ? { featured: true } : {}
        const data = await qogentAPI.getCountries({
          filters,
          sort: { field: 'name', direction: 'asc' },
        })
        setCountries(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching countries:', error)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [featured])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {countries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          variant={featured ? 'featured' : 'default'}
        />
      ))}
    </div>
  )
}
```

## Custom React Hooks for Data Access

Create a set of custom hooks to provide easy access to the mock data:

**Example: Country Hooks (src/hooks/use-countries.ts)**

```typescript
import { useState, useEffect } from 'react'
import { qogentAPI, QueryOptions } from '@/data/api/client'
import { Country } from '@/data/models/countries'

export function useCountries(options: QueryOptions = {}) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await qogentAPI.getCountries(options)
        if (isMounted) {
          setCountries(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An error occurred'))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [options])

  return { countries, loading, error }
}

export function useCountry(id: number) {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await qogentAPI.getCountryById(id)
        if (isMounted) {
          setCountry(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An error occurred'))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [id])

  return { country, loading, error }
}
```

## Data Relationships

Managing relationships between different data entities in a frontend-only application:

### 1. ID-Based Relationships

Use ID references to establish relationships between entities:

```typescript
// Country has universities
interface Country {
  // ...
  universities: number[] // Array of university IDs
}

// University belongs to a country
interface University {
  // ...
  countryId: number // Reference to a country ID
}
```

### 2. Data Fetching with Relationships

**Example: Fetch a country with its universities**

```typescript
export async function getCountryWithUniversities(countryId: number) {
  // First get the country
  const country = await qogentAPI.getCountryById(countryId)

  if (!country) {
    return null
  }

  // Then get its universities
  const universities = await qogentAPI.getUniversities({
    filters: { countryId: country.id },
  })

  // Return combined data
  return {
    ...country,
    universities,
  }
}
```

## Local Storage Integration

Implement local storage to persist user preferences and selections:

**Example: Country Selector Tool with Local Storage**

```typescript
import { useState, useEffect } from 'react'
import { qogentAPI } from '@/data/api/client'

export function useCountrySelector() {
  // Get saved criteria from localStorage or use defaults
  const [criteria, setCriteria] = useState(() => {
    const saved =
      typeof window !== 'undefined'
        ? localStorage.getItem('countrySelectorCriteria')
        : null

    return saved
      ? JSON.parse(saved)
      : {
          budget: '',
          language: '',
          workOpportunities: '',
        }
  })

  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)

  // Save criteria to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('countrySelectorCriteria', JSON.stringify(criteria))
    }
  }, [criteria])

  const updateCriteria = (key, value) => {
    setCriteria((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const getRecommendations = async () => {
    setLoading(true)
    try {
      const results = await qogentAPI.getCountryRecommendations(criteria)
      setRecommendations(results)
    } catch (error) {
      console.error('Error getting recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    criteria,
    updateCriteria,
    recommendations,
    getRecommendations,
    loading,
  }
}
```

## Testing Strategies

### 1. Mock API Testing

Create a test utility to verify the mock API works correctly:

```typescript
// src/data/api/__tests__/client.test.ts
import { qogentAPI } from '../client'

describe('QogentAPI', () => {
  test('getCountries returns all countries', async () => {
    const countries = await qogentAPI.getCountries()
    expect(countries.length).toBeGreaterThan(0)
  })

  test('getCountries with featured filter returns only featured countries', async () => {
    const countries = await qogentAPI.getCountries({
      filters: { featured: true },
    })
    expect(countries.every((country) => country.featured)).toBe(true)
  })

  test('getCountryById returns correct country', async () => {
    const country = await qogentAPI.getCountryById(1)
    expect(country?.name).toBe('Germany')
  })

  test('getCountryById with invalid ID returns null', async () => {
    const country = await qogentAPI.getCountryById(9999)
    expect(country).toBeNull()
  })
})
```

### 2. Component Testing with Mock Data

Test components using the mock data:

```typescript
// src/__tests__/CountryList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { CountryList } from '@/components/country-list';
import { qogentAPI } from '@/data/api/client';

// Mock the API
jest.mock('@/data/api/client', () => ({
  qogentAPI: {
    getCountries: jest.fn()
  }
}));

describe('CountryList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders countries correctly', async () => {
    // Setup mock data
    const mockCountries = [
      {
        id: 1,
        name: 'Germany',
        code: 'DE',
        region: 'Europe',
        flagUrl: '/images/flags/germany.svg',
        description: 'Germany description'
      },
      {
        id: 2,
        name: 'Canada',
        code: 'CA',
        region: 'North America',
        flagUrl: '/images/flags/canada.svg',
        description: 'Canada description'
      }
    ];

    // Mock the API response
    (qogentAPI.getCountries as jest.Mock).mockResolvedValue(mockCountries);

    // Render the component
    render(<CountryList />);

    // Verify loading state
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });
});
```

## Performance Considerations

### 1. Pagination and Filtering

Implement pagination and filtering in the mock API to handle large datasets:

```typescript
// Example usage in a component
function UniversityList({ countryId, page = 1, pageSize = 10 }) {
  const [universities, setUniversities] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const result = await qogentAPI.getUniversities({
        filters: { countryId },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      })

      setUniversities(result)

      // In a real API, you would get total count from the response
      // For our mock, we need to fetch all and count
      const allResults = await qogentAPI.getUniversities({
        filters: { countryId },
      })
      setTotalCount(allResults.length)
    }

    fetchData()
  }, [countryId, page, pageSize])

  // Render the component with pagination
}
```

### 2. Memoization for Expensive Calculations

Use React's `useMemo` to optimize data processing:

```typescript
function UniversityComparison({ universityIds }) {
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    async function fetchData() {
      const results = await Promise.all(
        universityIds.map((id) => qogentAPI.getUniversityById(id))
      )
      setUniversities(results.filter(Boolean))
    }

    fetchData()
  }, [universityIds])

  // Memoize expensive comparison calculations
  const comparisonData = useMemo(() => {
    if (universities.length < 2) return null

    return {
      tuitionComparison: universities.map((uni) => ({
        name: uni.name,
        undergraduate: uni.tuitionFees.undergraduate.international.low,
        graduate: uni.tuitionFees.graduate.international.low,
      })),
      rankingComparison: universities.map((uni) => ({
        name: uni.name,
        ranking: uni.ranking || 'Not ranked',
      })),
      // More complex comparisons...
    }
  }, [universities])

  // Render the comparison
}
```

## Questions for Implementation:

1. What are the most important data entities for the MVP beyond countries and universities?
2. Should we implement more complex filtering and searching for the country selector tool?
3. Do we need to support offline mode with cached data?
4. What level of data validation should we implement on the front end?
5. Are there any accessibility considerations for data presentation in interactive tools?
