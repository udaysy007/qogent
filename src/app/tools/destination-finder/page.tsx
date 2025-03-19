"use client"

import { useState, useEffect, ReactNode } from "react"
import { Compass, ArrowRight, Info, Check, RotateCcw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { 
  scoreCountries, 
  UserPreferences, 
  CountryRecommendation 
} from "@/lib/destination-finder-utils"

// Define interfaces for the components
interface SelectionCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
  multiSelect?: boolean;
}

interface AcademicProfileProps {
  studyLevel: string;
  setStudyLevel: (level: string) => void;
  fieldOfStudy: string;
  setFieldOfStudy: (field: string) => void;
  academicPerformance: string;
  setAcademicPerformance: (performance: string) => void;
  postGradPlans: string;
  setPostGradPlans: (plans: string) => void;
}

interface BudgetProps {
  tuitionBudget: number;
  setTuitionBudget: (budget: number) => void;
  livingExpensesBudget: number;
  setLivingExpensesBudget: (budget: number) => void;
  scholarshipNeeds: string;
  setScholarshipNeeds: (needs: string) => void;
  workPlans: string;
  setWorkPlans: (plans: string) => void;
}

interface PreferencesProps {
  preferredRegions: string[];
  toggleRegion: (region: string) => void;
  languagePreference: string;
  setLanguagePreference: (preference: string) => void;
  locationType: string;
  setLocationType: (type: string) => void;
  importantFactors: string[];
  toggleFactor: (factor: string) => void;
}

interface ResultsProps {
  restartTool: () => void;
  recommendations: CountryRecommendation[];
}

// Steps in the tool
const STEPS = [
  { id: 1, title: "Profile", description: "Academic & career" },
  { id: 2, title: "Budget", description: "Financial" },
  { id: 3, title: "Preferences", description: "Location & lifestyle" },
  { id: 4, title: "Results", description: "Recommendations" }
]

// Define a new type for country accent colors
type CountryAccent = {
  color: string;
  bgColor: string;
};

// Add subtle accent colors for countries
const countryAccents: Record<string, CountryAccent> = {
  "Germany": { color: "text-blue-600", bgColor: "bg-blue-50" },
  "Canada": { color: "text-red-600", bgColor: "bg-red-50" },
  "Australia": { color: "text-emerald-600", bgColor: "bg-emerald-50" },
  "USA": { color: "text-blue-600", bgColor: "bg-blue-50" },
  "UK": { color: "text-indigo-600", bgColor: "bg-indigo-50" },
  "Ireland": { color: "text-green-600", bgColor: "bg-green-50" },
  "Netherlands": { color: "text-orange-600", bgColor: "bg-orange-50" },
  "Japan": { color: "text-rose-600", bgColor: "bg-rose-50" },
  "France": { color: "text-blue-600", bgColor: "bg-blue-50" },
  "Singapore": { color: "text-red-600", bgColor: "bg-red-50" },
  "Poland": { color: "text-red-600", bgColor: "bg-red-50" },
  "New Zealand": { color: "text-emerald-600", bgColor: "bg-emerald-50" },
  // Default color for other countries
  "default": { color: "text-primary", bgColor: "bg-primary/5" }
};

// Get accent for a country, fallback to default if not found
const getCountryAccent = (country: string): CountryAccent => {
  return countryAccents[country] || countryAccents.default;
};

// Score category colors - more subtle
const getScoreColor = (score: number): string => {
  if (score >= 85) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 55) return "text-violet-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
};

// Score background colors - very light
const getScoreBgColor = (score: number): string => {
  if (score >= 85) return "bg-emerald-50";
  if (score >= 70) return "bg-blue-50";
  if (score >= 55) return "bg-violet-50";
  if (score >= 40) return "bg-amber-50";
  return "bg-red-50";
};

// Map country scores to descriptive texts
const getScoreLabel = (score: number): string => {
  if (score >= 85) return "Excellent Match";
  if (score >= 70) return "Great Match";
  if (score >= 55) return "Good Match";
  if (score >= 40) return "Fair Match";
  return "Lower Match";
};

