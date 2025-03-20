'use client'

import { University, AdmissionRequirement } from '@/types/university'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  GraduationCap, 
  BarChart, 
  FileText, 
  Check, 
  AlertCircle, 
  Lightbulb,
  Sparkles 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface UniversityAdmissionsProps {
  university: University
}

export function UniversityAdmissions({ university }: UniversityAdmissionsProps) {
  // Group requirements by type
  const academicRequirements = university.admissionRequirements.filter(
    req => req.type === 'Academic'
  )
  
  const languageRequirements = university.admissionRequirements.filter(
    req => req.type === 'Language'
  )
  
  const documentRequirements = university.admissionRequirements.filter(
    req => req.type === 'Documents'
  )
  
  const otherRequirements = university.admissionRequirements.filter(
    req => req.type === 'Other'
  )

  return (
    <div className="flex flex-col gap-8">
      {/* Introduction section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Admission Requirements</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Below you'll find detailed information about the admission requirements for {university.name}. 
            These requirements can vary based on the program and degree level, so make sure to check the 
            specific program details as well.
          </p>
        </div>
      </section>

      {/* Success rate callout */}
      <section>
        <Alert className="bg-primary/10 border-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary">Qogent Success Rate</AlertTitle>
          <AlertDescription>
            <div className="flex flex-col gap-1 mt-1">
              <p>Students applying through Qogent have a <strong>{university.qogentMetrics.admissionSuccessRate}</strong> success rate at {university.name}.</p>
              <p className="text-sm">We've helped <strong>{university.qogentMetrics.studentsPlaced}</strong> students get accepted at this university.</p>
            </div>
          </AlertDescription>
        </Alert>
      </section>

      {/* Requirements tabs */}
      <section>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="academic" className="flex flex-col gap-1 h-auto py-3">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex flex-col gap-1 h-auto py-3">
              <BarChart className="h-4 w-4" />
              <span className="text-xs">Language</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex flex-col gap-1 h-auto py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex flex-col gap-1 h-auto py-3">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs">Other</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic" className="border-0 p-0">
            <RequirementList 
              title="Academic Requirements" 
              description="Educational qualifications needed for admission"
              requirements={academicRequirements}
              icon={<GraduationCap className="h-5 w-5 text-primary" />}
            />
          </TabsContent>
          
          <TabsContent value="language" className="border-0 p-0">
            <RequirementList 
              title="Language Requirements" 
              description="English or other language proficiency tests required"
              requirements={languageRequirements}
              icon={<BarChart className="h-5 w-5 text-primary" />}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="border-0 p-0">
            <RequirementList 
              title="Document Requirements" 
              description="Documentation needed for your application"
              requirements={documentRequirements}
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
          </TabsContent>
          
          <TabsContent value="other" className="border-0 p-0">
            <RequirementList 
              title="Other Requirements" 
              description="Additional requirements for specific programs"
              requirements={otherRequirements}
              icon={<AlertCircle className="h-5 w-5 text-primary" />}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Application process */}
      <section className="mt-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Application Process</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to apply to {university.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                  1
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-medium">Review Program Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure you meet all the academic, language and other requirements for your chosen program.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                  2
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-medium">Prepare Your Documents</h4>
                  <p className="text-sm text-muted-foreground">
                    Gather all required documents, including transcripts, language test results, CV/resume, and recommendation letters.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                  3
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-medium">Submit Your Application</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete the online application form on the university's website and pay the application fee ({university.costs.applicationFee || "varies by program"}).
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                  4
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-medium">Wait for Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    The university will review your application and may request additional information if needed.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                  5
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-medium">Receive Admission Decision</h4>
                  <p className="text-sm text-muted-foreground">
                    If accepted, you'll receive an official offer of admission. Review the terms and accept the offer before the deadline.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1">
                Apply with Qogent
              </Button>
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <a href={university.website + "/admissions"} target="_blank" rel="noopener noreferrer">
                  Visit University Admissions Page
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

interface RequirementListProps {
  title: string
  description: string
  requirements: AdmissionRequirement[]
  icon: React.ReactNode
}

function RequirementList({ 
  title, 
  description, 
  requirements,
  icon
}: RequirementListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {requirements.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            No specific {title.toLowerCase()} have been listed. Please check the university's website for the most up-to-date information.
          </p>
        ) : (
          <ul className="space-y-6">
            {requirements.map((req, index) => (
              <li key={index} className="space-y-2">
                <div className="text-sm font-medium">{req.description}</div>
                {req.qogentInsight && (
                  <div className="flex items-start gap-2 bg-primary/5 p-3 rounded-md">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-xs text-primary-foreground">
                      <Badge variant="outline" className="mb-1 text-[10px] bg-primary/20">
                        Qogent Insight
                      </Badge>
                      <p>{req.qogentInsight}</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
} 