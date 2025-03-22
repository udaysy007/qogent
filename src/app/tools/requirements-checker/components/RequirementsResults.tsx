import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface RequirementsResultsProps {
  answers: {
    studyLevel: string
    country: string
    fieldOfStudy: string
    universityStatus: string
  }
  onReset: () => void
}

interface Requirement {
  title: string
  description: string
  priority: "required" | "recommended"
  qogentInsight?: string
}

interface RequirementCategory {
  title: string
  description: string
  requirements: Requirement[]
}

const getRequirements = (studyLevel: string, country: string, fieldOfStudy: string, universityStatus: string): RequirementCategory[] => {
  const baseRequirements: RequirementCategory[] = [
    {
      title: "Academic Requirements",
      description: "Educational qualifications and academic achievements needed",
      requirements: [
        {
          title: "Previous Education",
          description: studyLevel === "bachelors" 
            ? "Completed secondary education with good academic standing"
            : studyLevel === "masters"
            ? "Bachelor's degree in a relevant field"
            : "Master's degree in a relevant field",
          priority: "required"
        },
        {
          title: "Academic Transcripts",
          description: "Official transcripts from all previous educational institutions",
          priority: "required"
        },
        {
          title: "GPA Requirement",
          description: "Minimum GPA of 2.5 on a 4.0 scale or equivalent",
          priority: "required",
          qogentInsight: "Some universities may have higher GPA requirements. Check specific university requirements."
        }
      ]
    },
    {
      title: "Language Requirements",
      description: "Language proficiency requirements for your program",
      requirements: [
        {
          title: country === "germany" ? "German/English Proficiency" : "English Proficiency",
          description: country === "germany"
            ? "TestDaF/DSH for German programs, or IELTS/TOEFL for English programs"
            : "IELTS (6.5+) or TOEFL (80+) scores",
          priority: "required"
        },
        {
          title: "Language Certificate Validity",
          description: "Test scores must be less than 2 years old",
          priority: "required"
        }
      ]
    }
  ]

  // Add field-specific requirements
  switch (fieldOfStudy) {
    case "engineering":
      baseRequirements[0].requirements.push(
        {
          title: "Mathematics Background",
          description: "Strong foundation in mathematics and physics",
          priority: "required"
        },
        {
          title: "Technical Skills",
          description: "Programming knowledge for computer science/IT programs",
          priority: "recommended"
        }
      )
      break;
    case "sciences":
      baseRequirements[0].requirements.push(
        {
          title: "Science Foundation",
          description: "Strong background in relevant science subjects",
          priority: "required"
        },
        {
          title: "Laboratory Experience",
          description: "Previous laboratory work or research experience",
          priority: "recommended"
        }
      )
      break;
    case "medical":
      baseRequirements[0].requirements.push(
        {
          title: "Science Prerequisites",
          description: "Strong background in biology and chemistry",
          priority: "required"
        },
        {
          title: "Healthcare Experience",
          description: "Relevant volunteer or work experience in healthcare",
          priority: "recommended"
        }
      )
      break;
    case "business":
      baseRequirements[0].requirements.push(
        {
          title: "GMAT/GRE",
          description: "Required for most MBA and graduate business programs",
          priority: studyLevel === "masters" ? "required" : "recommended"
        },
        {
          title: "Work Experience",
          description: "2-3 years of professional experience for MBA programs",
          priority: "recommended"
        }
      )
      break;
    case "arts":
      baseRequirements[0].requirements.push(
        {
          title: "Portfolio",
          description: "Collection of your artistic work or design projects",
          priority: "required"
        },
        {
          title: "Creative Skills",
          description: "Demonstrated artistic ability and creativity",
          priority: "required"
        }
      )
      break;
    case "social":
      baseRequirements[0].requirements.push(
        {
          title: "Research Skills",
          description: "Basic understanding of research methods",
          priority: "required"
        },
        {
          title: "Writing Sample",
          description: "Academic writing sample demonstrating analytical skills",
          priority: studyLevel === "bachelors" ? "recommended" : "required"
        }
      )
      break;
    case "architecture":
      baseRequirements[0].requirements.push(
        {
          title: "Design Portfolio",
          description: "Portfolio showcasing architectural/design projects",
          priority: "required"
        },
        {
          title: "Technical Knowledge",
          description: "Understanding of architectural principles and CAD software",
          priority: "required"
        }
      )
      break;
  }

  // Add country-specific requirements
  switch (country) {
    case "germany":
      baseRequirements.push({
        title: "Financial Requirements",
        description: "Proof of financial resources for studying in Germany",
        requirements: [
          {
            title: "Blocked Account",
            description: "€11,208 in a blocked account (2024 requirement)",
            priority: "required"
          },
          {
            title: "Bank Statements",
            description: "Recent bank statements showing financial stability",
            priority: "required"
          }
        ]
      })
      break;
    case "ireland":
      baseRequirements.push({
        title: "Financial Requirements",
        description: "Financial proof for studying in Ireland",
        requirements: [
          {
            title: "Proof of Funds",
            description: "€10,000 + first year tuition fees",
            priority: "required"
          },
          {
            title: "Health Insurance",
            description: "Private health insurance coverage",
            priority: "required"
          }
        ]
      })
      break;
  }

  // Add university status specific requirements
  if (universityStatus === "selected") {
    baseRequirements.push({
      title: "University-Specific Requirements",
      description: "Additional requirements for your chosen university",
      requirements: [
        {
          title: "Letter of Motivation",
          description: "Tailored statement of purpose for your chosen program",
          priority: "required"
        },
        {
          title: "Reference Letters",
          description: "2-3 academic or professional references",
          priority: "required"
        }
      ]
    })
  } else if (universityStatus === "exploring") {
    baseRequirements.push({
      title: "Application Planning",
      description: "Requirements for university research and selection",
      requirements: [
        {
          title: "University Research",
          description: "Compare programs, requirements, and deadlines",
          priority: "recommended",
          qogentInsight: "Use our University Finder tool to compare universities and programs."
        },
        {
          title: "Application Timeline",
          description: "Plan your application timeline and deadlines",
          priority: "recommended"
        }
      ]
    })
  } else if (universityStatus === "multiple") {
    baseRequirements.push({
      title: "Multiple Applications Management",
      description: "Requirements for managing multiple university applications",
      requirements: [
        {
          title: "Application Tracking",
          description: "System to track different application requirements and deadlines",
          priority: "required",
          qogentInsight: "Consider creating a spreadsheet to track application status and requirements for each university."
        },
        {
          title: "Generic Documents",
          description: "Prepare generic versions of common application documents",
          priority: "recommended"
        },
        {
          title: "Budget Planning",
          description: "Plan for multiple application fees and document preparation costs",
          priority: "required"
        }
      ]
    })
  }

  return baseRequirements
}

