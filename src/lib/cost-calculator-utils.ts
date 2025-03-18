// Types for the cost calculator
export interface CityData {
  country: string;
  accommodationCost: {
    university: number;
    shared: number;
    private: number;
  };
  foodCost: {
    basic: number;
    moderate: number;
    premium: number;
  };
  transportationCost: {
    public: number;
    mixed: number;
    private: number;
  };
  utilitiesCost: {
    basic: number;
    moderate: number;
    premium: number;
  };
  entertainmentCost: {
    basic: number;
    moderate: number;
    premium: number;
  };
  healthInsuranceCost: {
    basic: number;
    comprehensive: number;
  };
  miscellaneousCost: {
    low: number;
    medium: number;
    high: number;
  };
  currency: string;
  currencySymbol: string;
  exchangeRate: number; // to USD
}

export interface UserPreferences {
  city: string;
  accommodation: number;
  food: number;
  transportation: number;
  utilities: number;
  entertainment: number;
  healthInsurance: number;
  miscellaneous: number;
}

export interface CostBreakdown {
  cityName: string;
  countryName: string;
  totalCost: number;
  accommodation: number;
  food: number;
  transportation: number;
  utilities: number;
  entertainment: number;
  healthInsurance: number;
  miscellaneous: number;
  currency: string;
  currencySymbol: string;
  exchangeRate: number;
  convertedTotalCost: number;
}

