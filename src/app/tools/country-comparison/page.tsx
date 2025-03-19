"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowRight, Check, ChevronLeft, Globe, Flag, School, CreditCard, Briefcase, Building, HeartPulse, Wallet, FileText, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import { 
  CountryBasic, 
  CountryData, 
  MetricCategory,
  getCountries,
  getCountryData,
  getRegions,
  getMetricInfo
} from "@/lib/country-comparison-utils"

// Steps definition
const STEPS = [
  { id: "countries", title: "Select Countries", description: "Choose up to 3 countries to compare" },
  { id: "metrics", title: "Choose Metrics", description: "Select the metrics you want to compare" },
  { id: "results", title: "Compare Results", description: "View side-by-side comparison" }
]

// Define interfaces
interface ComparisonState {
  step: string
  selectedCountries: string[]
  selectedMetrics: MetricCategory[]
}

interface CountrySelectionProps {
  selectedCountries: string[]
  onSelectCountry: (countryId: string) => void
  onRemoveCountry: (countryId: string) => void
  onContinue: () => void
}

interface MetricSelectionProps {
  selectedMetrics: MetricCategory[]
  onToggleMetric: (metric: MetricCategory) => void
  onContinue: () => void
  onBack: () => void
}

interface ComparisonResultsProps {
  selectedCountries: string[]
  selectedMetrics: MetricCategory[]
  onStartOver: () => void
  onBack: () => void
}

