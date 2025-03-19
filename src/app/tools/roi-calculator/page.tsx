"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Calculator, Search, Check, Globe, MapPin, BookOpen, GraduationCap, Building2, DollarSign, TrendingUp, Percent, Users, Clock, Award, Download, Share2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  EducationCost, 
  PotentialEarnings, 
  ROICalculationResult,
  calculateROI,
  getAvailableCountries,
  getDefaultEducationCostsByCountry,
  getDefaultPotentialEarningsByCountry,
  getDegreeDurations,
  formatCurrency,
  formatPercentage,
  formatYears,
  getRoiRating,
  getRoiColorClass
} from "@/lib/roi-calculator-utils"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label as AxisLabel,
  Cell
} from 'recharts';

// Define steps for the calculator
const STEPS = [
  {
    id: 1,
    title: "Country",
    description: "Select destination"
  },
  {
    id: 2,
    title: "Education",
    description: "Program details"
  },
  {
    id: 3,
    title: "Earnings",
    description: "Potential income"
  },
  {
    id: 4,
    title: "Results",
    description: "ROI breakdown"
  }
];

// Interfaces for components
interface CountrySelectionProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

interface EducationDetailsProps {
  educationCost: EducationCost;
  setEducationCost: (cost: EducationCost) => void;
  studyDuration: number;
  setStudyDuration: (duration: number) => void;
  opportunityCost: number;
  setOpportunityCost: (cost: number) => void;
}

interface PotentialEarningsProps {
  potentialEarnings: PotentialEarnings;
  setPotentialEarnings: (earnings: PotentialEarnings) => void;
}

interface ResultsProps {
  result: ROICalculationResult | null;
  restartCalculator: () => void;
  educationCost: EducationCost;
  potentialEarnings: PotentialEarnings;
  studyDuration: number;
  opportunityCost: number;
  selectedCountry: string;
}