// Database of cities and their costs
export const cityDatabase: Record<string, CityData> = {
  "London": {
    country: "UK",
    accommodationCost: {
      university: 700,
      shared: 900,
      private: 1600,
    },
    foodCost: {
      basic: 250,
      moderate: 400,
      premium: 650,
    },
    transportationCost: {
      public: 90,
      mixed: 160,
      private: 350,
    },
    utilitiesCost: {
      basic: 180,
      moderate: 240,
      premium: 320,
    },
    entertainmentCost: {
      basic: 100,
      moderate: 200,
      premium: 400,
    },
    healthInsuranceCost: {
      basic: 30,
      comprehensive: 80,
    },
    miscellaneousCost: {
      low: 100,
      medium: 200,
      high: 350,
    },
    currency: "GBP",
    currencySymbol: "£",
    exchangeRate: 1.26
  },
  "Berlin": {
    country: "Germany",
    accommodationCost: {
      university: 350,
      shared: 500,
      private: 1000,
    },
    foodCost: {
      basic: 200,
      moderate: 350,
      premium: 500,
    },
    transportationCost: {
      public: 70,
      mixed: 140,
      private: 280,
    },
    utilitiesCost: {
      basic: 150,
      moderate: 220,
      premium: 300,
    },
    entertainmentCost: {
      basic: 80,
      moderate: 180,
      premium: 350,
    },
    healthInsuranceCost: {
      basic: 110,
      comprehensive: 180,
    },
    miscellaneousCost: {
      low: 80,
      medium: 160,
      high: 300,
    },
    currency: "EUR",
    currencySymbol: "€",
    exchangeRate: 1.08
  },
  "Paris": {
    country: "France",
    accommodationCost: {
      university: 400,
      shared: 650,
      private: 1300,
    },
    foodCost: {
      basic: 220,
      moderate: 380,
      premium: 600,
    },
    transportationCost: {
      public: 75,
      mixed: 150,
      private: 300,
    },
    utilitiesCost: {
      basic: 140,
      moderate: 200,
      premium: 280,
    },
    entertainmentCost: {
      basic: 90,
      moderate: 200,
      premium: 400,
    },
    healthInsuranceCost: {
      basic: 60,
      comprehensive: 150,
    },
    miscellaneousCost: {
      low: 100,
      medium: 180,
      high: 340,
    },
    currency: "EUR",
    currencySymbol: "€",
    exchangeRate: 1.08
  },
  "Toronto": {
    country: "Canada",
    accommodationCost: {
      university: 800,
      shared: 950,
      private: 1800,
    },
    foodCost: {
      basic: 300,
      moderate: 450,
      premium: 600,
    },
    transportationCost: {
      public: 120,
      mixed: 200,
      private: 400,
    },
    utilitiesCost: {
      basic: 150,
      moderate: 220,
      premium: 300,
    },
    entertainmentCost: {
      basic: 100,
      moderate: 180,
      premium: 350,
    },
    healthInsuranceCost: {
      basic: 50,
      comprehensive: 100,
    },
    miscellaneousCost: {
      low: 100,
      medium: 180,
      high: 300,
    },
    currency: "CAD",
    currencySymbol: "$",
    exchangeRate: 0.74
  },
  "New York": {
    country: "USA",
    accommodationCost: {
      university: 1200,
      shared: 1500,
      private: 2500,
    },
    foodCost: {
      basic: 350,
      moderate: 550,
      premium: 800,
    },
    transportationCost: {
      public: 130,
      mixed: 250,
      private: 500,
    },
    utilitiesCost: {
      basic: 180,
      moderate: 250,
      premium: 350,
    },
    entertainmentCost: {
      basic: 150,
      moderate: 300,
      premium: 600,
    },
    healthInsuranceCost: {
      basic: 150,
      comprehensive: 300,
    },
    miscellaneousCost: {
      low: 150,
      medium: 300,
      high: 500,
    },
    currency: "USD",
    currencySymbol: "$",
    exchangeRate: 1.0
  },
  "Sydney": {
    country: "Australia",
    accommodationCost: {
      university: 800,
      shared: 1000,
      private: 1800,
    },
    foodCost: {
      basic: 300,
      moderate: 450,
      premium: 650,
    },
    transportationCost: {
      public: 120,
      mixed: 220,
      private: 450,
    },
    utilitiesCost: {
      basic: 160,
      moderate: 230,
      premium: 320,
    },
    entertainmentCost: {
      basic: 120,
      moderate: 220,
      premium: 400,
    },
    healthInsuranceCost: {
      basic: 80,
      comprehensive: 150,
    },
    miscellaneousCost: {
      low: 120,
      medium: 220,
      high: 380,
    },
    currency: "AUD",
    currencySymbol: "$",
    exchangeRate: 0.66
  },
  "Tokyo": {
    country: "Japan",
    accommodationCost: {
      university: 600,
      shared: 800,
      private: 1500,
    },
    foodCost: {
      basic: 280,
      moderate: 450,
      premium: 700,
    },
    transportationCost: {
      public: 100,
      mixed: 180,
      private: 400,
    },
    utilitiesCost: {
      basic: 140,
      moderate: 200,
      premium: 280,
    },
    entertainmentCost: {
      basic: 110,
      moderate: 220,
      premium: 450,
    },
    healthInsuranceCost: {
      basic: 40,
      comprehensive: 100,
    },
    miscellaneousCost: {
      low: 100,
      medium: 180,
      high: 350,
    },
    currency: "JPY",
    currencySymbol: "¥",
    exchangeRate: 0.0068 // 1 JPY = 0.0068 USD
  },
  "Singapore": {
    country: "Singapore",
    accommodationCost: {
      university: 500,
      shared: 800,
      private: 1700,
    },
    foodCost: {
      basic: 300,
      moderate: 450,
      premium: 700,
    },
    transportationCost: {
      public: 100,
      mixed: 180,
      private: 700,
    },
    utilitiesCost: {
      basic: 150,
      moderate: 220,
      premium: 300,
    },
    entertainmentCost: {
      basic: 120,
      moderate: 250,
      premium: 500,
    },
    healthInsuranceCost: {
      basic: 70,
      comprehensive: 180,
    },
    miscellaneousCost: {
      low: 120,
      medium: 220,
      high: 400,
    },
    currency: "SGD",
    currencySymbol: "$",
    exchangeRate: 0.75
  },
  "Amsterdam": {
    country: "Netherlands",
    accommodationCost: {
      university: 450,
      shared: 650,
      private: 1200,
    },
    foodCost: {
      basic: 240,
      moderate: 380,
      premium: 550,
    },
    transportationCost: {
      public: 80,
      mixed: 160,
      private: 300,
    },
    utilitiesCost: {
      basic: 160,
      moderate: 220,
      premium: 300,
    },
    entertainmentCost: {
      basic: 90,
      moderate: 180,
      premium: 350,
    },
    healthInsuranceCost: {
      basic: 100,
      comprehensive: 180,
    },
    miscellaneousCost: {
      low: 90,
      medium: 170,
      high: 320,
    },
    currency: "EUR",
    currencySymbol: "€",
    exchangeRate: 1.08
  },
  "Dublin": {
    country: "Ireland",
    accommodationCost: {
      university: 650,
      shared: 800,
      private: 1400,
    },
    foodCost: {
      basic: 250,
      moderate: 400,
      premium: 600,
    },
    transportationCost: {
      public: 80,
      mixed: 150,
      private: 280,
    },
    utilitiesCost: {
      basic: 160,
      moderate: 220,
      premium: 300,
    },
    entertainmentCost: {
      basic: 100,
      moderate: 200,
      premium: 380,
    },
    healthInsuranceCost: {
      basic: 40,
      comprehensive: 100,
    },
    miscellaneousCost: {
      low: 100,
      medium: 200,
      high: 350,
    },
    currency: "EUR",
    currencySymbol: "€",
    exchangeRate: 1.08
  },
  "Warsaw": {
    country: "Poland",
    accommodationCost: {
      university: 250,
      shared: 350,
      private: 650,
    },
    foodCost: {
      basic: 150,
      moderate: 250,
      premium: 400,
    },
    transportationCost: {
      public: 30,
      mixed: 80,
      private: 220,
    },
    utilitiesCost: {
      basic: 100,
      moderate: 150,
      premium: 220,
    },
    entertainmentCost: {
      basic: 60,
      moderate: 120,
      premium: 250,
    },
    healthInsuranceCost: {
      basic: 20,
      comprehensive: 70,
    },
    miscellaneousCost: {
      low: 50,
      medium: 100,
      high: 200,
    },
    currency: "PLN",
    currencySymbol: "zł",
    exchangeRate: 0.25
  }
};

