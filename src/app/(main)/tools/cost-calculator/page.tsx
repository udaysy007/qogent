"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { 
  getAvailableCities, 
  getAvailableCountries, 
  formatCurrency,
  convertToUSD,
  getCostLevel,
  calculateCosts,
  CityData,
  UserPreferences,
  CostBreakdown
} from "@/lib/cost-calculator-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Building, 
  Navigation, 
  Utensils, 
  Lightbulb, 
  Film, 
  Heart, 
  Package, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Wallet, 
  RotateCcw
} from "lucide-react"

// Define interfaces for components
interface CitySelectionProps {
  city: string;
  setCity: (city: string) => void;
}

interface LifestylePreferencesProps {
  accommodation: number;
  setAccommodation: (accommodation: number) => void;
  food: number;
  setFood: (food: number) => void;
  transportation: number;
  setTransportation: (transportation: number) => void;
  utilities: number;
  setUtilities: (utilities: number) => void;
  entertainment: number;
  setEntertainment: (entertainment: number) => void;
  healthInsurance: number;
  setHealthInsurance: (healthInsurance: number) => void;
  miscellaneous: number;
  setMiscellaneous: (miscellaneous: number) => void;
  selectedCity: string;
}

interface ResultsProps {
  costBreakdown: CostBreakdown | null;
  restartCalculator: () => void;
}

interface PreferenceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  options: {
    value: number;
    label: string;
    description: string;
  }[];
  selected: number;
  onChange: (value: number) => void;
}

// Define steps for the calculator
const STEPS = [
  {
    id: 1,
    title: "City",
    description: "Select your destination"
  },
  {
    id: 2,
    title: "Lifestyle",
    description: "Your preferences"
  },
  {
    id: 3,
    title: "Results",
    description: "Cost breakdown"
  }
];