export function RequirementsResults({
  answers,
  onReset
}: RequirementsResultsProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const requirements = getRequirements(answers.studyLevel, answers.country, answers.fieldOfStudy, answers.universityStatus)

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto space-y-8 px-4 py-12"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold tracking-tight"
          >
            Your Requirements Summary
          </motion.h2>
          <Button
            variant="outline"
            onClick={onReset}
            className="ml-4"
          >
            Start Over
          </Button>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground"
        >
          Based on your selections: {answers.studyLevel} level studies in {answers.fieldOfStudy} field in {answers.country}.
          Here are the requirements you need to fulfill.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        {requirements.map((category, index) => (
          <Card key={category.title} className="overflow-hidden">
            <Button
              variant="ghost"
              className="w-full px-8 py-8 flex items-center justify-between hover:bg-accent/50"
              onClick={() => toggleCategory(category.title)}
            >
              <div className="text-left">
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
              {expandedCategories.includes(category.title) ? (
                <ChevronUp className="w-6 h-6 ml-4" />
              ) : (
                <ChevronDown className="w-6 h-6 ml-4" />
              )}
            </Button>

            {expandedCategories.includes(category.title) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t"
              >
                <div className="px-8 py-10 space-y-6">
                  {category.requirements.map((req, reqIndex) => (
                    <div
                      key={req.title}
                      className={cn(
                        "flex items-start gap-6 p-6 rounded-xl",
                        req.priority === "required" ? "bg-destructive/10" : "bg-success/10"
                      )}
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-medium">{req.title}</h4>
                          <Badge variant={req.priority === "required" ? "destructive" : "secondary"}>
                            {req.priority.charAt(0).toUpperCase() + req.priority.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-base text-muted-foreground">{req.description}</p>
                        {req.qogentInsight && (
                          <div className="flex items-start gap-2 bg-primary/10 p-4 rounded-lg mt-3">
                            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground">{req.qogentInsight}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {req.priority === "required" ? (
                          <CheckCircle2 className="w-6 h-6 text-destructive" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-success" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
} 