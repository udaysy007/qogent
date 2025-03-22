"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Briefcase,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  LineChart,
  Lightbulb,
  RefreshCcw,
  MapPin,
  Users,
  Building2,
  Bookmark
} from "lucide-react"

interface CareerResultsProps {
  fieldOfStudy: string
  careerPriorities: string[]
  locationPreference: string
  workStyle: string
  industryPreferences: string[]
  onBack: () => void
}

interface CareerPath {
  title: string
  description: string
  matchScore: number
  salary: string
  growth: string
  requirements: string[]
  insights: string[]
}

// Helper function to get human-readable field of study name
const getFieldOfStudyName = (value: string): string => {
  const mapping: Record<string, string> = {
    tech: "Computer Science & IT",
    business: "Business & Management",
    healthcare: "Healthcare & Medicine",
    sciences: "Sciences",
    arts: "Arts & Design",
    social: "Social Sciences",
    engineering: "Engineering"
  }
  return mapping[value] || value
}

// Helper function to get human-readable priority name
const getPriorityName = (value: string): string => {
  const mapping: Record<string, string> = {
    salary: "High Salary",
    growth: "Growth Opportunities",
    security: "Job Security",
    balance: "Work-Life Balance",
    innovation: "Innovation",
    global: "Global Opportunities",
    impact: "Social Impact"
  }
  return mapping[value] || value
}

// Helper function to get human-readable location preference
const getLocationName = (value: string): string => {
  const mapping: Record<string, string> = {
    city: "Major City",
    international: "International",
    regional: "Regional",
    flexible: "Flexible"
  }
  return mapping[value] || value
}

// Helper function to get human-readable work style
const getWorkStyleName = (value: string): string => {
  const mapping: Record<string, string> = {
    office: "Office-Based",
    remote: "Remote",
    hybrid: "Hybrid",
    team: "Team-Based",
    flexible: "Flexible Hours"
  }
  return mapping[value] || value
}

// Helper function to get human-readable industry name
const getIndustryName = (value: string): string => {
  const mapping: Record<string, string> = {
    tech: "Technology",
    finance: "Finance",
    healthcare: "Healthcare",
    consulting: "Consulting",
    research: "Research",
    startups: "Startups",
    sustainability: "Sustainability",
    telecom: "Telecommunications"
  }
  return mapping[value] || value
}