// Country Selection Step Component
function CountrySelectionStep({ selectedCountry, setSelectedCountry }: CountrySelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const countries = getAvailableCountries();
  
  // Filter countries based on search query
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group countries by actual regions
  const regions: Record<string, string[]> = {
    "Europe": [],
    "North America": [],
    "Asia": [],
    "Australia & Oceania": [],
    "Other": []
  };
  
  // Populate regions with available countries
  filteredCountries.forEach(country => {
    // Import the country object to get its region
    const countryObj = countries.find(c => c.name === country);
    if (countryObj) {
      regions[countryObj.region].push(country);
    } else {
      regions["Other"].push(country);
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Select Your Study Destination</h2>
        <p className="text-muted-foreground">
          Choose the country where you plan to study. The calculator will use this to estimate your education costs and potential earnings.
        </p>
      </div>
      
      {/* Search input */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="space-y-6">
        {Object.entries(regions).map(([region, regionCountries]) => 
          regionCountries.length > 0 && (
            <div key={region}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{region}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {regionCountries.map((country) => (
                  <div
                    key={country}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      flex items-center gap-3
                      ${selectedCountry === country 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-muted-foreground hover:bg-muted/30'
                      }
                    `}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${selectedCountry === country 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {selectedCountry === country ? <Check className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                    </div>
                    <span>{country}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        
        {filteredCountries.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No countries found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Education Details Step Component
function EducationDetailsStep({ 
  educationCost, 
  setEducationCost, 
  studyDuration, 
  setStudyDuration,
  opportunityCost,
  setOpportunityCost
}: EducationDetailsProps) {
  const degreeDurations = getDegreeDurations();
  
  // Handle changes to education costs
  const handleTuitionChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setEducationCost({
      ...educationCost,
      tuitionFees: numValue
    });
  };
  
  const handleLivingExpensesChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setEducationCost({
      ...educationCost,
      livingExpenses: numValue
    });
  };
  
  const handleOtherExpensesChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setEducationCost({
      ...educationCost,
      otherExpenses: numValue
    });
  };
  
  const handleOpportunityCostChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setOpportunityCost(numValue);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Education Program Details</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter details about your education program including costs and duration.
          These values are pre-filled based on your selected country, but you can adjust them.
        </p>
      </div>
      
      {/* Program Duration */}
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Program Duration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {degreeDurations.map((duration) => (
            <div
              key={duration.label}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all
                flex items-center gap-3
                ${studyDuration === duration.value 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-muted-foreground hover:bg-muted/30'
                }
              `}
              onClick={() => setStudyDuration(duration.value)}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${studyDuration === duration.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {studyDuration === duration.value ? 
                  <Check className="h-4 w-4" /> : 
                  <GraduationCap className="h-4 w-4" />
                }
              </div>
              <span>{duration.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Education Costs */}
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Education Costs (Annual)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tuition Fees */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-info" />
              </div>
              <Label htmlFor="tuitionFees" className="font-medium">Tuition Fees</Label>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="tuitionFees"
                  type="number"
                  min="0"
                  step="1000"
                  value={educationCost.tuitionFees}
                  onChange={(e) => handleTuitionChange(e.target.value)}
                  className="pl-8"
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">USD/year</span>
            </div>
            <p className="text-xs text-muted-foreground">The annual cost of your tuition and fees.</p>
          </div>
          
          {/* Living Expenses */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-success" />
              </div>
              <Label htmlFor="livingExpenses" className="font-medium">Living Expenses</Label>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="livingExpenses"
                  type="number"
                  min="0"
                  step="500"
                  value={educationCost.livingExpenses}
                  onChange={(e) => handleLivingExpensesChange(e.target.value)}
                  className="pl-8"
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">USD/year</span>
            </div>
            <p className="text-xs text-muted-foreground">The annual cost of accommodation, food, and transportation.</p>
          </div>
          
          {/* Other Expenses */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <Calculator className="h-4 w-4 text-secondary" />
              </div>
              <Label htmlFor="otherExpenses" className="font-medium">Other Expenses</Label>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="otherExpenses"
                  type="number"
                  min="0"
                  step="100"
                  value={educationCost.otherExpenses}
                  onChange={(e) => handleOtherExpensesChange(e.target.value)}
                  className="pl-8"
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">USD/year</span>
            </div>
            <p className="text-xs text-muted-foreground">Additional annual costs like books, insurance, and personal expenses.</p>
          </div>
          
          {/* Opportunity Cost */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-warning" />
              </div>
              <Label htmlFor="opportunityCost" className="font-medium">Opportunity Cost</Label>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="opportunityCost"
                  type="number"
                  min="0"
                  step="1000"
                  value={opportunityCost}
                  onChange={(e) => handleOpportunityCostChange(e.target.value)}
                  className="pl-8"
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">USD total</span>
            </div>
            <p className="text-xs text-muted-foreground">The total income you would have earned if you weren't studying.</p>
          </div>
        </div>
      </div>
      
      {/* Total Investment Summary */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Total Investment</h3>
            <p className="text-sm text-muted-foreground">
              For {studyDuration} {studyDuration === 1 ? 'year' : 'years'} of education
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {formatCurrency((educationCost.tuitionFees + educationCost.livingExpenses + educationCost.otherExpenses) * studyDuration + opportunityCost)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatCurrency(educationCost.tuitionFees * studyDuration)} tuition + {formatCurrency(educationCost.livingExpenses * studyDuration)} living + {formatCurrency(educationCost.otherExpenses * studyDuration)} other + {formatCurrency(opportunityCost)} opportunity
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Potential Earnings Step Component
function PotentialEarningsStep({ potentialEarnings, setPotentialEarnings }: PotentialEarningsProps) {
  // Handle changes to potential earnings
  const handleStartingSalaryChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setPotentialEarnings({
      ...potentialEarnings,
      startingSalary: numValue
    });
  };
  
  const handleSalaryGrowthChange = (value: number[]) => {
    setPotentialEarnings({
      ...potentialEarnings,
      salaryGrowthRate: value[0] / 100
    });
  };
  
  const handleEmploymentRateChange = (value: number[]) => {
    setPotentialEarnings({
      ...potentialEarnings,
      employmentRate: value[0] / 100
    });
  };
  
  // Format for display
  const displaySalaryGrowth = Math.round(potentialEarnings.salaryGrowthRate * 100);
  const displayEmploymentRate = Math.round(potentialEarnings.employmentRate * 100);
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Potential Future Earnings</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate your potential earnings after graduation. These values are pre-filled
          based on your selected country, but you can adjust them based on your specific field and career path.
        </p>
      </div>
      
      {/* Starting Salary */}
      <div className="space-y-6">
        <div className="bg-muted/20 p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-info" />
            </div>
            <div>
              <Label htmlFor="startingSalary" className="text-lg font-medium">Expected Starting Salary</Label>
              <p className="text-sm text-muted-foreground">The annual salary you expect in your first job after graduation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
              <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="startingSalary"
                type="number"
                min="0"
                step="1000"
                value={potentialEarnings.startingSalary}
                onChange={(e) => handleStartingSalaryChange(e.target.value)}
                className="pl-8 text-lg"
              />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">USD/year</span>
          </div>
        </div>
        
        {/* Salary Growth Rate */}
        <div className="bg-muted/20 p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <Label htmlFor="salaryGrowth" className="text-lg font-medium">Annual Salary Growth Rate</Label>
              <p className="text-sm text-muted-foreground">The expected percentage your salary will increase each year</p>
            </div>
          </div>
          
          <div className="px-2">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Lower</span>
              <span className="text-sm font-medium">{displaySalaryGrowth}%</span>
              <span className="text-sm text-muted-foreground">Higher</span>
            </div>
            <Slider
              id="salaryGrowth"
              min={0}
              max={10}
              step={0.5}
              value={[displaySalaryGrowth]}
              onValueChange={handleSalaryGrowthChange}
              className="py-4"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">0%</span>
              <span className="text-xs text-muted-foreground">2%</span>
              <span className="text-xs text-muted-foreground">4%</span>
              <span className="text-xs text-muted-foreground">6%</span>
              <span className="text-xs text-muted-foreground">8%</span>
              <span className="text-xs text-muted-foreground">10%</span>
            </div>
          </div>
          
          <div className="bg-secondary/5 p-3 rounded-md text-sm">
            <p>A growth rate of {displaySalaryGrowth}% means your salary could double in approximately {Math.round(70 / displaySalaryGrowth)} years (using the Rule of 70).</p>
          </div>
        </div>
        
        {/* Employment Rate */}
        <div className="bg-muted/20 p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="employmentRate" className="text-lg font-medium">Field Employment Rate</Label>
              <p className="text-sm text-muted-foreground">The percentage of graduates who find relevant employment in your field</p>
            </div>
          </div>
          
          <div className="px-2">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Lower</span>
              <span className="text-sm font-medium">{displayEmploymentRate}%</span>
              <span className="text-sm text-muted-foreground">Higher</span>
            </div>
            <Slider
              id="employmentRate"
              min={50}
              max={100}
              step={1}
              value={[displayEmploymentRate]}
              onValueChange={handleEmploymentRateChange}
              className="py-4"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">50%</span>
              <span className="text-xs text-muted-foreground">60%</span>
              <span className="text-xs text-muted-foreground">70%</span>
              <span className="text-xs text-muted-foreground">80%</span>
              <span className="text-xs text-muted-foreground">90%</span>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
          </div>
          
          <div className="bg-secondary/5 p-3 rounded-md text-sm">
            <p>An employment rate of {displayEmploymentRate}% reflects the likelihood of finding relevant employment in your field. This affects your long-term ROI calculation.</p>
          </div>
        </div>
      </div>
      
      {/* Expected 5-Year Growth Summary */}
      <Card className="p-4 bg-success/5 border-success/20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Expected 5-Year Salary Growth</h3>
            <p className="text-sm text-muted-foreground">
              Based on your starting salary and growth rate
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {formatCurrency(potentialEarnings.startingSalary * Math.pow(1 + potentialEarnings.salaryGrowthRate, 5))}
            </div>
            <div className="text-sm text-muted-foreground">
              Starting from {formatCurrency(potentialEarnings.startingSalary)} with {formatPercentage(potentialEarnings.salaryGrowthRate)} annual growth
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Results Step Component
function ResultsStep({ 
  result, 
  restartCalculator,
  educationCost,
  potentialEarnings,
  studyDuration,
  opportunityCost,
  selectedCountry
}: ResultsProps) {
  if (!result) return null;
  
  // Get ROI rating for different time periods
  const roi5YearsRating = getRoiRating(result.roi5Years);
  const roi10YearsRating = getRoiRating(result.roi10Years);
  const roi15YearsRating = getRoiRating(result.roi15Years);
  const roi20YearsRating = getRoiRating(result.roi20Years);
  
  // Get color classes for different time periods
  const roi5YearsColor = getRoiColorClass(roi5YearsRating);
  const roi10YearsColor = getRoiColorClass(roi10YearsRating);
  const roi15YearsColor = getRoiColorClass(roi15YearsRating);
  const roi20YearsColor = getRoiColorClass(roi20YearsRating);
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Education ROI Analysis</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your inputs, here's a detailed breakdown of your expected return on investment
          for studying {selectedCountry ? `in ${selectedCountry}` : 'abroad'}.
        </p>
      </div>
      
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Investment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tuition Fees ({studyDuration} years):</span>
                <span className="font-medium">{formatCurrency(educationCost.tuitionFees * studyDuration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Living Expenses ({studyDuration} years):</span>
                <span className="font-medium">{formatCurrency(educationCost.livingExpenses * studyDuration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Other Expenses ({studyDuration} years):</span>
                <span className="font-medium">{formatCurrency(educationCost.otherExpenses * studyDuration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Opportunity Cost:</span>
                <span className="font-medium">{formatCurrency(opportunityCost)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Total Investment:</span>
                <span className="font-bold text-lg">{formatCurrency(result.totalInvestment)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Return Summary</h3>
            <div className="flex items-center gap-6">
              <div 
                className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 flex-shrink-0"
                style={{ borderColor: roi20YearsColor }}
              >
                <span className="text-xs text-muted-foreground">20-Year ROI</span>
                <span className="font-bold text-lg" style={{ color: roi20YearsColor }}>{formatPercentage(result.roi20Years)}</span>
              </div>
              <div className="flex-grow space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-muted">
                  <span className="text-sm font-medium">Payback Period:</span>
                  <span className="font-medium">{formatYears(result.paybackPeriod)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-muted">
                  <span className="text-sm font-medium">20-Year Return:</span>
                  <span className="font-medium">{formatCurrency(result.twentyYearReturn)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rating:</span>
                  <span className="font-medium capitalize px-3 py-1 rounded-full text-sm" 
                    style={{ 
                      backgroundColor: `${roi20YearsColor}20`,
                      color: roi20YearsColor 
                    }}
                  >
                    {roi20YearsRating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ROI over time chart */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">ROI Over Time</h3>
        <Tabs defaultValue="percentage">
          <TabsList className="mb-4">
            <TabsTrigger value="percentage">Percentage Return</TabsTrigger>
            <TabsTrigger value="dollar">Dollar Value</TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentage" className="space-y-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: '5 yrs', roi: result.roi5Years, color: roi5YearsColor },
                    { name: '10 yrs', roi: result.roi10Years, color: roi10YearsColor },
                    { name: '15 yrs', roi: result.roi15Years, color: roi15YearsColor },
                    { name: '20 yrs', roi: result.roi20Years, color: roi20YearsColor },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`}>
                    <AxisLabel value="ROI (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value) => [`${value.toFixed(1)}%`, 'ROI']}
                    labelFormatter={(label) => `Period: ${label}`}
                    contentStyle={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="roi" 
                    name="Return on Investment" 
                    radius={[4, 4, 0, 0]}
                    fill="var(--primary)"
                    barSize={60}
                  >
                    {[
                      { name: '5 yrs', roi: result.roi5Years, fill: roi5YearsColor },
                      { name: '10 yrs', roi: result.roi10Years, fill: roi10YearsColor },
                      { name: '15 yrs', roi: result.roi15Years, fill: roi15YearsColor },
                      { name: '20 yrs', roi: result.roi20Years, fill: roi20YearsColor },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="dollar" className="space-y-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: '5 yrs', value: result.fiveYearReturn, color: roi5YearsColor },
                    { name: '10 yrs', value: result.tenYearReturn, color: roi10YearsColor },
                    { name: '15 yrs', value: result.fifteenYearReturn, color: roi15YearsColor },
                    { name: '20 yrs', value: result.twentyYearReturn, color: roi20YearsColor },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)}>
                    <AxisLabel value="Return ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Return']}
                    labelFormatter={(label) => `Period: ${label}`}
                    contentStyle={{ 
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Dollar Value Return" 
                    radius={[4, 4, 0, 0]}
                    fill="var(--primary)"
                    barSize={60}
                  >
                    {[
                      { name: '5 yrs', value: result.fiveYearReturn, fill: roi5YearsColor },
                      { name: '10 yrs', value: result.tenYearReturn, fill: roi10YearsColor },
                      { name: '15 yrs', value: result.fifteenYearReturn, fill: roi15YearsColor },
                      { name: '20 yrs', value: result.twentyYearReturn, fill: roi20YearsColor },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Payback Period</h4>
            <div className="text-2xl font-bold mb-1">{formatYears(result.paybackPeriod)}</div>
            <p className="text-xs text-muted-foreground">
              Time needed to recover your total investment
            </p>
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-10">
            <Clock className="h-16 w-16" />
          </div>
        </Card>
        
        <Card className="p-4 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">10-Year ROI</h4>
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: roi10YearsColor }}
            >
              {formatPercentage(result.roi10Years)}
            </div>
            <p className="text-xs text-muted-foreground">
              Return on investment after 10 years
            </p>
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-10">
            <Award className="h-16 w-16" />
          </div>
        </Card>
        
        <Card className="p-4 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Lifetime Value</h4>
            <div className="text-2xl font-bold mb-1">{formatCurrency(result.twentyYearReturn)}</div>
            <p className="text-xs text-muted-foreground">
              Additional earnings over 20 years
            </p>
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-10">
            <DollarSign className="h-16 w-16" />
          </div>
        </Card>
      </div>
      
      {/* Conclusion and Action Buttons */}
      <div className="bg-muted/30 p-6 rounded-lg border mt-8">
        <h3 className="text-xl font-medium mb-3">What Does This Mean?</h3>
        <p className="mb-4">
          {roi20YearsRating === 'excellent' && 
            "Your education investment shows an excellent long-term return. The high ROI suggests that this educational path is financially sound and likely to pay off significantly over your career."
          }
          {roi20YearsRating === 'good' && 
            "Your education investment shows a good long-term return. This educational path is likely to be financially beneficial over your career, though there may be ways to optimize your return further."
          }
          {roi20YearsRating === 'average' && 
            "Your education investment shows an average return. While it's likely to pay off in the long run, you might want to explore ways to increase your potential earnings or reduce costs."
          }
          {roi20YearsRating === 'poor' && 
            "Your education investment shows a relatively low return. You may want to consider ways to improve your ROI by reducing costs, exploring scholarships, or focusing on higher-paying career paths after graduation."
          }
          {roi20YearsRating === 'negative' && 
            "Your education investment may not pay off financially based on the current inputs. Consider carefully whether this specific program and cost structure is right for you, or explore alternatives with better financial outcomes."
          }
        </p>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={restartCalculator}
          >
            <RefreshCw className="h-4 w-4" /> 
            Recalculate
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ROICalculatorPage() {
  // Track the current step
  const [step, setStep] = useState(1);
  
  // State for Country Selection
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  // State for Education Details
  const [educationCost, setEducationCost] = useState<EducationCost>({
    tuitionFees: 20000,
    livingExpenses: 12000,
    otherExpenses: 2000
  });
  const [studyDuration, setStudyDuration] = useState<number>(4);
  const [opportunityCost, setOpportunityCost] = useState<number>(30000);
  
  // State for Potential Earnings
  const [potentialEarnings, setPotentialEarnings] = useState<PotentialEarnings>({
    startingSalary: 45000,
    salaryGrowthRate: 0.04,
    employmentRate: 0.92
  });
  
  // State for Results
  const [result, setResult] = useState<ROICalculationResult | null>(null);
  
  // Update education costs and potential earnings when country changes
  useEffect(() => {
    if (selectedCountry) {
      setEducationCost(getDefaultEducationCostsByCountry(selectedCountry));
      setPotentialEarnings(getDefaultPotentialEarningsByCountry(selectedCountry));
    }
  }, [selectedCountry]);
  
  // Handle step navigation
  const nextStep = () => {
    if (step === 3) {
      // Calculate ROI before moving to results step
      const calculatedResult = calculateROI(
        educationCost,
        potentialEarnings,
        studyDuration,
        opportunityCost
      );
      setResult(calculatedResult);
    }
    setStep((prev) => Math.min(prev + 1, STEPS.length));
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  
  // Reset calculator to initial state
  const restartCalculator = () => {
    setStep(1);
    setSelectedCountry("");
    setEducationCost({
      tuitionFees: 20000,
      livingExpenses: 12000,
      otherExpenses: 2000
    });
    setStudyDuration(4);
    setOpportunityCost(30000);
    setPotentialEarnings({
      startingSalary: 45000,
      salaryGrowthRate: 0.04,
      employmentRate: 0.92
    });
    setResult(null);
  };
  
  // Check if next button should be disabled
  const isNextDisabled = () => {
    if (step === 1 && !selectedCountry) return true;
    return false;
  };
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Education ROI Calculator</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Calculate the return on investment for your international education. 
          This tool helps you understand the financial value of your degree by comparing the costs 
          of studying abroad with your potential future earnings.
        </p>
      </div>
      
      {/* Step Indicator */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center relative">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                  ${step === s.id 
                    ? "bg-primary text-primary-foreground" 
                    : step > s.id 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}
              >
                {s.id}
              </div>
              <div className="text-xs font-medium">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.description}</div>
              
              {/* Line connector (except for the last item) */}
              {s.id < STEPS.length && (
                <div className="absolute h-[2px] bg-muted w-24 top-5 left-[calc(100%+0.5rem)]">
                  {step > s.id && <div className="h-full bg-primary" style={{ width: '100%' }}></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content Area */}
      <Card className="p-6 mb-8 bg-gradient-to-b from-card to-card/80">
        {/* Step Components will be rendered here based on current step */}
        {step === 1 && (
          <CountrySelectionStep
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}
        
        {step === 2 && (
          <EducationDetailsStep
            educationCost={educationCost}
            setEducationCost={setEducationCost}
            studyDuration={studyDuration}
            setStudyDuration={setStudyDuration}
            opportunityCost={opportunityCost}
            setOpportunityCost={setOpportunityCost}
          />
        )}
        
        {step === 3 && (
          <PotentialEarningsStep
            potentialEarnings={potentialEarnings}
            setPotentialEarnings={setPotentialEarnings}
          />
        )}
        
        {step === 4 && (
          <ResultsStep
            result={result}
            restartCalculator={restartCalculator}
            educationCost={educationCost}
            potentialEarnings={potentialEarnings}
            studyDuration={studyDuration}
            opportunityCost={opportunityCost}
            selectedCountry={selectedCountry}
          />
        )}
      </Card>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-3xl mx-auto">
        {step > 1 ? (
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Step
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < STEPS.length ? (
          <Button 
            onClick={nextStep}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            disabled={isNextDisabled()}
          >
            Next Step
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={restartCalculator}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            Start New Calculation
          </Button>
        )}
      </div>
    </div>
  );
} 