// City Selection Step Component
function CitySelectionStep({ city, setCity }: CitySelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const cities = getAvailableCities();
  
  // Filter cities based on search query
  const filteredCities = cities.filter(cityName =>
    cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-medium">Select a City</h2>
        <p className="text-sm text-muted-foreground">
          Choose a study destination to calculate your living expenses.
        </p>
      </div>
      
      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a city..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* City grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredCities.length > 0 ? (
          filteredCities.map((cityName) => {
            const costLevel = getCostLevel(cityName);
            return (
              <div 
                key={cityName}
                onClick={() => setCity(cityName)}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${city === cityName ? 'border-primary bg-primary/5' : 'hover:border-primary/30 hover:bg-muted/20'}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{cityName}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className={`text-xs pointer-events-none ${
                        costLevel === 'low' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : costLevel === 'medium' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}>
                        {costLevel.charAt(0).toUpperCase() + costLevel.slice(1)} Cost
                      </Badge>
                    </div>
                  </div>
                  {city === cityName && (
                    <div className="bg-primary text-primary-foreground p-0.5 rounded-full">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-muted-foreground">No cities found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Preference Card Component for Lifestyle options
function PreferenceCard({
  title,
  description,
  icon,
  options,
  selected,
  onChange
}: PreferenceCardProps) {
  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {options.map((option) => (
          <div 
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              cursor-pointer p-3 rounded-md text-sm flex justify-between items-center
              ${selected === option.value ? 'bg-primary/10 border-primary border' : 'bg-card hover:bg-secondary/10 border'}
            `}
          >
            <div>
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
            </div>
            <div className={`
              w-5 h-5 rounded-full border flex items-center justify-center
              ${selected === option.value ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}
            `}>
              {selected === option.value && (
                <Check className="h-3 w-3" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lifestyle Preferences Step Component
function LifestylePreferencesStep({
  accommodation,
  setAccommodation,
  food,
  setFood,
  transportation,
  setTransportation,
  utilities,
  setUtilities,
  entertainment,
  setEntertainment,
  healthInsurance,
  setHealthInsurance,
  miscellaneous,
  setMiscellaneous,
  selectedCity
}: LifestylePreferencesProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-medium">Your Lifestyle in {selectedCity}</h2>
        <p className="text-sm text-muted-foreground">
          Select your preferences for each category to get a personalized cost estimate.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Accommodation */}
        <PreferenceCard
          title="Accommodation"
          description="Monthly rent and housing expenses"
          icon={<Building className="h-5 w-5" />}
          options={[
            { value: 300, label: "Basic", description: "Shared room or dormitory" },
            { value: 500, label: "Standard", description: "Private room in shared apartment" },
            { value: 800, label: "Comfortable", description: "Studio or small apartment" }
          ]}
          selected={accommodation}
          onChange={(value) => setAccommodation(value)}
        />

        {/* Food */}
        <PreferenceCard
          title="Food"
          description="Groceries and eating out"
          icon={<Utensils className="h-5 w-5" />}
          options={[
            { value: 200, label: "Budget", description: "Home cooking, occasional eating out" },
            { value: 300, label: "Standard", description: "Mix of cooking and restaurants" },
            { value: 500, label: "Premium", description: "Regular dining out, quality groceries" }
          ]}
          selected={food}
          onChange={(value) => setFood(value)}
        />

        {/* Transportation */}
        <PreferenceCard
          title="Transportation"
          description="Public transit, taxis, rideshares"
          icon={<Navigation className="h-5 w-5" />}
          options={[
            { value: 50, label: "Minimal", description: "Walking and occasional public transit" },
            { value: 100, label: "Standard", description: "Regular public transportation" },
            { value: 200, label: "Frequent", description: "Mix of public transit and taxis" }
          ]}
          selected={transportation}
          onChange={(value) => setTransportation(value)}
        />

        {/* Utilities */}
        <PreferenceCard
          title="Utilities"
          description="Electricity, water, internet, phone"
          icon={<Lightbulb className="h-5 w-5" />}
          options={[
            { value: 100, label: "Basic", description: "Shared utilities, limited usage" },
            { value: 150, label: "Standard", description: "Average usage and plans" },
            { value: 250, label: "High Usage", description: "Premium plans, higher consumption" }
          ]}
          selected={utilities}
          onChange={(value) => setUtilities(value)}
        />

        {/* Entertainment */}
        <PreferenceCard
          title="Entertainment"
          description="Socializing, streaming services, activities"
          icon={<Film className="h-5 w-5" />}
          options={[
            { value: 80, label: "Minimal", description: "Basic subscriptions, occasional outings" },
            { value: 150, label: "Moderate", description: "Regular social activities and subscriptions" },
            { value: 300, label: "Active", description: "Frequent socializing, events, and premium services" }
          ]}
          selected={entertainment}
          onChange={(value) => setEntertainment(value)}
        />

        {/* Health Insurance */}
        <PreferenceCard
          title="Health Insurance"
          description="Medical coverage and healthcare"
          icon={<Heart className="h-5 w-5" />}
          options={[
            { value: 50, label: "Basic", description: "Minimum required coverage" },
            { value: 100, label: "Standard", description: "Comprehensive student coverage" },
            { value: 200, label: "Premium", description: "Extended coverage with additional benefits" }
          ]}
          selected={healthInsurance}
          onChange={(value) => setHealthInsurance(value)}
        />

        {/* Miscellaneous */}
        <PreferenceCard
          title="Miscellaneous"
          description="Personal items, books, clothing, etc."
          icon={<Package className="h-5 w-5" />}
          options={[
            { value: 50, label: "Minimal", description: "Essential personal items only" },
            { value: 100, label: "Moderate", description: "Regular shopping for personal items" },
            { value: 200, label: "Frequent", description: "Regular shopping and premium items" }
          ]}
          selected={miscellaneous}
          onChange={(value) => setMiscellaneous(value)}
        />
      </div>
    </div>
  );
}

// Results Step Component
function ResultsStep({ costBreakdown, restartCalculator }: ResultsProps) {
  if (!costBreakdown) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Calculating your cost of living...</p>
      </div>
    );
  }

  const { 
    cityName, 
    countryName, 
    totalCost, 
    accommodation, 
    food, 
    transportation, 
    utilities, 
    entertainment, 
    healthInsurance, 
    miscellaneous,
    currency,
    currencySymbol,
    exchangeRate,
    convertedTotalCost
  } = costBreakdown;

  // Calculate percentages for the chart
  const costCategories = [
    { name: "Accommodation", value: accommodation, percentage: Math.round((accommodation / totalCost) * 100) },
    { name: "Food", value: food, percentage: Math.round((food / totalCost) * 100) },
    { name: "Transportation", value: transportation, percentage: Math.round((transportation / totalCost) * 100) },
    { name: "Utilities", value: utilities, percentage: Math.round((utilities / totalCost) * 100) },
    { name: "Entertainment", value: entertainment, percentage: Math.round((entertainment / totalCost) * 100) },
    { name: "Health Insurance", value: healthInsurance, percentage: Math.round((healthInsurance / totalCost) * 100) },
    { name: "Miscellaneous", value: miscellaneous, percentage: Math.round((miscellaneous / totalCost) * 100) }
  ];

  // Assign colors to each category
  const categoryColors = {
    "Accommodation": "#e67e22",
    "Food": "#2a9d8f",
    "Transportation": "#264653",
    "Utilities": "#f4d35e",
    "Entertainment": "#e76f51",
    "Health Insurance": "#212429",
    "Miscellaneous": "#6d6d6d"
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-medium">Monthly Cost Breakdown for {cityName}, {countryName}</h2>
        <p className="text-sm text-muted-foreground">
          Based on your preferences, here's an estimated monthly budget.
        </p>
      </div>

      {/* Total cost card */}
      <Card className="p-5 border bg-primary/5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-medium mb-1">Total Monthly Cost</h3>
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(totalCost, currencySymbol)}
              <span className="text-base font-normal text-muted-foreground ml-2">
                per month
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Approximately {convertToUSD(totalCost, exchangeRate)} USD
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <div className="flex items-center space-x-1">
              <Wallet className="h-5 w-5 text-primary mr-1" />
              <span className="text-sm font-medium">
                Cost Level:
              </span>
              <span className={`text-sm font-medium ${
                convertedTotalCost < 1000 
                  ? "text-green-500" 
                  : convertedTotalCost < 1800 
                    ? "text-amber-500" 
                    : "text-red-500"
              }`}>
                {convertedTotalCost < 1000 
                  ? "Low" 
                  : convertedTotalCost < 1800 
                    ? "Medium" 
                    : "High"}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Cost breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column: categories breakdown */}
        <div>
          <h3 className="text-base font-medium mb-3">Expense Categories</h3>
          <div className="space-y-3">
            {costCategories.map((category) => (
              <div key={category.name} className="bg-card border rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(category.value, currencySymbol)}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${category.percentage}%`,
                      backgroundColor: categoryColors[category.name]
                    }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {category.percentage}% of total
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: comparison and tips */}
        <div>
          <h3 className="text-base font-medium mb-3">Cost Insights</h3>
          <Card className="p-4 border mb-4">
            <h4 className="text-sm font-medium mb-2">How does {cityName} compare?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {cityName} is a {getCostLevel(cityName)} cost city compared to other popular student destinations.
              {getCostLevel(cityName) === "low"
                ? " You can expect your budget to go further here than in many other cities."
                : getCostLevel(cityName) === "medium"
                ? " The living costs are moderate and typical for a city of this size and location."
                : " You should budget more for living expenses compared to many other cities."}
            </p>
            
            <h4 className="text-sm font-medium mt-4 mb-2">Money-Saving Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Look for student discounts on transportation and entertainment</li>
              <li>• Consider cooking at home more frequently to reduce food costs</li>
              <li>• Explore shared accommodation options to lower housing expenses</li>
              <li>• Check if your university offers subsidized health insurance</li>
              <li>• Use budget tracking apps to manage your spending</li>
            </ul>
          </Card>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={restartCalculator} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button asChild className="flex-1">
              <Link href="/contact">
                Get Advice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function CostCalculatorPage() {
  const router = useRouter();
  
  // State for managing steps
  const [currentStep, setCurrentStep] = useState(0);
  
  // State for user preferences
  const [city, setCity] = useState<string>("");
  const [accommodation, setAccommodation] = useState<number>(500);
  const [food, setFood] = useState<number>(300);
  const [transportation, setTransportation] = useState<number>(100);
  const [utilities, setUtilities] = useState<number>(150);
  const [entertainment, setEntertainment] = useState<number>(150);
  const [healthInsurance, setHealthInsurance] = useState<number>(100);
  const [miscellaneous, setMiscellaneous] = useState<number>(100);
  
  // State for results
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);
  
  // Effect to calculate costs when all preferences are set
  useEffect(() => {
    if (currentStep === STEPS.length - 1 && city) {
      const preferences: UserPreferences = {
        city,
        accommodation,
        food,
        transportation,
        utilities,
        entertainment,
        healthInsurance,
        miscellaneous
      };
      
      // Calculate costs
      const costs = calculateCosts(preferences);
      setCostBreakdown(costs);
    }
  }, [currentStep, city, accommodation, food, transportation, utilities, entertainment, healthInsurance, miscellaneous]);
  
  // Function to go to next step
  const onNext = () => {
    setCurrentStep((value) => value + 1);
  };
  
  // Function to go back
  const onBack = () => {
    setCurrentStep((value) => value - 1);
  };
  
  // Function to start over
  const restartCalculator = () => {
    setCurrentStep(0);
    setCity("");
    setAccommodation(500);
    setFood(300);
    setTransportation(100);
    setUtilities(150);
    setEntertainment(150);
    setHealthInsurance(100);
    setMiscellaneous(100);
    setCostBreakdown(null);
  };
  
  // Determine if we can move to the next step
  const actionLabel = currentStep === STEPS.length - 1
    ? 'Finish'
    : 'Next';
  
  const secondaryActionLabel = currentStep === 0
    ? undefined
    : 'Back';
  
  // Determine if the "Next" button should be disabled
  const isNextDisabled = currentStep === 0 && !city;
  
  // Render content based on step
  let bodyContent = (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
  
  // Step 1: City Selection
  if (currentStep === 0) {
    bodyContent = (
      <CitySelectionStep
        city={city}
        setCity={setCity}
      />
    );
  }
  
  // Step 2: Lifestyle Preferences
  if (currentStep === 1) {
    bodyContent = (
      <LifestylePreferencesStep
        accommodation={accommodation}
        setAccommodation={setAccommodation}
        food={food}
        setFood={setFood}
        transportation={transportation}
        setTransportation={setTransportation}
        utilities={utilities}
        setUtilities={setUtilities}
        entertainment={entertainment}
        setEntertainment={setEntertainment}
        healthInsurance={healthInsurance}
        setHealthInsurance={setHealthInsurance}
        miscellaneous={miscellaneous}
        setMiscellaneous={setMiscellaneous}
        selectedCity={city}
      />
    );
  }
  
  // Step 3: Results
  if (currentStep === 2) {
    bodyContent = (
      <ResultsStep
        costBreakdown={costBreakdown}
        restartCalculator={restartCalculator}
      />
    );
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cost of Living Calculator for Students</h1>
        <p className="text-muted-foreground mt-1">
          Plan your budget by estimating living expenses in your chosen study destination.
        </p>
      </div>
      
      {/* Progress steps */}
      <div className="w-full mb-8 flex justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${currentStep === index 
                ? 'bg-primary text-primary-foreground' 
                : currentStep > index 
                  ? 'bg-primary/20 text-primary border-primary' 
                  : 'bg-muted text-muted-foreground'}
            `}>
              {currentStep > index ? (
                <Check className="h-5 w-5" />
              ) : (
                index === 0 ? <Building className="h-5 w-5" /> :
                index === 1 ? <Wallet className="h-5 w-5" /> :
                <Package className="h-5 w-5" />
              )}
            </div>
            <div className="text-xs font-medium mt-2">{step.title}</div>
            {index < STEPS.length - 1 && (
              <div className={`
                hidden sm:block h-[2px] w-full mt-4 -mr-2
                ${currentStep > index ? 'bg-primary' : 'bg-muted'}
              `}></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <Card className="border p-6 mb-6">
        {bodyContent}
      </Card>
      
      {/* Navigation */}
      {currentStep !== STEPS.length - 1 && (
        <div className="flex flex-row items-center gap-4 mt-6">
          {secondaryActionLabel && (
            <Button
              variant="outline"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className="ml-auto"
          >
            {actionLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 