export function CareerResults({
  fieldOfStudy,
  careerPriorities,
  locationPreference,
  workStyle,
  industryPreferences,
  onBack
}: CareerResultsProps) {
  const [expandedPath, setExpandedPath] = useState<string | null>(null)

  const getCareerPaths = (): CareerPath[] => {
    const paths: CareerPath[] = []
    
    // Technology & Computer Science paths
    if (fieldOfStudy === "tech") {
      if (industryPreferences.includes("tech")) {
        paths.push({
          title: "Software Engineer",
          description: "Design and develop software applications and systems",
          matchScore: 90,
          salary: "$80,000 - $150,000",
          growth: "25% (Much faster than average)",
          requirements: [
            "Bachelor's/Master's in Computer Science or related field",
            "Programming languages (Java, Python, JavaScript)",
            "Software development methodologies",
            "Problem-solving skills"
          ],
          insights: [
            "High demand across all industries",
            "Remote work opportunities abundant",
            "Continuous learning essential"
          ]
        })
      }
      if (industryPreferences.includes("finance")) {
        paths.push({
          title: "FinTech Developer",
          description: "Build financial technology solutions and platforms",
          matchScore: 85,
          salary: "$90,000 - $160,000",
          growth: "20% (Faster than average)",
          requirements: [
            "Computer Science or Finance degree",
            "Financial industry knowledge",
            "Security and compliance understanding",
            "Full-stack development skills"
          ],
          insights: [
            "Growing sector with fintech boom",
            "Combines tech and financial expertise",
            "High security standards required"
          ]
        })
      }
    }

    // Business paths
    if (fieldOfStudy === "business") {
      if (industryPreferences.includes("consulting")) {
        paths.push({
          title: "Management Consultant",
          description: "Advise organizations on business strategy and operations",
          matchScore: 88,
          salary: "$85,000 - $150,000",
          growth: "15% (Faster than average)",
          requirements: [
            "MBA or related business degree",
            "Strong analytical skills",
            "Industry expertise",
            "Project management experience"
          ],
          insights: [
            "High travel opportunities",
            "Diverse industry exposure",
            "Strong networking potential"
          ]
        })
      }
      if (industryPreferences.includes("finance")) {
        paths.push({
          title: "Financial Analyst",
          description: "Analyze financial data and market trends",
          matchScore: 85,
          salary: "$70,000 - $120,000",
          growth: "18% (Faster than average)",
          requirements: [
            "Finance or Business degree",
            "Financial modeling skills",
            "Data analysis expertise",
            "Industry certifications (CFA)"
          ],
          insights: [
            "Strong career progression",
            "Global opportunities",
            "Growing importance of tech skills"
          ]
        })
      }
    }

    // Healthcare paths
    if (fieldOfStudy === "healthcare") {
      paths.push({
        title: "Healthcare Administrator",
        description: "Manage healthcare facilities and programs",
        matchScore: 88,
        salary: "$75,000 - $130,000",
        growth: "28% (Much faster than average)",
        requirements: [
          "Healthcare Administration degree",
          "Healthcare regulations knowledge",
          "Management experience",
          "Communication skills"
        ],
        insights: [
          "Growing demand due to aging population",
          "Technology integration increasing",
          "Focus on patient care quality"
        ]
      })
      
      if (industryPreferences.includes("tech")) {
        paths.push({
          title: "Health Informatics Specialist",
          description: "Manage healthcare data systems and technology solutions",
          matchScore: 85,
          salary: "$80,000 - $135,000",
          growth: "20% (Faster than average)",
          requirements: [
            "Healthcare and IT background",
            "Electronic health records expertise",
            "Data analysis skills",
            "Understanding of healthcare regulations"
          ],
          insights: [
            "Rapidly growing field",
            "Bridges healthcare and technology",
            "Critical for modern healthcare systems"
          ]
        })
      }
    }

    // Engineering paths
    if (fieldOfStudy === "engineering") {
      if (industryPreferences.includes("tech")) {
        paths.push({
          title: "Systems Engineer",
          description: "Design and implement complex systems",
          matchScore: 88,
          salary: "$85,000 - $140,000",
          growth: "22% (Much faster than average)",
          requirements: [
            "Engineering degree",
            "Systems design experience",
            "Project management skills",
            "Technical expertise"
          ],
          insights: [
            "High demand in tech sector",
            "Growing IoT opportunities",
            "Cross-functional role"
          ]
        })
      }
      
      if (industryPreferences.includes("sustainability")) {
        paths.push({
          title: "Environmental Engineer",
          description: "Design solutions for environmental challenges",
          matchScore: 86,
          salary: "$75,000 - $130,000",
          growth: "15% (Faster than average)",
          requirements: [
            "Environmental Engineering degree",
            "Compliance knowledge",
            "Technical project skills",
            "Analytical abilities"
          ],
          insights: [
            "Growing importance with climate change",
            "Both public and private sector roles",
            "Combines technical and policy work"
          ]
        })
      }
    }

    // Science paths
    if (fieldOfStudy === "sciences") {
      if (industryPreferences.includes("research")) {
        paths.push({
          title: "Research Scientist",
          description: "Conduct research in specialized scientific fields",
          matchScore: 90,
          salary: "$75,000 - $130,000",
          growth: "16% (Faster than average)",
          requirements: [
            "Advanced degree in Sciences",
            "Research methodology expertise",
            "Analytical and problem-solving skills",
            "Technical writing abilities"
          ],
          insights: [
            "Academic and industry opportunities",
            "Publication and grant management important",
            "Specialization often required"
          ]
        })
      }
      
      if (industryPreferences.includes("tech")) {
        paths.push({
          title: "Data Scientist",
          description: "Analyze complex data to inform decisions",
          matchScore: 88,
          salary: "$90,000 - $160,000",
          growth: "30% (Much faster than average)",
          requirements: [
            "Degree in Statistics, Math, Computer Science",
            "Programming and machine learning",
            "Data visualization",
            "Statistical analysis"
          ],
          insights: [
            "One of the fastest growing fields",
            "High demand across industries",
            "Balanced technical and business focus"
          ]
        })
      }
    }

    // Arts paths
    if (fieldOfStudy === "arts") {
      if (industryPreferences.includes("tech")) {
        paths.push({
          title: "UX/UI Designer",
          description: "Design user interfaces and experiences for digital products",
          matchScore: 92,
          salary: "$75,000 - $120,000",
          growth: "23% (Much faster than average)",
          requirements: [
            "Design background",
            "User research skills",
            "Prototyping tools expertise",
            "Understanding of user psychology"
          ],
          insights: [
            "High demand in tech companies",
            "Balance of creativity and technical skills",
            "Remote work opportunities common"
          ]
        })
      }
    }

    // Social Sciences paths
    if (fieldOfStudy === "social") {
      if (industryPreferences.includes("consulting")) {
        paths.push({
          title: "Human Resources Specialist",
          description: "Manage employee relations and development",
          matchScore: 85,
          salary: "$65,000 - $110,000",
          growth: "10% (Average)",
          requirements: [
            "Degree in HR, Psychology, or related field",
            "Understanding of employment laws",
            "Communication skills",
            "Conflict resolution abilities"
          ],
          insights: [
            "Important across all industries",
            "Growing focus on employee experience",
            "Strategic role in company growth"
          ]
        })
      }
    }

    // Adjust match scores and insights based on all preferences
    paths.forEach(path => {
      let priorityScore = 0
      let workStyleScore = 0
      let locationScore = 0
      const newInsights: string[] = [...path.insights]

      // Career Priorities Impact
      careerPriorities.forEach(priority => {
        switch (priority) {
          case "salary":
            if (path.salary.includes("150,000") || path.salary.includes("160,000")) {
              priorityScore += 5
              newInsights.push("Aligns with your high salary priority")
            } else if (path.salary.includes("130,000") || path.salary.includes("140,000")) {
              priorityScore += 3
              newInsights.push("Good salary potential matching your priority")
            }
            break
          case "growth":
            if (path.growth.includes("Much faster")) {
              priorityScore += 5
              newInsights.push("Excellent career growth opportunities")
            } else if (path.growth.includes("Faster")) {
              priorityScore += 3
              newInsights.push("Good growth prospects in this field")
            }
            break
          case "security":
            if (path.growth.includes("Much faster")) {
              priorityScore += 5
              newInsights.push("High job security given the strong demand")
            } else if (path.growth.includes("Faster")) {
              priorityScore += 3
              newInsights.push("Solid job security in this field")
            }
            break
          case "balance":
            if (path.title.includes("Analyst") || path.title.includes("Specialist") || 
                workStyle === "remote" || workStyle === "flexible") {
              priorityScore += 4
              newInsights.push("Known for better work-life balance")
            }
            break
          case "innovation":
            if (path.title.includes("Developer") || path.title.includes("Engineer") || 
                path.title.includes("Scientist") || path.title.includes("Designer")) {
              priorityScore += 4
              newInsights.push("High innovation potential in this role")
            }
            break
          case "global":
            if (path.title.includes("Consultant") || path.title.includes("Analyst") || 
                locationPreference === "international") {
              priorityScore += 4
              newInsights.push("Strong global career opportunities")
            }
            break
          case "impact":
            if (path.title.includes("Healthcare") || path.title.includes("Environmental") || 
                path.title.includes("Human Resources") || industryPreferences.includes("sustainability")) {
              priorityScore += 4
              newInsights.push("High potential for positive social impact")
            }
            break
        }
      })

      // Work Style Impact
      switch (workStyle) {
        case "remote":
          if (path.title.includes("Developer") || path.title.includes("Designer") || 
              path.title.includes("Engineer") || path.title.includes("Analyst")) {
            workStyleScore += 5
            newInsights.push("Excellent remote work opportunities")
          } else {
            workStyleScore += 2
            newInsights.push("Some remote work possibilities")
          }
          break
        case "hybrid":
          if (path.title.includes("Specialist") || path.title.includes("Analyst") || 
              path.title.includes("Designer")) {
            workStyleScore += 5
            newInsights.push("Well-suited for hybrid work arrangements")
          } else {
            workStyleScore += 3
            newInsights.push("Hybrid work becoming more common")
          }
          break
        case "office":
          if (path.title.includes("Administrator") || path.title.includes("Consultant") || 
              path.title.includes("Manager")) {
            workStyleScore += 5
            newInsights.push("Traditional office environment common")
          }
          break
        case "team":
          if (path.title.includes("Consultant") || path.title.includes("Engineer") || 
              path.title.includes("Designer")) {
            workStyleScore += 5
            newInsights.push("Strong team collaboration focus")
          }
          break
        case "flexible":
          if (path.title.includes("Developer") || path.title.includes("Designer") || 
              path.title.includes("Analyst")) {
            workStyleScore += 5
            newInsights.push("Flexible working hours common")
          } else {
            workStyleScore += 2
            newInsights.push("Some flexibility in scheduling possible")
          }
          break
      }

      // Location Preference Impact
      switch (locationPreference) {
        case "international":
          if (path.title.includes("Consultant") || path.title.includes("Analyst") || 
              path.title.includes("Engineer") || careerPriorities.includes("global")) {
            locationScore += 5
            newInsights.push("Strong international career prospects")
          } else {
            locationScore += 2
            newInsights.push("Some international opportunities available")
          }
          break
        case "city":
          if (path.title.includes("Financial") || path.title.includes("Consultant") || 
              path.title.includes("Designer")) {
            locationScore += 5
            newInsights.push("Abundant opportunities in major cities")
          } else {
            locationScore += 3
            newInsights.push("Good presence in urban centers")
          }
          break
        case "flexible":
          if (path.title.includes("Developer") || path.title.includes("Designer") || 
              path.title.includes("Engineer") || workStyle === "remote") {
            locationScore += 5
            newInsights.push("Highly location-flexible career path")
          } else {
            locationScore += 2
            newInsights.push("Some location flexibility possible")
          }
          break
        case "regional":
          if (path.title.includes("Administrator") || path.title.includes("Specialist") || 
              path.title.includes("Environmental")) {
            locationScore += 5
            newInsights.push("Good regional employment prospects")
          } else {
            locationScore += 2
            newInsights.push("Some regional opportunities available")
          }
          break
      }

      // Additional adjustment for industry preferences
      industryPreferences.forEach(industry => {
        if (path.title.toLowerCase().includes(getIndustryName(industry).toLowerCase()) || 
            path.description.toLowerCase().includes(getIndustryName(industry).toLowerCase())) {
          path.matchScore += 5
          newInsights.push(`Aligns with your interest in ${getIndustryName(industry)}`)
        }
      })

      // Update final match score and insights
      path.matchScore = Math.min(100, path.matchScore + priorityScore + workStyleScore + locationScore)
      path.insights = Array.from(new Set(newInsights)) // Remove any duplicate insights
    })

    // Sort by match score
    return paths.sort((a, b) => b.matchScore - a.matchScore)
  }

  const careerPaths = getCareerPaths()

  const renderPreferencesSummary = () => {
    return (
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Career Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-medium">Field of Study:</span>
              <span className="text-muted-foreground">{getFieldOfStudyName(fieldOfStudy)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">Location Preference:</span>
              <span className="text-muted-foreground">{getLocationName(locationPreference)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              <span className="font-medium">Career Priorities:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {careerPriorities.map(priority => (
                <Badge key={priority} variant="outline">
                  {getPriorityName(priority)}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Work Style:</span>
              <span className="text-muted-foreground">{getWorkStyleName(workStyle)}</span>
            </div>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Industry Preferences:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {industryPreferences.map(industry => (
                <Badge key={industry} variant="outline">
                  {getIndustryName(industry)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Career Matches</h2>
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
      
      {renderPreferencesSummary()}

      <div className="grid gap-4">
        {careerPaths.map((path) => (
          <Card
            key={path.title}
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-l-4"
            style={{ borderLeftColor: `hsl(var(--${path.matchScore >= 90 ? 'primary' : 'secondary'}))` }}
            onClick={() => setExpandedPath(expandedPath === path.title ? null : path.title)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-semibold">{path.title}</h3>
                  <Badge className={path.matchScore >= 90 ? "bg-primary text-primary-foreground" : ""}>
                    {path.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">{path.description}</p>
              </div>
              {expandedPath === path.title ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            {expandedPath === path.title && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-muted/30 p-4 rounded-md">
                    <div className="flex items-center gap-2 text-primary">
                      <Briefcase className="h-5 w-5" />
                      <span className="font-medium">Salary Range</span>
                    </div>
                    <p>{path.salary}</p>
                  </div>
                  <div className="space-y-2 bg-muted/30 p-4 rounded-md">
                    <div className="flex items-center gap-2 text-primary">
                      <LineChart className="h-5 w-5" />
                      <span className="font-medium">Growth Outlook</span>
                    </div>
                    <p>{path.growth}</p>
                  </div>
                </div>

                <div className="space-y-2 bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-primary">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">Key Requirements</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {path.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-primary">
                    <Lightbulb className="h-5 w-5" />
                    <span className="font-medium">Career Insights</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {path.insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </Card>
        ))}
      </div>

      {careerPaths.length === 0 && (
        <Card className="p-6 text-center">
          <RefreshCcw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Exact Matches Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your preferences or exploring related fields
          </p>
          <Button onClick={onBack} variant="outline">
            Update Preferences
          </Button>
        </Card>
      )}
    </div>
  )
} 