// Types for the destination finder
export interface CountryData {
  tuition: 'free' | 'low' | 'medium' | 'high' | 'very high';
  livingCost: 'low' | 'medium' | 'high' | 'very high';
  englishPrograms: 'all' | 'many' | 'limited' | 'very limited';
  visaEase: 'high' | 'medium' | 'low';
  jobProspects: 'excellent' | 'good' | 'medium' | 'limited';
  scholarships: 'available' | 'competitive' | 'limited' | 'very limited';
  qualityOfLife: 'high' | 'medium' | 'low';
  regions: string[];
  cityTypes: string[];
  strengths: string[];
  characteristics: {
    freeEducation: boolean;
    workRights: boolean;
    pathToResidency: boolean;
    internationalCommunity: boolean;
  };
}

export interface UserPreferences {
  studyLevel: 'Bachelors' | 'Masters' | 'PhD' | 'Professional';
  fieldOfStudy: 'Engineering' | 'Computer Science' | 'Business' | 'Medicine' | 
                'Natural Sciences' | 'Arts' | 'Social Sciences' | 'Environmental';
  academicPerformance: 'High Achiever' | 'Strong' | 'Projects Focus' | 'Well Rounded';
  postGradPlans: 'Work Abroad' | 'Return Home' | 'Flexible Plans';
  tuitionBudget: number;
  livingExpensesBudget: number;
  scholarshipNeeds: string;
  workPlans: string;
  preferredRegions: string[];
  languagePreference: string;
  locationType: string;
  importantFactors: Array<'Education Quality' | 'Cost' | 'Job Market' | 
                        'Visa Process' | 'Safety' | 'Lifestyle'>;
}

export interface CountryRecommendation {
  country: string;
  score: number;
  highlights: string[];
  description: string;
}