// Calculate costs based on user preferences
export function calculateCosts(preferences: UserPreferences): CostBreakdown {
  const cityData = cityDatabase[preferences.city];

  if (!cityData) {
    throw new Error(`City ${preferences.city} not found in database`);
  }

  // Direct costs from user preferences
  const accommodation = preferences.accommodation;
  const food = preferences.food;
  const transportation = preferences.transportation;
  const utilities = preferences.utilities;
  const entertainment = preferences.entertainment;
  const healthInsurance = preferences.healthInsurance;
  const miscellaneous = preferences.miscellaneous;

  // Calculate total cost
  const totalCost = accommodation + food + transportation + utilities + entertainment + healthInsurance + miscellaneous;

  // Convert to USD for comparison
  const convertedTotalCost = totalCost * cityData.exchangeRate;

  return {
    cityName: preferences.city,
    countryName: cityData.country,
    totalCost,
    accommodation,
    food,
    transportation,
    utilities,
    entertainment,
    healthInsurance,
    miscellaneous,
    currency: cityData.currency,
    currencySymbol: cityData.currencySymbol,
    exchangeRate: cityData.exchangeRate,
    convertedTotalCost
  };
}

// Get list of all available cities
export function getAvailableCities(): string[] {
  return Object.keys(cityDatabase);
}

// Get list of all available countries
export function getAvailableCountries(): string[] {
  const countries = new Set<string>();
  Object.values(cityDatabase).forEach((city) => {
    countries.add(city.country);
  });
  return Array.from(countries);
}

// Format currency for display
export function formatCurrency(amount: number, currencySymbol: string): string {
  return `${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Calculate the converted amount in USD
export function convertToUSD(amount: number, exchangeRate: number): string {
  const convertedAmount = amount * exchangeRate;
  return `$${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Calculate the cost level for a city (low, medium, high)
export function getCostLevel(city: string): "low" | "medium" | "high" {
  const cityData = cityDatabase[city];
  if (!cityData) return "medium";
  
  // Base on typical shared accommodation + moderate food + public transport
  const baselineCost = 
    cityData.accommodationCost.shared + 
    cityData.foodCost.moderate + 
    cityData.transportationCost.public;
  
  const convertedCost = baselineCost * cityData.exchangeRate; // convert to USD for comparison
  
  if (convertedCost < 1000) return "low";
  if (convertedCost < 1800) return "medium";
  return "high";
} 