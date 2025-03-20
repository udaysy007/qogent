'use client'

import { useState } from 'react'
import { University } from '@/types/university'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  DollarSign, 
  Home, 
  ShoppingBasket, 
  Bus, 
  HeartPulse, 
  Plus, 
  Minus, 
  Calculator,
  Building,
  Utensils,
  Wallet,
  GraduationCap
} from 'lucide-react'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface UniversityCostsProps {
  university: University
}

export function UniversityCosts({ university }: UniversityCostsProps) {
  const [studentType, setStudentType] = useState<'international' | 'domestic'>('international')
  const [housingType, setHousingType] = useState<'campus' | 'private'>('campus')
  const [mealPlan, setMealPlan] = useState<'full' | 'partial' | 'none'>('partial')
  const [transportationUsage, setTransportationUsage] = useState<number>(50)
  const [includeMiscExpenses, setIncludeMiscExpenses] = useState<boolean>(true)

  // Parse numeric values from string costs
  const parseAmount = (costString: string): number => {
    // Extract numbers from string (first number found)
    const match = costString.match(/(\d[\d,.]*)/)
    if (!match) return 0
    
    // Remove commas and convert to number
    return parseFloat(match[0].replace(/,/g, ''))
  }

  // Calculate tuition based on student type
  const tuitionCost = studentType === 'international' 
    ? parseAmount(university.costs.tuitionInternational)
    : parseAmount(university.costs.tuitionDomestic)

  // Calculate housing cost
  const housingCost = parseAmount(university.costs.livingExpenses.accommodation)
  const adjustedHousingCost = housingType === 'private' ? housingCost * 1.2 : housingCost

  // Calculate food cost based on meal plan
  const baseFoodCost = parseAmount(university.costs.livingExpenses.food)
  const mealPlanMultiplier = mealPlan === 'full' ? 1.2 : mealPlan === 'partial' ? 1 : 0.7
  const foodCost = baseFoodCost * mealPlanMultiplier

  // Calculate transportation cost
  const baseTransportCost = parseAmount(university.costs.livingExpenses.transportation)
  const transportationCost = baseTransportCost * (transportationUsage / 100)

  // Calculate other expenses
  const otherExpenses = includeMiscExpenses ? parseAmount(university.costs.livingExpenses.other) : 0

  // Calculate health insurance
  const healthInsuranceCost = parseAmount(university.costs.healthInsurance)

  // Calculate total
  const totalCost = tuitionCost + adjustedHousingCost + foodCost + transportationCost + otherExpenses + healthInsuranceCost

  // Format currency
  const formatCurrency = (amount: number): string => {
    return '$' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Introduction section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Costs & Financial Information</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Understanding the costs associated with studying at {university.name} is an important part of your decision-making process. 
            Below you'll find information about tuition fees, living expenses, and available scholarships.
          </p>
        </div>
      </section>

      {/* Tuition fees */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Tuition Fees</h3>
        <Tabs defaultValue="international" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="international"
              onClick={() => setStudentType('international')}
            >
              International Students
            </TabsTrigger>
            <TabsTrigger 
              value="domestic"
              onClick={() => setStudentType('domestic')}
            >
              Domestic Students
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="international" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">International Student Tuition</CardTitle>
                </div>
                <CardDescription>
                  Annual tuition fees for non-{university.countryName} citizens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {university.costs.tuitionInternational}
                </div>
                <p className="text-sm text-muted-foreground">
                  International tuition fees can vary based on your program of study and level. 
                  Some specialized programs may have different fee structures.
                </p>
              </CardContent>
            </Card>
            
            {university.costs.otherFees && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Additional Fees</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {university.costs.otherFees}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="domestic" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Domestic Student Tuition</CardTitle>
                </div>
                <CardDescription>
                  Annual tuition fees for {university.countryName} citizens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {university.costs.tuitionDomestic}
                </div>
                <p className="text-sm text-muted-foreground">
                  Domestic tuition fees can vary based on your program of study and level. 
                  Some specialized programs may have different fee structures.
                </p>
              </CardContent>
            </Card>
            
            {university.costs.otherFees && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Additional Fees</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {university.costs.otherFees}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Living expenses */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Living Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <CardTitle>Accommodation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold mb-2">
                {university.costs.livingExpenses.accommodation}
              </div>
              <p className="text-sm text-muted-foreground">
                Estimated annual cost for student housing, which may vary based on location and type of accommodation.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5 text-primary" />
                <CardTitle>Food & Groceries</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold mb-2">
                {university.costs.livingExpenses.food}
              </div>
              <p className="text-sm text-muted-foreground">
                Estimated annual cost for food, including groceries and occasional dining out.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                <CardTitle>Transportation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold mb-2">
                {university.costs.livingExpenses.transportation}
              </div>
              <p className="text-sm text-muted-foreground">
                Estimated annual cost for public transportation or personal transportation expenses.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                <CardTitle>Health Insurance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold mb-2">
                {university.costs.healthInsurance}
              </div>
              <p className="text-sm text-muted-foreground">
                Annual cost for mandatory health insurance coverage for students.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cost Calculator */}
      <section>
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Cost of Attendance Calculator</CardTitle>
            </div>
            <CardDescription>
              Estimate your total annual cost of studying at {university.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="student-type" className="text-base font-medium">Student Type</Label>
                  <Select 
                    value={studentType} 
                    onValueChange={(value) => setStudentType(value as 'international' | 'domestic')}
                  >
                    <SelectTrigger id="student-type" className="mt-2">
                      <SelectValue placeholder="Select student type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="international">International Student</SelectItem>
                      <SelectItem value="domestic">Domestic Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="housing-type" className="text-base font-medium">Housing Type</Label>
                  <Select 
                    value={housingType} 
                    onValueChange={(value) => setHousingType(value as 'campus' | 'private')}
                  >
                    <SelectTrigger id="housing-type" className="mt-2">
                      <SelectValue placeholder="Select housing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campus">On-Campus Housing</SelectItem>
                      <SelectItem value="private">Private Accommodation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="meal-plan" className="text-base font-medium">Meal Plan</Label>
                  <Select 
                    value={mealPlan} 
                    onValueChange={(value) => setMealPlan(value as 'full' | 'partial' | 'none')}
                  >
                    <SelectTrigger id="meal-plan" className="mt-2">
                      <SelectValue placeholder="Select meal plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Meal Plan</SelectItem>
                      <SelectItem value="partial">Partial Meal Plan</SelectItem>
                      <SelectItem value="none">No Meal Plan (Self-catering)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transportation" className="text-base font-medium">Transportation Usage</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Minimal</span>
                    <span className="text-sm text-muted-foreground">Regular</span>
                    <span className="text-sm text-muted-foreground">Frequent</span>
                  </div>
                  <Slider
                    id="transportation"
                    defaultValue={[50]}
                    max={100}
                    step={10}
                    onValueChange={(value) => setTransportationUsage(value[0])}
                    className="py-2"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    type="button" 
                    role="checkbox"
                    aria-checked={includeMiscExpenses}
                    data-state={includeMiscExpenses ? "checked" : "unchecked"}
                    className={cn(
                      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      includeMiscExpenses ? "bg-primary text-primary-foreground" : "bg-background"
                    )}
                    onClick={() => setIncludeMiscExpenses(!includeMiscExpenses)}
                  >
                    {includeMiscExpenses && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </button>
                  <Label
                    htmlFor="misc-expenses"
                    className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include miscellaneous expenses (books, supplies, entertainment, etc.)
                  </Label>
                </div>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-4">Estimated Annual Cost</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm">Tuition</span>
                    </div>
                    <span className="font-medium">{formatCurrency(tuitionCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="font-medium">{formatCurrency(adjustedHousingCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-primary" />
                      <span className="text-sm">Food</span>
                    </div>
                    <span className="font-medium">{formatCurrency(foodCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-primary" />
                      <span className="text-sm">Transportation</span>
                    </div>
                    <span className="font-medium">{formatCurrency(transportationCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4 text-primary" />
                      <span className="text-sm">Health Insurance</span>
                    </div>
                    <span className="font-medium">{formatCurrency(healthInsuranceCost)}</span>
                  </div>
                  
                  {includeMiscExpenses && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-primary" />
                        <span className="text-sm">Other Expenses</span>
                      </div>
                      <span className="font-medium">{formatCurrency(otherExpenses)}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Total Cost</span>
                    </div>
                    <span className="font-bold text-xl">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
                
                {/* Cost breakdown visualization */}
                <div className="mt-6 space-y-2">
                  <h5 className="text-sm font-medium mb-2">Cost Breakdown</h5>
                  <div className="space-y-1">
                    <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${Math.min(100, (tuitionCost / totalCost) * 100)}%` }}
                      />
                    </div>
                    <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-[#8884d8]" 
                        style={{ width: `${Math.min(100, (adjustedHousingCost / totalCost) * 100)}%` }}
                      />
                    </div>
                    <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-[#82ca9d]" 
                        style={{ width: `${Math.min(100, (foodCost / totalCost) * 100)}%` }}
                      />
                    </div>
                    <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-[#ffc658]" 
                        style={{ width: `${Math.min(100, ((transportationCost + healthInsuranceCost + otherExpenses) / totalCost) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 flex-wrap text-xs mt-2">
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 bg-primary rounded-full"></span>
                      <span>Tuition</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 bg-[#8884d8] rounded-full"></span>
                      <span>Accommodation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 bg-[#82ca9d] rounded-full"></span>
                      <span>Food</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 bg-[#ffc658] rounded-full"></span>
                      <span>Other Expenses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-4 bg-muted/20">
            <p className="text-xs text-muted-foreground">
              This is an estimate based on the information provided by the university. 
              Actual costs may vary based on your specific program, lifestyle, and circumstances.
            </p>
          </CardFooter>
        </Card>
      </section>

      {/* Scholarships */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Scholarships & Financial Aid</h3>
        
        {university.scholarships.length === 0 ? (
          <Card>
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">
                No scholarships information is currently available for this university. 
                Please check the university's official website for the most up-to-date information.
              </p>
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <a href={university.website + "/scholarships"} target="_blank" rel="noopener noreferrer">
                    Visit University Website
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {university.scholarships.map((scholarship, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
                    <Badge variant="outline" className="bg-primary/5 text-xs">
                      {scholarship.provider}
                    </Badge>
                    <h4 className="font-semibold">{scholarship.name}</h4>
                    <Badge variant="secondary" className="sm:ml-auto">
                      {scholarship.amount}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pt-2">
                    <p className="text-sm mb-4">
                      {scholarship.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Eligibility</h5>
                        <p className="text-sm text-muted-foreground">
                          {scholarship.eligibility}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-1">Application Process</h5>
                        <p className="text-sm text-muted-foreground">
                          {scholarship.applicationProcess}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Deadline</h5>
                        <p className="text-sm text-muted-foreground">
                          {scholarship.deadline}
                        </p>
                      </div>
                      
                      {scholarship.successRate && (
                        <div className="text-right">
                          <h5 className="text-sm font-medium mb-1">Success Rate</h5>
                          <p className="text-sm text-muted-foreground">
                            {scholarship.successRate}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
    </div>
  )
} 