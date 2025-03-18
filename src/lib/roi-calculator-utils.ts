// Import the country database from destination-finder-utils
import { countryDatabase } from "@/lib/destination-finder-utils";

// Define country data for ROI calculations
export interface Country {
  name: string;
  region: string;
}

// Define region types for type safety
export type Region = "North America" | "Europe" | "Asia" | "Australia & Oceania" | "Other";

// Convert countryDatabase to an array of countries with regions
export const countries: Country[] = Object.keys(countryDatabase).map(name => {
  // Get region from the countryDatabase
  const regions = countryDatabase[name].regions || [];
  const region = regions.length > 0 ? regions[0] : "Other";
  
  // Map region names to our standard regions for ROI calculations
  let standardRegion: Region = "Other";
  if (region === "Europe") {
    standardRegion = "Europe";
  } else if (region === "North America") {
    standardRegion = "North America";
  } else if (region === "Asia" || region === "South Asia" || region === "East Asia") {
    standardRegion = "Asia";
  } else if (region === "Australia & Oceania" || region === "Oceania") {
    standardRegion = "Australia & Oceania";
  }
  
  return {
    name,
    region: standardRegion
  };
});

// Types and Interfaces
export interface EducationCost {
  tuitionFees: number;
  livingExpenses: number;
  otherExpenses: number;
}

export interface PotentialEarnings {
  startingSalary: number;
  salaryGrowthRate: number;
  employmentRate: number;
}

export interface ROICalculationResult {
  totalInvestment: number;
  fiveYearReturn: number;
  tenYearReturn: number;
  fifteenYearReturn: number;
  twentyYearReturn: number;
  paybackPeriod: number;
  roi5Years: number;
  roi10Years: number;
  roi15Years: number;
  roi20Years: number;
}

// Default values for different regions
export const defaultTuitionByRegion: Record<Region, number> = {
  "North America": 30000,
  "Europe": 15000,
  "Asia": 12000,
  "Australia & Oceania": 25000,
  "Other": 10000
};

export const defaultLivingExpensesByRegion: Record<Region, number> = {
  "North America": 15000,
  "Europe": 12000,
  "Asia": 8000,
  "Australia & Oceania": 14000,
  "Other": 7000
};

export const defaultStartingSalaryByRegion: Record<Region, number> = {
  "North America": 60000,
  "Europe": 45000,
  "Asia": 30000,
  "Australia & Oceania": 50000,
  "Other": 25000
};

export const defaultSalaryGrowthRateByRegion: Record<Region, number> = {
  "North America": 0.04,
  "Europe": 0.035,
  "Asia": 0.05,
  "Australia & Oceania": 0.04,
  "Other": 0.03
};

export const defaultEmploymentRateByRegion: Record<Region, number> = {
  "North America": 0.94,
  "Europe": 0.92,
  "Asia": 0.90,
  "Australia & Oceania": 0.93,
  "Other": 0.85
};

// Helper function to get default education costs by country
export function getDefaultEducationCostsByCountry(countryName: string): EducationCost {
  const country = countries.find(c => c.name === countryName);
  const region = country?.region as Region || "Other";
  
  return {
    tuitionFees: defaultTuitionByRegion[region],
    livingExpenses: defaultLivingExpensesByRegion[region],
    otherExpenses: 2000
  };
}

// Helper function to get default potential earnings by country
export function getDefaultPotentialEarningsByCountry(countryName: string): PotentialEarnings {
  const country = countries.find(c => c.name === countryName);
  const region = country?.region as Region || "Other";
  
  return {
    startingSalary: defaultStartingSalaryByRegion[region],
    salaryGrowthRate: defaultSalaryGrowthRateByRegion[region],
    employmentRate: defaultEmploymentRateByRegion[region]
  };
}