// Database of countries and their characteristics
export const countryDatabase: Record<string, CountryData> = {
  "Germany": {
    tuition: "free",
    livingCost: "medium",
    englishPrograms: "many",
    visaEase: "medium",
    jobProspects: "excellent",
    scholarships: "available",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city"],
    strengths: ["Engineering", "Computer Science", "Natural Sciences"],
    characteristics: {
      freeEducation: true,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Canada": {
    tuition: "high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "high",
    jobProspects: "good",
    scholarships: "limited",
    qualityOfLife: "high",
    regions: ["North America"],
    cityTypes: ["Major city", "Medium-sized city", "Small town"],
    strengths: ["Business & Management", "Computer Science", "Engineering"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Netherlands": {
    tuition: "medium",
    livingCost: "high",
    englishPrograms: "many",
    visaEase: "high",
    jobProspects: "good",
    scholarships: "limited",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city"],
    strengths: ["Business & Management", "Social Sciences", "Engineering"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: false,
      internationalCommunity: true
    }
  },
  "Australia": {
    tuition: "very high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "medium",
    jobProspects: "excellent",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Australia & New Zealand"],
    cityTypes: ["Major city", "Medium-sized city"],
    strengths: ["Medicine & Health", "Engineering", "Sciences", "Computer Science"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Singapore": {
    tuition: "high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "medium",
    jobProspects: "excellent",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Asia"],
    cityTypes: ["Major city"],
    strengths: ["Computer Science", "Business & Management", "Engineering"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: false,
      internationalCommunity: true
    }
  },
  "France": {
    tuition: "free",
    livingCost: "medium",
    englishPrograms: "many",
    visaEase: "medium",
    jobProspects: "good",
    scholarships: "available",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city", "Small town"],
    strengths: ["Arts & Humanities", "Business & Management", "Sciences", "Engineering"],
    characteristics: {
      freeEducation: true,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Japan": {
    tuition: "medium",
    livingCost: "high",
    englishPrograms: "limited",
    visaEase: "medium",
    jobProspects: "good",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Asia"],
    cityTypes: ["Major city", "Medium-sized city"],
    strengths: ["Engineering", "Sciences", "Arts & Humanities", "Computer Science"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "USA": {
    tuition: "very high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "medium",
    jobProspects: "excellent",
    scholarships: "available",
    qualityOfLife: "high",
    regions: ["North America"],
    cityTypes: ["Major city", "Medium-sized city", "Small town"],
    strengths: ["Computer Science", "Business & Management", "Medicine & Health", "Engineering"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "UK": {
    tuition: "high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "high",
    jobProspects: "excellent",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city", "Small town"],
    strengths: ["Business & Management", "Arts & Humanities", "Social Sciences", "Computer Science"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Poland": {
    tuition: "low",
    livingCost: "low",
    englishPrograms: "many",
    visaEase: "medium",
    jobProspects: "medium",
    scholarships: "available",
    qualityOfLife: "medium",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city"],
    strengths: ["Medicine & Health", "Engineering", "Computer Science"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: false,
      internationalCommunity: true
    }
  },
  "Ireland": {
    tuition: "high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "high",
    jobProspects: "excellent",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city", "Small town"],
    strengths: ["Computer Science", "Business & Management", "Medicine & Health"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "New Zealand": {
    tuition: "high",
    livingCost: "high",
    englishPrograms: "all",
    visaEase: "high",
    jobProspects: "excellent",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Australia & New Zealand"],
    cityTypes: ["Major city", "Small town"],
    strengths: ["Agriculture", "Environmental Sciences", "Tourism", "Computer Science"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Sweden": {
    tuition: "medium",
    livingCost: "high",
    englishPrograms: "many",
    visaEase: "high",
    jobProspects: "excellent",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city"],
    strengths: ["Engineering", "Social Sciences", "Environmental Sciences", "Computer Science"],
    characteristics: {
      freeEducation: false,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  },
  "Italy": {
    tuition: "free",
    livingCost: "medium",
    englishPrograms: "many",
    visaEase: "medium",
    jobProspects: "good",
    scholarships: "competitive",
    qualityOfLife: "high",
    regions: ["Europe"],
    cityTypes: ["Major city", "Medium-sized city", "Small town"],
    strengths: ["Arts & Humanities", "Fashion & Design", "Engineering", "Computer Science"],
    characteristics: {
      freeEducation: true,
      workRights: true,
      pathToResidency: true,
      internationalCommunity: true
    }
  }
};

// Scoring function that evaluates how well each country matches the user's preferences
export function scoreCountries(preferences: UserPreferences): CountryRecommendation[] {
  console.log("scoreCountries called with preferences:", preferences);

  const livingCostMap: Record<string, number> = {
    "low": 800,
    "medium": 1200,
    "high": 1800,
    "very high": 2500
  };

  // Calculate minimum viable budget for each country (tuition + living costs)
  const calculateMinimumViableBudget = (country: string, data: CountryData) => {
    const tuitionCostMap = {
      "free": 500,      // For countries with free or nearly free tuition
      "low": 3000,      // Updated from 5000
      "medium": 12000,  // Reduced from 15000
      "high": 25000,    // Reduced from 30000
      "very high": 40000 // Reduced from 45000
    };
    
    const annualLivingCostMap = {
      "low": 9600,     // 800 × 12
      "medium": 14400, // 1200 × 12
      "high": 21600,   // 1800 × 12
      "very high": 30000 // 2500 × 12
    };
    
    const tuition = tuitionCostMap[data.tuition as keyof typeof tuitionCostMap] || 15000;
    const livingCost = annualLivingCostMap[data.livingCost as keyof typeof annualLivingCostMap] || 18000;
    
    return tuition + livingCost;
  };

  // Country-specific modifiers to make the competition more balanced
  const countryModifiers: Record<string, number> = {
    "Germany": 0,      // Removed penalty
    "Poland": 1,       // Reduced boost
    "France": 0,       // Removed boost
    "Italy": 0,        // Removed boost
    "Canada": -2,      // Reduced penalty
    "USA": -2,         // Kept penalty
    "UK": -2,          // Kept penalty
    "Australia": -2,   // Kept penalty
    "Ireland": -1,     // Kept small penalty
    "Singapore": -1,   // Kept small penalty
    "Netherlands": 0   // Added neutral modifier
  };
  
  // Function to adjust country modifiers based on tuition budget
  const adjustCountryModifiersForBudget = (preferences: UserPreferences) => {
    const adjustedModifiers = {...countryModifiers};
    
    // For very low budgets, further adjust to favor low-cost countries
    if (preferences.tuitionBudget <= 5000) {
      // Boost countries with low tuition
      adjustedModifiers["Germany"] = 3;
      adjustedModifiers["Poland"] = 4;
      adjustedModifiers["France"] = 3;
      adjustedModifiers["Italy"] = 3;
      
      // Penalize high-cost countries
      adjustedModifiers["USA"] = -8;
      adjustedModifiers["UK"] = -6;
      adjustedModifiers["Australia"] = -8;
      adjustedModifiers["Canada"] = -6;
      adjustedModifiers["Ireland"] = -4;
      adjustedModifiers["Singapore"] = -4;
      adjustedModifiers["New Zealand"] = -4;
      adjustedModifiers["Netherlands"] = -2;
    }
    // For medium budgets, make more balanced adjustments
    else if (preferences.tuitionBudget <= 15000) {
      // Moderate boosts/penalties
      adjustedModifiers["Germany"] = 2;
      adjustedModifiers["Poland"] = 2;
      adjustedModifiers["France"] = 1;
      adjustedModifiers["Italy"] = 1;
      
      adjustedModifiers["USA"] = -4;
      adjustedModifiers["UK"] = -2;
      adjustedModifiers["Australia"] = -3;
      adjustedModifiers["Netherlands"] = -1;
    }
    
    return adjustedModifiers;
  };
  
  // Global reputation adjustments - reduced impact
  const reputationBonus: Record<string, number> = {
    "USA": 2,
    "UK": 2,
    "Australia": 1,
    "Canada": 1,
    "Germany": 1,
    "Japan": 1,
    "Singapore": 1,
    "Netherlands": 1,
    "Sweden": 1
  };

  // Score each country based on the user's preferences
  const scoredCountries = Object.entries(countryDatabase).map(([country, data]) => {
    // Initialize with a base value - scores will range roughly from 0-100
    // Start with a lower base score to allow more differentiation
    let score = 40;
    const highlights: string[] = [];
    let description = "";

    // Apply country-specific modifier if it exists
    const adjustedModifiers = adjustCountryModifiersForBudget(preferences);
    if (adjustedModifiers[country]) {
      score += adjustedModifiers[country] * 0.5; // Further reduced impact of modifiers
    }
    
    // Apply global reputation bonus if it exists
    if (reputationBonus[country]) {
      score += reputationBonus[country] * 0.5; // Further reduced reputation impact
    }

    // Field of study match (high weight factor)
    if (data.strengths.includes(preferences.fieldOfStudy)) {
      score += 12; // Reduced from 15
      highlights.push(`Strong in ${preferences.fieldOfStudy}`);
    } else {
      score -= 8; // Reduced penalty from 10
    }

    // Region preference match (important but not critical)
    if (preferences.preferredRegions.length === 0 || 
        preferences.preferredRegions.some((region: string) => data.regions.includes(region)) || 
        preferences.preferredRegions.includes("No preference")) {
      score += 10;
    } else {
      score -= 15; // Reduced from 25
    }

    // Budget considerations for tuition (critical factor)
    const tuitionCostMap = {
      "free": 500,
      "low": 3000,
      "medium": 12000,
      "high": 25000,
      "very high": 40000
    };
    
    const estimatedTuition = tuitionCostMap[data.tuition as keyof typeof tuitionCostMap];
    
    if (preferences.tuitionBudget >= estimatedTuition) {
      score += 10;
      
      if (preferences.tuitionBudget < estimatedTuition * 1.5) {
        score += 3; // Reduced from 5
      }
      
      if (data.tuition === "low") {
        highlights.push("Free/low tuition");
        
        if (data.characteristics.freeEducation) {
          score += 3; // Reduced from 5
        }
      }
      
      if (data.tuition === "high" && preferences.tuitionBudget >= estimatedTuition * 1.2) {
        score += 3;
        highlights.push("Premium education");
      } else if (data.tuition === "very high" && preferences.tuitionBudget >= estimatedTuition * 1.1) {
        score += 4;
        highlights.push("World-class education");
      }
    } else {
      const shortfall = (estimatedTuition - preferences.tuitionBudget) / estimatedTuition;
      
      if (shortfall > 0.8) {
        score -= 35; // Reduced from 50
      } else if (shortfall > 0.5) {
        score -= 25; // Reduced from 35
      } else {
        score -= Math.round(20 * shortfall); // Reduced from 25
      }
    }

    // ------------------------
    // Budget considerations for living costs
    // ------------------------
    const estimatedLivingCost = livingCostMap[data.livingCost as keyof typeof livingCostMap] || 1500;
    if (preferences.livingExpensesBudget >= estimatedLivingCost) {
      score += 10;
      
      // Small bonus for luxury living if budget allows
      if (data.livingCost === "high" || data.livingCost === "very high") {
        if (preferences.livingExpensesBudget >= estimatedLivingCost * 1.2) {
          score += 2; // Small bonus for countries with high living standards when affordable
        }
      }
    } else {
      // Penalty based on how far below the budget is
      const livingShortfall = (estimatedLivingCost - preferences.livingExpensesBudget) / estimatedLivingCost;
      
      // Apply a more severe penalty for extreme living cost mismatches
      if (livingShortfall > 0.7) {
        // If budget is less than 30% of required living costs, apply severe penalty
        score -= 30;
      } else {
        // Otherwise use standard penalty calculation
        score -= Math.round(18 * livingShortfall);
      }
    }

    // ------------------------
    // Scholarship importance
    // ------------------------
    if (preferences.scholarshipNeeds === "Essential - I need financial aid") {
      if (data.scholarships === "available") {
        score += 15; // Reduced from 18
        highlights.push("Scholarship opportunities");
      } else if (data.scholarships === "competitive") {
        score += 10;
        highlights.push("Competitive scholarships");
      } else {
        score -= 20; // Major penalty for essential need not met
      }
    } else if (preferences.scholarshipNeeds === "Important - But not required") {
      if (data.scholarships === "available") {
        score += 10;
        highlights.push("Scholarship options");
      } else if (data.scholarships === "competitive") {
        score += 5;
      } else {
        score -= 8;
      }
    }

    // ------------------------
    // Work during study importance
    // ------------------------
    if (preferences.workPlans === "Yes, part-time work is important") {
      if (data.characteristics.workRights) {
        score += 12;
        highlights.push("Work while studying");
      } else {
        score -= 20; // Major penalty for critical requirement
      }
    } else if (preferences.workPlans === "Maybe, but it's not essential" && data.characteristics.workRights) {
      score += 5;
    }

    // ------------------------
    // Post-graduation plans (critical factor)
    // ------------------------
    if (preferences.postGradPlans === "Work Abroad") {
      // Check both job prospects and residency pathway
      if (data.jobProspects === "excellent") {
        score += 12; // Reduced from 15
        highlights.push("Excellent job market");
      } else if (data.jobProspects === "good") {
        score += 10;
        highlights.push("Good job opportunities");
      } else {
        score -= 8; // Penalty for poor job prospects if work is the goal
      }
      
      if (data.characteristics.pathToResidency) {
        score += 12; // Reduced from 15
        highlights.push("Pathway to immigration");
      } else {
        // Smaller penalty for no residency path to give more weight to other factors
        score -= 12; // Reduced from 15
      }
    } else if (preferences.postGradPlans === "Return Home") {
      // For returning home, give more credit to internationally recognized education
      if (data.jobProspects === "excellent") {
        score += 10; // Increased from 8
        highlights.push("Globally recognized qualifications");
      } else if (data.jobProspects === "good") {
        score += 8;
        highlights.push("Good international reputation");
      }
      
      // Premium countries get a small bonus for global reputation
      if (data.tuition === "high" || data.tuition === "very high") {
        score += 3;
      }
    }

    // ------------------------
    // Language preferences (critical factor)
    // ------------------------
    if (preferences.languagePreference === "English only") {
      if (data.englishPrograms === "all") {
        score += 15;
        highlights.push("All programs in English");
      } else if (data.englishPrograms === "many") {
        score += 8;
        highlights.push("Many English-taught programs");
      } else if (data.englishPrograms === "limited") {
        score -= 15;
      } else {
        score -= 25; // Severe penalty for very limited English options
      }
    } else if (preferences.languagePreference === "Can learn a new language") {
      // Less penalties for language mismatch
      if (data.englishPrograms === "limited" || data.englishPrograms === "very limited") {
        score -= 5;
      }
    }

    // ------------------------
    // Important factors user selected (heavily weighted)
    // ------------------------
    if (preferences.importantFactors.includes("Education Quality") && data.qualityOfLife === "high") {
      score += 12;
      highlights.push("High quality education");
    } else if (preferences.importantFactors.includes("Education Quality") && data.qualityOfLife !== "high") {
      score -= 10; // Penalty for important factor not met
    }
    
    if (preferences.importantFactors.includes("Cost")) {
      if (data.tuition === "low") {
        score += 12; // Reduced from 15
      } else if (data.tuition === "medium") {
        score += 8;
      } else if (data.tuition === "high") {
        score -= 8;
      } else if (data.tuition === "very high") {
        score -= 12; // Reduced from 15
      }
      
      if (data.livingCost === "low") {
        score += 10;
      } else if (data.livingCost === "medium") {
        score += 5;
      } else if (data.livingCost === "high") {
        score -= 5;
      } else if (data.livingCost === "very high") {
        score -= 10;
      }
      
      if (!highlights.includes("Free/low tuition") && !highlights.includes("Affordable education") &&
          (data.tuition === "low" || data.livingCost === "low")) {
        highlights.push("Affordable education");
      }
    }
    
    if (preferences.importantFactors.includes("Job Market")) {
      if (data.characteristics.workRights && (data.jobProspects === "excellent" || data.jobProspects === "good")) {
        score += 15;
        if (!highlights.includes("Work while studying")) {
          highlights.push("Work opportunities");
        }
      } else {
        score -= 15; // Penalty for important factor not met
      }
    }
    
    if (preferences.importantFactors.includes("Visa Process")) {
      if (data.visaEase === "high") {
        score += 10;
        highlights.push("Straightforward visa process");
      } else if (data.visaEase === "low") {
        score -= 10; // Penalty for important factor not met
      }
    }
    
    if (preferences.importantFactors.includes("Safety") && data.qualityOfLife === "high") {
      score += 8;
      highlights.push("Safe environment");
    } else if (preferences.importantFactors.includes("Safety") && data.qualityOfLife !== "high") {
      score -= 8; // Penalty for important factor not met
    }
    
    if (preferences.importantFactors.includes("Lifestyle")) {
      if (data.qualityOfLife === "high") {
        score += 10;
        highlights.push("High quality of life");
      } else if (data.qualityOfLife === "medium") {
        score += 5;
      } else {
        score -= 10; // Penalty for important factor not met
      }
    }

    // ------------------------
    // International community
    // ------------------------
    if (data.characteristics.internationalCommunity) {
      score += 5;
      highlights.push("International environment");
    }

    // ------------------------
    // Create a customized description
    // ------------------------
    // Tuition focus
    if (data.tuition === "low") {
      description = `${country} offers affordable education with ${data.tuition === "low" ? "minimal or no" : "reasonable"} tuition fees. `;
    } else {
      description = `${country} provides high-quality education ${data.scholarships !== "limited" ? "with scholarship opportunities available. " : "options. "}`;
    }
    
    // Language programs
    if (data.englishPrograms === "all") {
      description += "Programs are widely available in English. ";
    } else if (data.englishPrograms === "many") {
      description += "Many programs are taught in English. ";
    } else {
      description += "Some programs are available in English, though language requirements may apply. ";
    }
    
    // Career aspects
    if (preferences.postGradPlans === "Work Abroad") {
      if (data.jobProspects === "excellent") {
        description += "With its strong economy and excellent job market, it's ideal for career-focused students. ";
      } else if (data.jobProspects === "good") {
        description += "The job market offers good opportunities for international graduates. ";
      }
      
      if (data.characteristics.pathToResidency) {
        description += "It also offers pathways to permanent residency for international students.";
      }
    } else {
      description += `It's known for its ${data.qualityOfLife === "high" ? "high" : "good"} quality of life and cultural experiences.`;
    }

    // Ensure we only have unique highlights (max 4)
    const uniqueHighlights = [...new Set(highlights)].slice(0, 4);

    // Normalize scores - ensure they stay within a reasonable range
    // Minimum of 0, maximum of 100
    let normalizedScore = Math.min(100, Math.max(0, score));
    
    // Final total budget affordability check
    const totalUserAnnualBudget = preferences.tuitionBudget + (preferences.livingExpensesBudget * 12);
    const minimumViableBudget = calculateMinimumViableBudget(country, data);
    
    // Add budget warnings to highlights for transparency
    if (totalUserAnnualBudget < minimumViableBudget * 0.5) {
      // Replace one highlight with a budget warning
      if (uniqueHighlights.length > 0) {
        uniqueHighlights.pop(); // Remove one highlight to make room
      }
      uniqueHighlights.unshift("⚠️ Significantly over budget");
    } else if (totalUserAnnualBudget < minimumViableBudget * 0.7) {
      // Replace one highlight with a moderate budget warning
      if (uniqueHighlights.length > 0) {
        uniqueHighlights.pop(); // Remove one highlight to make room
      }
      uniqueHighlights.unshift("⚠️ Above your budget");
    } else if (totalUserAnnualBudget >= minimumViableBudget) {
      // Add a positive budget note
      if (uniqueHighlights.length > 3) {
        uniqueHighlights.pop(); // Remove one highlight to make room
      }
      uniqueHighlights.unshift("✓ Within your budget");
    }
    
    // If total budget is significantly below what's required, apply a severe penalty
    // that overrides other factors - this is a reality check
    if (totalUserAnnualBudget < minimumViableBudget * 0.4) {
      // If the user's budget is less than 40% of what's needed, make this a non-viable option
      normalizedScore = Math.max(0, normalizedScore - 60);
    } else if (totalUserAnnualBudget < minimumViableBudget * 0.7) {
      // If the user's budget is less than 70% of what's needed, apply a heavy penalty
      normalizedScore = Math.max(0, normalizedScore - 40);
    }
    
    return {
      country,
      score: Math.round(normalizedScore),
      highlights: uniqueHighlights,
      description
    };
  });

  // Add a small random factor to prevent exact ties and make results more dynamic
  const randomizedCountries = scoredCountries.map(country => ({
    ...country,
    score: Math.round(Math.min(100, Math.max(0, country.score + (Math.random() * 2 - 1)))) // Add -1 to +1 random adjustment and round to integer
  }));

  console.log("All calculated country scores:", randomizedCountries.map(c => `${c.country}: ${Math.round(c.score)}%`));
  
  // Return ALL countries sorted by score (highest to lowest)
  return randomizedCountries.sort((a, b) => b.score - a.score);
}

// Generate description for a country based on user preferences
export function generateCountryDescription(country: string, preferences: UserPreferences): string {
  const data = countryDatabase[country];
  if (!data) return "";
  
  let description = "";
  
  // Tuition focus
  if (data.tuition === "low") {
    description = `${country} offers affordable education with ${data.tuition === "low" ? "minimal or no" : "reasonable"} tuition fees. `;
  } else {
    description = `${country} provides high-quality education ${data.scholarships !== "limited" ? "with scholarship opportunities available. " : "options. "}`;
  }
  
  // Language programs
  if (data.englishPrograms === "all") {
    description += "Programs are widely available in English. ";
  } else if (data.englishPrograms === "many") {
    description += "Many programs are taught in English. ";
  } else {
    description += "Some programs are available in English, though language requirements may apply. ";
  }
  
  // Career aspects
  if (preferences.postGradPlans === "Work Abroad") {
    if (data.jobProspects === "excellent") {
      description += "With its strong economy and excellent job market, it's ideal for career-focused students. ";
    } else if (data.jobProspects === "good") {
      description += "The job market offers good opportunities for international graduates. ";
    }
    
    if (data.characteristics.pathToResidency) {
      description += "It also offers pathways to permanent residency for international students.";
    }
  } else {
    description += `It's known for its ${data.qualityOfLife === "high" ? "high" : "good"} quality of life and cultural experiences.`;
  }
  
  return description;
} 