// Country Selection Step Component
function CountrySelectionStep({
  selectedCountries,
  onSelectCountry,
  onRemoveCountry,
  onContinue
}: CountrySelectionProps) {
  const [countries, setCountries] = useState<CountryBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("All");
  const [regions, setRegions] = useState<string[]>([]);

  // Fetch countries and regions on component mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const countriesData = await getCountries();
        const regionsData = await getRegions();
        setCountries(countriesData);
        setRegions(["All", ...regionsData]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter countries based on search query and active region
  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = activeRegion === "All" || country.region.toLowerCase() === activeRegion.toLowerCase();
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, activeRegion]);

  // Check if a country is selected
  const isSelected = (countryId: string) => selectedCountries.includes(countryId);

  // Handle region filter click
  const handleRegionClick = (region: string) => {
    setActiveRegion(region);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Select Countries to Compare</h2>
        <p className="text-muted-foreground">
          Choose up to 3 countries that you are interested in comparing side by side.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search countries..."
            className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-info"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex-initial">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="bg-muted/50 flex overflow-x-auto whitespace-nowrap">
              {regions.map((region, index) => (
                <TabsTrigger
                  key={`region-tab-${index}`}
                  value={region}
                  onClick={() => handleRegionClick(region)}
                  className="flex-shrink-0"
                >
                  {region}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Selected countries */}
      {selectedCountries.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Selected Countries</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((countryId) => {
              const country = countries.find((c) => c.id === countryId);
              if (!country) return null;
              
              return (
                <div 
                  key={country.id}
                  className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-full border"
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src={country.flagUrl} 
                      alt={`${country.name} flag`} 
                      width={20} 
                      height={20} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm">{country.name}</span>
                  <button 
                    onClick={() => onRemoveCountry(country.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Countries grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-info"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                onClick={() => !isSelected(country.id) && onSelectCountry(country.id)}
                className={`
                  relative rounded-lg p-4 cursor-pointer transition-all
                  ${isSelected(country.id) 
                    ? 'bg-info/10 border-2 border-info' 
                    : selectedCountries.length >= 3 
                      ? 'bg-muted/50 border border-border opacity-50 cursor-not-allowed' 
                      : 'bg-card hover:bg-card/80 border border-border hover:border-info/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border">
                    <Image 
                      src={country.flagUrl} 
                      alt={`${country.name} flag`} 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{country.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{country.region}</p>
                  </div>
                </div>
                
                {isSelected(country.id) && (
                  <div className="absolute top-2 right-2 bg-info text-info-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredCountries.length === 0 && (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-medium">No countries found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </>
      )}

      {/* Continue button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={onContinue}
          disabled={selectedCountries.length === 0}
          className={`bg-info hover:bg-info/90 text-info-foreground ${
            selectedCountries.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue to Choose Metrics
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Metric Selection Step Component
function MetricSelectionStep({
  selectedMetrics,
  onToggleMetric,
  onContinue,
  onBack
}: MetricSelectionProps) {
  const metricInfo = getMetricInfo();
  const allMetrics = Object.keys(metricInfo) as MetricCategory[];
  
  // Check if a metric is selected
  const isSelected = (metric: MetricCategory) => selectedMetrics.includes(metric);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "School": return <School className="h-5 w-5" />;
      case "Wallet": return <Wallet className="h-5 w-5" />;
      case "FileText": return <FileText className="h-5 w-5" />;
      case "Briefcase": return <Briefcase className="h-5 w-5" />;
      case "GraduationCap": return <GraduationCap className="h-5 w-5" />;
      case "HeartPulse": return <HeartPulse className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Choose Metrics to Compare</h2>
        <p className="text-muted-foreground">
          Select the categories you want to compare between your selected countries.
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allMetrics.map((metric) => (
          <div
            key={metric}
            onClick={() => onToggleMetric(metric)}
            className={`
              relative rounded-lg p-5 cursor-pointer transition-all
              ${isSelected(metric) 
                ? 'bg-info/10 border-2 border-info' 
                : 'bg-card hover:bg-card/80 border border-border hover:border-info/50'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-full 
                ${isSelected(metric) 
                  ? 'bg-info/20 text-info' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {getIconComponent(metricInfo[metric].icon)}
              </div>
              <div>
                <h3 className="font-medium">{metricInfo[metric].title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {metricInfo[metric].description}
                </p>
              </div>
            </div>
            
            {isSelected(metric) && (
              <div className="absolute top-3 right-3 bg-info text-info-foreground rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-info text-info hover:bg-info/10"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Countries
        </Button>
        
        <Button
          onClick={onContinue}
          disabled={selectedMetrics.length === 0}
          className={`bg-info hover:bg-info/90 text-info-foreground ${
            selectedMetrics.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          View Comparison
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Comparison Results Step Component
function ComparisonResultsStep({
  selectedCountries,
  selectedMetrics,
  onStartOver,
  onBack
}: ComparisonResultsProps) {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const metricInfo = getMetricInfo();
  
  // Fetch detailed country data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getCountryData(selectedCountries);
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedCountries]);

  // Helper to get icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "School": return <School className="h-5 w-5" />;
      case "Wallet": return <Wallet className="h-5 w-5" />;
      case "FileText": return <FileText className="h-5 w-5" />;
      case "Briefcase": return <Briefcase className="h-5 w-5" />;
      case "GraduationCap": return <GraduationCap className="h-5 w-5" />;
      case "HeartPulse": return <HeartPulse className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  // Function to render the content of a metric category
  const renderMetricContent = (category: MetricCategory, country: CountryData) => {
    switch (category) {
      case "tuition":
        return (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Bachelor's (Public)</span>
              <p className="text-sm">{country.tuition.bachelorFeePublic}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Bachelor's (Private)</span>
              <p className="text-sm">{country.tuition.bachelorFeePrivate}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Master's (Public)</span>
              <p className="text-sm">{country.tuition.masterFeePublic}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Master's (Private)</span>
              <p className="text-sm">{country.tuition.masterFeePrivate}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              Currency: {country.tuition.currency}
            </div>
          </div>
        );
      
      case "livingCosts":
        return (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Accommodation</span>
              <p className="text-sm">{country.livingCosts.accommodationCost}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Food</span>
              <p className="text-sm">{country.livingCosts.foodCost}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Transportation</span>
              <p className="text-sm">{country.livingCosts.transportCost}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Utilities</span>
              <p className="text-sm">{country.livingCosts.utilitiesCost}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Total Monthly</span>
              <p className="text-sm font-semibold">{country.livingCosts.totalMonthlyCost}</p>
            </div>
          </div>
        );
      
      case "visa":
        return (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Requirements</span>
              <p className="text-sm">{country.visa.visaRequirements}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Financial Proof</span>
              <p className="text-sm">{country.visa.financialRequirements}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Health Requirements</span>
              <p className="text-sm">{country.visa.healthRequirements}</p>
            </div>
          </div>
        );
      
      case "employment":
        return (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Post-Study Work</span>
              <p className="text-sm">{country.employment.postStudyWork}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Work Opportunities</span>
              <p className="text-sm">{country.employment.workOpportunities}</p>
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Academic Year</span>
              <p className="text-sm">{country.education.academicYear}</p>
            </div>
            <div>
              <span className="text-sm font-medium">International Students</span>
              <p className="text-sm">{country.education.internationalStudents}</p>
            </div>
            <div>
              <span className="text-sm font-medium">English-taught Programs</span>
              <p className="text-sm">{country.education.englishPrograms}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Teaching Style</span>
              <p className="text-sm">{country.education.teachingStyle}</p>
            </div>
          </div>
        );
      
      case "lifestyle":
        return (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Campus Life</span>
              <p className="text-sm">{country.lifestyle.campusLife}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Cultural Experience</span>
              <p className="text-sm">{country.lifestyle.culturalExperience}</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Mobile-only comparison cards for stacked view
  const renderMobileComparisonCards = () => {
    return (
      <div className="space-y-8 md:hidden">
        {countryData.map((country) => (
          <div key={country.id} className="border rounded-lg overflow-hidden">
            {/* Country header */}
            <div className="bg-muted p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border">
                <Image 
                  src={country.flagUrl} 
                  alt={`${country.name} flag`} 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{country.name}</h3>
                <p className="text-xs text-muted-foreground capitalize">{country.region}</p>
              </div>
            </div>
            
            {/* Metrics for this country */}
            {selectedMetrics.map((metric) => (
              <div key={`mobile-${country.id}-${metric}`} className="border-t">
                <div className="p-3 bg-muted/30 font-medium flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-info/20 text-info">
                    {getIconComponent(metricInfo[metric].icon)}
                  </div>
                  <span>{metricInfo[metric].title}</span>
                </div>
                <div className="p-4">
                  {renderMetricContent(metric, country)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-info mb-4"></div>
          <p className="text-muted-foreground">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Country Comparison Results</h2>
        <p className="text-muted-foreground">
          Side-by-side comparison of your selected countries across the chosen metrics.
        </p>
      </div>

      {/* Results grid - sticky headers */}
      <div className="overflow-x-auto border rounded-lg hidden md:block">
        <div className="min-w-max md:min-w-0">
          {/* Country headers */}
          <div className={`grid ${countryData.length == 1 ? 'grid-cols-1' : countryData.length == 2 ? 'grid-cols-2' : 'grid-cols-3'} bg-muted sticky top-0 z-10`}>
            {countryData.map((country) => (
              <div key={country.id} className="p-4 flex items-center gap-3 border-r last:border-r-0">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border">
                  <Image 
                    src={country.flagUrl} 
                    alt={`${country.name} flag`} 
                    width={32} 
                    height={32} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{country.name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{country.region}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics content */}
          {selectedMetrics.map((metric) => (
            <div key={metric} className="border-t">
              {/* Metric header - spans all columns */}
              <div className="bg-muted/50 p-4 font-medium flex items-center gap-2 border-b">
                <div className="p-1.5 rounded-full bg-info/20 text-info">
                  {getIconComponent(metricInfo[metric].icon)}
                </div>
                <span>{metricInfo[metric].title}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  — {metricInfo[metric].description}
                </span>
              </div>
              
              {/* Metric content */}
              <div className={`grid ${countryData.length == 1 ? 'grid-cols-1' : countryData.length == 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {countryData.map((country) => (
                  <div key={`${metric}-${country.id}-content`} className="p-4 border-r last:border-r-0">
                    {renderMetricContent(metric, country)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion and action buttons */}
      <div className="bg-muted/30 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium mb-2">What's Next?</h3>
        <p className="text-muted-foreground mb-4">
          Now that you've compared these countries, you can explore specific universities, 
          read more detailed guides, or get personalized advice for your study abroad journey.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button variant="outline" className="border-info text-info hover:bg-info/10">
            <Link href="/countries" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Explore Country Guides
            </Link>
          </Button>
          <Button variant="outline" className="border-info text-info hover:bg-info/10">
            <Link href="/contact" className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4" />
              Get Expert Advice
            </Link>
          </Button>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-info text-info hover:bg-info/10"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Metrics
        </Button>
        
        <Button
          onClick={onStartOver}
          variant="secondary"
          className="bg-info/10 hover:bg-info/20 text-info"
        >
          Start Over
        </Button>
      </div>

      {/* Mobile-only comparison cards */}
      {renderMobileComparisonCards()}
    </div>
  );
}

// Default export - main page component
export default function CountryComparisonPage() {
  // Initialize state
  const [state, setState] = useState<ComparisonState>({
    step: STEPS[0].id,
    selectedCountries: [],
    selectedMetrics: ["tuition", "livingCosts", "visa", "employment"]
  })

  // Navigation handlers
  const goToStep = (step: string) => {
    setState(prev => ({ ...prev, step }))
  }

  const selectCountry = (countryId: string) => {
    if (state.selectedCountries.includes(countryId)) {
      return
    }
    
    if (state.selectedCountries.length < 3) {
      setState(prev => ({
        ...prev,
        selectedCountries: [...prev.selectedCountries, countryId]
      }))
    }
  }

  const removeCountry = (countryId: string) => {
    setState(prev => ({
      ...prev,
      selectedCountries: prev.selectedCountries.filter(id => id !== countryId)
    }))
  }

  const toggleMetric = (metric: MetricCategory) => {
    setState(prev => {
      if (prev.selectedMetrics.includes(metric)) {
        return {
          ...prev,
          selectedMetrics: prev.selectedMetrics.filter(m => m !== metric)
        }
      } else {
        return {
          ...prev,
          selectedMetrics: [...prev.selectedMetrics, metric]
        }
      }
    })
  }

  const startOver = () => {
    setState({
      step: STEPS[0].id,
      selectedCountries: [],
      selectedMetrics: ["tuition", "livingCosts", "visa", "employment"]
    })
  }

  // Render current step
  const renderStep = () => {
    switch (state.step) {
      case "countries":
        return (
          <CountrySelectionStep
            selectedCountries={state.selectedCountries}
            onSelectCountry={selectCountry}
            onRemoveCountry={removeCountry}
            onContinue={() => goToStep("metrics")}
          />
        )
      case "metrics":
        return (
          <MetricSelectionStep
            selectedMetrics={state.selectedMetrics}
            onToggleMetric={toggleMetric}
            onContinue={() => goToStep("results")}
            onBack={() => goToStep("countries")}
          />
        )
      case "results":
        return (
          <ComparisonResultsStep
            selectedCountries={state.selectedCountries}
            selectedMetrics={state.selectedMetrics}
            onStartOver={startOver}
            onBack={() => goToStep("metrics")}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="py-8 md:py-10 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <Link 
            href="/tools" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Tools
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Country Comparison Dashboard</h1>
            <p className="text-muted-foreground">
              Compare key metrics across countries to find your ideal study destination
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="container px-4 md:px-6 py-4 border-b">
        <div className="flex justify-between max-w-3xl mx-auto">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2
                  ${state.step === step.id 
                    ? "bg-info text-info-foreground" 
                    : STEPS.findIndex(s => s.id === state.step) > index 
                      ? "bg-info/20 text-info" 
                      : "bg-muted text-muted-foreground"
                  }`}
              >
                {STEPS.findIndex(s => s.id === state.step) > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs font-medium hidden md:block
                ${state.step === step.id 
                  ? "text-foreground" 
                  : "text-muted-foreground"}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  )
}

// Components for each step will be implemented in subsequent chunks 