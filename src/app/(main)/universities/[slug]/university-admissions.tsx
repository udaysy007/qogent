'use client'

import { AdmissionRequirement } from '@/types/university'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FileText, Globe, Info, MessageSquare } from 'lucide-react'

interface UniversityAdmissionsProps {
  admissionRequirements: AdmissionRequirement[]
}

export function UniversityAdmissions({ admissionRequirements }: UniversityAdmissionsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Admission Requirements</h2>
        <p className="text-muted-foreground mb-6">
          Below are the admission requirements. These requirements
          may vary by program, so always check the specific program page for detailed information.
        </p>
        
        <div className="space-y-6">
          {admissionRequirements.map(req => (
            <RequirementCard key={req.id} requirement={req} />
          ))}
          
          {admissionRequirements.length === 0 && (
            <div className="text-center p-8 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">No admission requirements listed yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {admissionRequirements.some(req => req.qogentInsight) && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Qogent Insights</h3>
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Insider Tips for Admission Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {admissionRequirements
                  .filter(req => req.qogentInsight)
                  .map((req, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">•</span>
                      <p className="text-muted-foreground">{req.qogentInsight}</p>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Requirement Card Component
function RequirementCard({ requirement }: { requirement: AdmissionRequirement }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {requirement.type === 'Academic' && <BookOpen className="h-5 w-5 text-primary" />}
          {requirement.type === 'Language' && <Globe className="h-5 w-5 text-primary" />}
          {requirement.type === 'Documents' && <FileText className="h-5 w-5 text-primary" />}
          {requirement.type === 'Other' && <Info className="h-5 w-5 text-primary" />}
          {requirement.type} Requirements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{requirement.description}</p>
        
        {requirement.qogentInsight && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-md">
            <div className="flex gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-medium">Qogent Insight:</span> {requirement.qogentInsight}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 