export default function DestinationFinderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  // Academic profile state
  const [studyLevel, setStudyLevel] = useState("Master's Degree")
  const [fieldOfStudy, setFieldOfStudy] = useState("Computer Science")
  const [academicPerformance, setAcademicPerformance] = useState("Very Good")
  const [postGradPlans, setPostGradPlans] = useState("Work in the country where I study")
  
  // Budget state
  const [tuitionBudget, setTuitionBudget] = useState(5000)
  const [livingExpensesBudget, setLivingExpensesBudget] = useState(1200)
  const [scholarshipNeeds, setScholarshipNeeds] = useState("Important - But not required")
  const [workPlans, setWorkPlans] = useState("Yes, part-time work is important")
  
  // Preferences state
  const [preferredRegions, setPreferredRegions] = useState<string[]>(["Europe", "North America"])
  const [languagePreference, setLanguagePreference] = useState("English only")
  const [locationType, setLocationType] = useState("Major city")
  const [importantFactors, setImportantFactors] = useState<string[]>(["High quality education", "Work opportunities"])
  
  // Recommendations
  const [recommendations, setRecommendations] = useState<CountryRecommendation[]>([])
  
  // Use effect to calculate recommendations when reaching results step
  useEffect(() => {
    if (currentStep === 4) {
      const userPreferences: UserPreferences = {
        studyLevel,
        fieldOfStudy,
        academicPerformance,
        postGradPlans,
        tuitionBudget,
        livingExpensesBudget,
        scholarshipNeeds,
        workPlans,
        preferredRegions,
        languagePreference,
        locationType,
        importantFactors
      };
      
      try {
        console.log("Calculating recommendations with preferences:", userPreferences);
        const results = scoreCountries(userPreferences);
        console.log("Calculated recommendations:", results);
        setRecommendations(results);
      } catch (error) {
        console.error("Error calculating recommendations:", error);
      }
    }
  }, [currentStep, studyLevel, fieldOfStudy, academicPerformance, postGradPlans, 
      tuitionBudget, livingExpensesBudget, scholarshipNeeds, workPlans, 
      preferredRegions, languagePreference, locationType, importantFactors]);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      // Just increment the step counter - the useEffect will handle generating recommendations
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const restartTool = () => {
    setCurrentStep(1)
    setShowResults(false)
  }

  const toggleRegion = (region: string) => {
    if (preferredRegions.includes(region)) {
      setPreferredRegions(preferredRegions.filter(r => r !== region))
    } else {
      setPreferredRegions([...preferredRegions, region])
    }
  }

  const toggleFactor = (factor: string) => {
    if (importantFactors.includes(factor)) {
      setImportantFactors(importantFactors.filter(f => f !== factor))
    } else {
      setImportantFactors([...importantFactors, factor])
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHeader
        title="Destination Finder"
        description="Find the perfect country for your international education journey based on your profile, budget, and preferences."
      />

      {/* Main Content */}
      <section className="py-4 md:py-8">
        <div className="container px-4 md:px-6 max-w-3xl">
          <Card className="p-0 overflow-hidden border shadow-sm">
            {/* Steps Progress */}
            <div className="bg-muted/30 p-3 border-b">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">
                  Step {currentStep} of {STEPS.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {STEPS[currentStep - 1].title}
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              
              <div className="grid grid-cols-4 gap-1 mt-3">
                {STEPS.map((step) => (
                  <div 
                    key={step.id} 
                    className={`flex flex-col items-center text-center p-1 rounded-md ${
                      step.id === currentStep 
                        ? "bg-primary/5 text-primary" 
                        : step.id < currentStep 
                          ? "text-muted-foreground" 
                          : "text-muted-foreground/50"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full mb-1 ${
                      step.id === currentStep 
                        ? "bg-primary text-primary-foreground" 
                        : step.id < currentStep 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {step.id < currentStep ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <span className="text-xs">{step.id}</span>
                      )}
                    </div>
                    <div className="text-xs font-medium">{step.title}</div>
                    <div className="text-xs hidden md:block">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="p-4 md:p-6">
              {currentStep === 1 && 
                <AcademicProfileStep 
                  studyLevel={studyLevel} 
                  setStudyLevel={setStudyLevel}
                  fieldOfStudy={fieldOfStudy}
                  setFieldOfStudy={setFieldOfStudy}
                  academicPerformance={academicPerformance}
                  setAcademicPerformance={setAcademicPerformance}
                  postGradPlans={postGradPlans}
                  setPostGradPlans={setPostGradPlans}
                />
              }
              {currentStep === 2 && 
                <BudgetStep 
                  tuitionBudget={tuitionBudget}
                  setTuitionBudget={setTuitionBudget}
                  livingExpensesBudget={livingExpensesBudget}
                  setLivingExpensesBudget={setLivingExpensesBudget}
                  scholarshipNeeds={scholarshipNeeds}
                  setScholarshipNeeds={setScholarshipNeeds}
                  workPlans={workPlans}
                  setWorkPlans={setWorkPlans}
                />
              }
              {currentStep === 3 && 
                <PreferencesStep 
                  preferredRegions={preferredRegions}
                  toggleRegion={toggleRegion}
                  languagePreference={languagePreference}
                  setLanguagePreference={setLanguagePreference}
                  locationType={locationType}
                  setLocationType={setLocationType}
                  importantFactors={importantFactors}
                  toggleFactor={toggleFactor}
                />
              }
              {currentStep === 4 && 
                <ResultsStep 
                  restartTool={restartTool}
                  recommendations={recommendations}
                />
              }
            </div>

            {/* Step Navigation */}
            {currentStep < STEPS.length && (
              <div className="border-t p-3 flex justify-between items-center bg-muted/10">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  size="sm"
                >
                  Back
                </Button>
                <div className="text-xs text-muted-foreground">
                  Step {currentStep} of {STEPS.length}
                </div>
                <Button 
                  onClick={nextStep}
                  size="sm"
                >
                  {currentStep === STEPS.length - 1 ? 'View Results' : 'Continue'}
                </Button>
              </div>
            )}
            
            {/* Results Navigation */}
            {currentStep === STEPS.length && (
              <div className="border-t p-3 flex justify-between items-center bg-muted/10">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  size="sm"
                >
                  Back
                </Button>
                <div className="text-xs text-muted-foreground">
                  Step {currentStep} of {STEPS.length}
                </div>
                <Button 
                  onClick={restartTool}
                  size="sm"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Start Over
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-4 md:py-6 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-primary" />
            <h2 className="text-base font-medium">Tips for Choosing a Study Destination</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Card className="p-3 bg-card">
              <h3 className="font-medium mb-1 text-xs">Consider More Than Rankings</h3>
              <p className="text-xs text-muted-foreground">
                While university rankings are important, also consider factors like teaching quality, program-specific strengths, and job placement rates.
              </p>
            </Card>
            <Card className="p-3 bg-card">
              <h3 className="font-medium mb-1 text-xs">Research Living Costs</h3>
              <p className="text-xs text-muted-foreground">
                Tuition is just one part of your budget. Consider housing, food, transportation, and healthcare costs in your destination.
              </p>
            </Card>
            <Card className="p-3 bg-card">
              <h3 className="font-medium mb-1 text-xs">Explore Career Opportunities</h3>
              <p className="text-xs text-muted-foreground">
                Research post-study work rights and job prospects for international students in your field.
              </p>
            </Card>
            <Card className="p-3 bg-card">
              <h3 className="font-medium mb-1 text-xs">Check Visa Requirements</h3>
              <p className="text-xs text-muted-foreground">
                Some countries have more straightforward visa processes for international students than others.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

// Step 1: Academic Profile
function AcademicProfileStep({ 
  studyLevel, 
  setStudyLevel,
  fieldOfStudy, 
  setFieldOfStudy,
  academicPerformance, 
  setAcademicPerformance,
  postGradPlans, 
  setPostGradPlans
}: AcademicProfileProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Your Academic Profile</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about your academic background and career goals.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">What level of study are you interested in?</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {["Bachelor's Degree", "Master's Degree", "PhD / Doctorate"].map((level) => (
              <SelectionCard 
                key={level} 
                title={level} 
                selected={level === studyLevel}
                onClick={() => setStudyLevel(level)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your field of study</label>
          <Tabs defaultValue="popular">
            <TabsList className="bg-muted/50 w-full justify-start mb-2">
              <TabsTrigger value="popular">Popular Fields</TabsTrigger>
              <TabsTrigger value="all">All Fields</TabsTrigger>
            </TabsList>
            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Computer Science", 
                  "Business & Management", 
                  "Engineering",
                  "Medicine & Health",
                  "Social Sciences",
                  "Arts & Humanities"
                ].map((field) => (
                  <SelectionCard 
                    key={field} 
                    title={field} 
                    selected={field === fieldOfStudy}
                    onClick={() => setFieldOfStudy(field)}
                    compact
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              <div className="text-center py-4 text-sm text-muted-foreground">
                20+ additional fields available
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your current academic performance</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["Average", "Good", "Very Good", "Excellent"].map((performance, index) => (
              <SelectionCard 
                key={performance} 
                title={performance} 
                selected={performance === academicPerformance}
                onClick={() => setAcademicPerformance(performance)}
                subtitle={`${70 + index * 10}%+`}
                compact
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Post-graduation plans</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Work in the country where I study", 
              "Return to my home country",
              "Continue to higher education",
              "Undecided"
            ].map((plan) => (
              <SelectionCard 
                key={plan} 
                title={plan} 
                selected={plan === postGradPlans}
                onClick={() => setPostGradPlans(plan)}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 2: Budget
function BudgetStep({ 
  tuitionBudget,
  setTuitionBudget,
  livingExpensesBudget,
  setLivingExpensesBudget,
  scholarshipNeeds,
  setScholarshipNeeds,
  workPlans,
  setWorkPlans
}: BudgetProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Your Budget</h2>
        <p className="text-sm text-muted-foreground">
          Let us know about your financial considerations for studying abroad.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">What is your budget for tuition fees per year?</label>
          <div className="py-4 px-3">
            <div className="mb-6">
              <Slider
                value={[tuitionBudget]}
                onValueChange={(value) => setTuitionBudget(value[0])}
                min={500}
                max={50000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>$500</span>
                <span>$10k</span>
                <span>$20k</span>
                <span>$30k</span>
                <span>$40k</span>
                <span>$50k+</span>
              </div>
            </div>
            
            <div className="bg-muted/20 p-3 rounded-lg border text-center">
              <div className="text-xl font-bold text-primary mb-1">${tuitionBudget.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">per year</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Living expenses budget per month</label>
          <div className="py-4 px-3">
            <div className="mb-6">
              <Slider
                value={[livingExpensesBudget]}
                onValueChange={(value) => setLivingExpensesBudget(value[0])}
                min={800}
                max={3000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>$800</span>
                <span>$1.2k</span>
                <span>$1.8k</span>
                <span>$2.2k</span>
                <span>$2.5k</span>
                <span>$3k+</span>
              </div>
            </div>
            
            <div className="bg-muted/20 p-3 rounded-lg border text-center">
              <div className="text-xl font-bold text-primary mb-1">${livingExpensesBudget.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Are you interested in scholarships?</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              "Essential - I need financial aid", 
              "Important - But not required", 
              "Not a priority"
            ].map((option) => (
              <SelectionCard 
                key={option} 
                title={option} 
                selected={option === scholarshipNeeds}
                onClick={() => setScholarshipNeeds(option)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Are you planning to work while studying?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Yes, part-time work is important", 
              "Maybe, but it's not essential",
              "No, I plan to focus on studies only"
            ].map((option) => (
              <SelectionCard 
                key={option} 
                title={option} 
                selected={option === workPlans}
                onClick={() => setWorkPlans(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 3: Preferences
function PreferencesStep({ 
  preferredRegions,
  toggleRegion,
  languagePreference,
  setLanguagePreference,
  locationType,
  setLocationType,
  importantFactors,
  toggleFactor
}: PreferencesProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Your Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about your location and lifestyle preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred regions</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Europe", 
              "North America", 
              "Asia",
              "Australia & New Zealand",
              "Middle East",
              "No preference"
            ].map((region) => (
              <SelectionCard 
                key={region} 
                title={region} 
                selected={preferredRegions.includes(region)}
                onClick={() => toggleRegion(region)}
                compact
                multiSelect
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Language preference</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              "English only", 
              "Can learn a new language",
              "Already speak multiple languages"
            ].map((option) => (
              <SelectionCard 
                key={option} 
                title={option} 
                selected={option === languagePreference}
                onClick={() => setLanguagePreference(option)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "Major city", 
              "Medium-sized city", 
              "Small town",
              "No preference"
            ].map((location) => (
              <SelectionCard 
                key={location} 
                title={location} 
                selected={location === locationType}
                onClick={() => setLocationType(location)}
                compact
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Important factors (select multiple)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "High quality education", 
              "Affordability",
              "Work opportunities",
              "Ease of visa process",
              "Safety",
              "Quality of life"
            ].map((factor) => (
              <SelectionCard 
                key={factor} 
                title={factor} 
                selected={importantFactors.includes(factor)}
                onClick={() => toggleFactor(factor)}
                compact
                multiSelect
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4: Results
function ResultsStep({ 
  restartTool,
  recommendations
}: ResultsProps) {
  // Add debugging log for recommendations
  console.log("Rendering ResultsStep with recommendations:", recommendations);
  
  // Make sure we have recommendations to display
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="space-y-4">
        <div className="p-12 text-center">
          <h2 className="text-lg font-semibold mb-4">Loading recommendations...</h2>
          <p className="text-muted-foreground">
            We're calculating the best destinations for you based on your preferences.
          </p>
          <div className="flex justify-center mt-6">
            <div className="animate-pulse-subtle h-12 w-12 rounded-full bg-primary/20"></div>
          </div>
        </div>
      </div>
    );
  }

  // Split recommendations into top and remaining countries
  const topCountries = recommendations.slice(0, 3);
  const remainingCountries = recommendations.slice(3);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Recommended Destinations</h2>
        <p className="text-sm text-muted-foreground">
          Based on your profile, budget, and preferences, here are your top matches.
        </p>
      </div>

      {/* Top 3 country recommendations with detailed cards */}
      <div className="space-y-5">
        {topCountries.map((rec, index) => {
          const accent = getCountryAccent(rec.country);
          const scoreColor = getScoreColor(rec.score);
          const scoreBgColor = getScoreBgColor(rec.score);
          const scoreLabel = getScoreLabel(rec.score);
          
          return (
            <div 
              key={rec.country} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all" 
            >
              <div className="md:flex">
                <div className={`md:w-1/5 ${accent.bgColor} p-4 flex flex-col items-center justify-center text-center`}>
                  <div className="text-lg font-semibold mb-1">{index + 1}</div>
                  <div className={`text-base font-medium mb-2 ${accent.color}`}>{rec.country}</div>
                  <div className="mt-1">
                    <div className="relative h-16 w-16">
                      <div className={`absolute inset-0 flex items-center justify-center`}>
                        <div className={`text-sm font-bold ${scoreColor}`}>{rec.score}%</div>
                      </div>
                      <svg viewBox="0 0 36 36" className={`h-16 w-16 rotate-[-90deg]`}>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted" />
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          strokeDasharray={`${rec.score} 100`}
                          className={scoreColor}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={`text-xs font-medium mt-1 ${scoreColor}`}>
                    {scoreLabel}
                  </div>
                </div>
                <div className="p-4 md:w-4/5">
                  <div className="mb-3">
                    <h3 className="text-base font-medium mb-1">Why {rec.country} is a good match:</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.highlights.map((highlight) => (
                        <div key={highlight} className={`${scoreBgColor} ${scoreColor} text-xs py-0.5 px-2 rounded-full`}>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button size="sm" asChild>
                      <Link 
                        href={`/destinations/${rec.country.toLowerCase()}`}
                        className="flex items-center"
                      >
                        Explore {rec.country}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* All other countries in a more compact format */}
      {remainingCountries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-medium mb-3">Other Countries to Consider</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {remainingCountries.map((rec) => {
              const accent = getCountryAccent(rec.country);
              const scoreColor = getScoreColor(rec.score);
              const scoreBgColor = getScoreBgColor(rec.score);
              
              return (
                <div 
                  key={rec.country} 
                  className="border rounded-lg p-3 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 mr-2 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`text-xs font-bold ${scoreColor}`}>{rec.score}%</div>
                        </div>
                        <svg viewBox="0 0 36 36" className={`h-10 w-10 rotate-[-90deg]`}>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted" />
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            strokeDasharray={`${rec.score} 100`}
                            className={scoreColor}
                          />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${accent.color}`}>{rec.country}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rec.highlights.slice(0, 2).map((highlight) => (
                            <div key={highlight} className={`${scoreBgColor} ${scoreColor} text-xs py-0.5 px-1.5 rounded-full`}>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0 h-8 w-8 p-0" asChild>
                      <Link 
                        href={`/destinations/${rec.country.toLowerCase()}`}
                        className="flex items-center justify-center"
                      >
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-muted/20 p-4 rounded-lg border mt-6">
        <h3 className="text-base font-medium mb-1">Need more specific guidance?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          These recommendations are based on your inputs. For a more personalized assessment that takes into account 
          your full academic history and career goals, consider booking a consultation with our advisors.
        </p>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={restartTool}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Start Over
          </Button>
          <Button size="sm" asChild>
            <Link href="/contact" className="flex items-center">
              Speak to an Advisor
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Selection Card Component
function SelectionCard({ 
  title, 
  subtitle, 
  selected, 
  onClick, 
  compact = false,
  multiSelect = false
}: SelectionCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        border rounded-lg p-3 cursor-pointer transition-all
        ${compact ? 'py-2.5' : 'py-3'} 
        ${selected 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary/30 hover:bg-muted/20'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{title}</div>
          {subtitle && <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>}
        </div>
        
        <div className={`
          flex-shrink-0 ml-2 h-5 w-5 rounded-full flex items-center justify-center
          ${selected 
            ? 'bg-primary text-primary-foreground' 
            : 'border border-muted-foreground/30'
          }
        `}>
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
    </div>
  )
} 