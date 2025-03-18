'use client'

import { Scholarship, UniversityCosts } from '@/types/university'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UniversityCostsProps {
  costs: UniversityCosts
  scholarships: Scholarship[]
}

export function UniversityCosts({ costs, scholarships }: UniversityCostsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tuition & Costs</h2>
        <p className="text-muted-foreground mb-6">
          Below is a breakdown of the costs associated with studying.
          These costs are estimates and may vary depending on your specific situation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tuition Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Domestic Students:</p>
                  <p className="font-bold">{costs.tuitionDomestic}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">International Students:</p>
                  <p className="font-bold">{costs.tuitionInternational}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Additional Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Application Fee:</p>
                  <p className="font-bold">{costs.applicationFee || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Other Fees:</p>
                  <p className="font-bold">{costs.otherFees || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Insurance:</p>
                  <p className="font-bold">{costs.healthInsurance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Living Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Accommodation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{costs.livingExpenses.accommodation}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Food</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{costs.livingExpenses.food}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Transportation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{costs.livingExpenses.transportation}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Other Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{costs.livingExpenses.other}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {scholarships.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Scholarships</h3>
          <div className="space-y-6">
            {scholarships.map(scholarship => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Scholarship Card Component
function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{scholarship.name}</CardTitle>
            <CardDescription>
              Provider: {scholarship.provider}
            </CardDescription>
          </div>
          <Badge variant="outline">{scholarship.amount}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{scholarship.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-xs text-muted-foreground mb-1">Eligibility:</p>
            <p>{scholarship.eligibility}</p>
          </div>
          <div>
            <p className="font-medium text-xs text-muted-foreground mb-1">Application Process:</p>
            <p>{scholarship.applicationProcess}</p>
          </div>
          <div>
            <p className="font-medium text-xs text-muted-foreground mb-1">Deadline:</p>
            <p>{scholarship.deadline}</p>
          </div>
          {scholarship.successRate && (
            <div>
              <p className="font-medium text-xs text-muted-foreground mb-1">Success Rate:</p>
              <p>{scholarship.successRate}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 