// Function to calculate the ROI
export function calculateROI(
  educationCost: EducationCost,
  potentialEarnings: PotentialEarnings,
  studyDuration: number,
  opportunityCost: number = 0,
  interestRate: number = 0.05
): ROICalculationResult {
  // Calculate total investment
  const tuitionTotal = educationCost.tuitionFees * studyDuration;
  const livingTotal = educationCost.livingExpenses * studyDuration;
  const otherTotal = educationCost.otherExpenses * studyDuration;
  const totalInvestment = tuitionTotal + livingTotal + otherTotal + opportunityCost;
  
  // Calculate future earnings with salary growth
  let cumulativeEarnings5Years = 0;
  let cumulativeEarnings10Years = 0;
  let cumulativeEarnings15Years = 0;
  let cumulativeEarnings20Years = 0;
  
  let currentSalary = potentialEarnings.startingSalary;
  
  for (let year = 1; year <= 20; year++) {
    const yearlyEarning = currentSalary * potentialEarnings.employmentRate;
    
    if (year <= 5) {
      cumulativeEarnings5Years += yearlyEarning / Math.pow(1 + interestRate, year);
    }
    
    if (year <= 10) {
      cumulativeEarnings10Years += yearlyEarning / Math.pow(1 + interestRate, year);
    }
    
    if (year <= 15) {
      cumulativeEarnings15Years += yearlyEarning / Math.pow(1 + interestRate, year);
    }
    
    cumulativeEarnings20Years += yearlyEarning / Math.pow(1 + interestRate, year);
    
    // Apply salary growth for next year
    currentSalary *= (1 + potentialEarnings.salaryGrowthRate);
  }
  
  // Calculate payback period (simple approximation)
  const annualBenefit = potentialEarnings.startingSalary * potentialEarnings.employmentRate;
  const paybackPeriod = totalInvestment / annualBenefit;
  
  // Calculate ROI for different time periods
  const roi5Years = (cumulativeEarnings5Years - totalInvestment) / totalInvestment * 100;
  const roi10Years = (cumulativeEarnings10Years - totalInvestment) / totalInvestment * 100;
  const roi15Years = (cumulativeEarnings15Years - totalInvestment) / totalInvestment * 100;
  const roi20Years = (cumulativeEarnings20Years - totalInvestment) / totalInvestment * 100;
  
  return {
    totalInvestment,
    fiveYearReturn: cumulativeEarnings5Years - totalInvestment,
    tenYearReturn: cumulativeEarnings10Years - totalInvestment,
    fifteenYearReturn: cumulativeEarnings15Years - totalInvestment,
    twentyYearReturn: cumulativeEarnings20Years - totalInvestment,
    paybackPeriod,
    roi5Years,
    roi10Years,
    roi15Years,
    roi20Years
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

// Get ROI rating based on percentage
export function getRoiRating(percentage: number): 'excellent' | 'good' | 'average' | 'poor' | 'negative' {
  if (percentage >= 300) return 'excellent';
  if (percentage >= 150) return 'good';
  if (percentage >= 50) return 'average';
  if (percentage >= 0) return 'poor';
  return 'negative';
}

// Get color class based on ROI rating
export function getRoiColorClass(rating: string): string {
  switch (rating) {
    case 'excellent': return 'var(--success)';
    case 'good': return 'var(--info)';
    case 'average': return 'var(--secondary)';
    case 'poor': return 'var(--warning)';
    case 'negative': return 'var(--destructive)';
    default: return 'var(--secondary)';
  }
}

// Format percentage
export function formatPercentage(percentage: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(percentage / 100);
}

// Format years
export function formatYears(years: number): string {
  return `${years.toFixed(1)} years`;
}

// Get available countries
export function getAvailableCountries(): string[] {
  return countries.map(country => country.name);
}

// Get common degree durations
export function getDegreeDurations(): { value: number; label: string }[] {
  return [
    { value: 1, label: '1 year (Certificate/Diploma)' },
    { value: 2, label: '2 years (Associate Degree)' },
    { value: 3, label: '3 years (Bachelor\'s - some countries)' },
    { value: 4, label: '4 years (Bachelor\'s)' },
    { value: 5, label: '5 years (Bachelor\'s + Master\'s)' },
    { value: 2, label: '2 years (Master\'s)' },
    { value: 4, label: '4+ years (PhD)' }
  ];
} 