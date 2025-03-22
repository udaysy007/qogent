import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, CheckCircle2, AlertCircle, Search, Calculator } from "lucide-react"

interface ChecklistResultsProps {
  answers: {
    studyLevel: string
    country: string
    university: string
  }
  onReset: () => void
}

interface DocumentItem {
  name: string
  description: string
  required: boolean
  category: string
}

function getUniversitySpecificDocuments(universityStatus: string): DocumentItem[] {
  switch (universityStatus) {
    case "selected":
      return [
        {
          name: "University Acceptance Letter",
          description: "Official acceptance letter from your chosen university",
          required: true,
          category: "Academic"
        },
        {
          name: "Application Essays",
          description: "Statement of purpose, personal statement, or motivation letter",
          required: true,
          category: "Academic"
        },
        {
          name: "Reference Letters",
          description: "Academic or professional references as required",
          required: true,
          category: "Academic"
        }
      ]
    
    case "exploring":
      return [
        {
          name: "University Research Portfolio",
          description: "Document comparing potential universities (programs, requirements, deadlines)",
          required: true,
          category: "Planning"
        },
        {
          name: "Academic Eligibility Check",
          description: "Verify your qualifications match university requirements",
          required: true,
          category: "Planning"
        },
        {
          name: "Application Timeline",
          description: "Schedule of application deadlines for potential universities",
          required: true,
          category: "Planning"
        }
      ]
    
    case "multiple":
      return [
        {
          name: "Application Tracking Sheet",
          description: "Spreadsheet tracking different university requirements and deadlines",
          required: true,
          category: "Planning"
        },
        {
          name: "Multiple Sets of Essays",
          description: "Different versions of personal statements/SOPs for each university",
          required: true,
          category: "Academic"
        },
        {
          name: "Reference Letter Copies",
          description: "Multiple copies of reference letters (some universities require direct submission)",
          required: true,
          category: "Academic"
        },
        {
          name: "Application Fee Budget",
          description: "Plan for multiple application fees and document translation costs",
          required: true,
          category: "Financial"
        }
      ]
    
    default:
      return []
  }
}

export function ChecklistResults({ answers, onReset }: ChecklistResultsProps) {
  // Helper function to get documents based on study level and country
  const getDocuments = (): DocumentItem[] => {
    const documents: DocumentItem[] = [
      // Identity Documents - Common for all countries
      {
        name: "Valid Passport",
        description: "Must be valid for at least 6 months beyond your planned stay",
        required: true,
        category: "Identity"
      },
      {
        name: "Passport-Size Photos",
        description: "Recent biometric photos meeting country specifications",
        required: true,
        category: "Identity"
      },
      {
        name: "Birth Certificate",
        description: "Original or certified copy with translation if needed",
        required: true,
        category: "Identity"
      },

      // Academic Documents - Common for all
      {
        name: "Academic Transcripts",
        description: "Official transcripts from all previous education institutions",
        required: true,
        category: "Academic"
      },
      {
        name: "Standardized Test Scores",
        description: "SAT/ACT for undergraduate, GRE/GMAT for graduate programs (if required)",
        required: false,
        category: "Academic"
      }
    ]

    // Add study level specific documents
    if (answers.studyLevel === "masters" || answers.studyLevel === "phd") {
      documents.push(
        {
          name: "Bachelor's Degree Certificate",
          description: "Original degree certificate with certified translation",
          required: true,
          category: "Academic"
        },
        {
          name: "CV/Resume",
          description: "Updated curriculum vitae highlighting academic and professional achievements",
          required: true,
          category: "Academic"
        }
      )
    }

    if (answers.studyLevel === "phd") {
      documents.push(
        {
          name: "Master's Degree Certificate",
          description: "Original degree certificate with certified translation",
          required: true,
          category: "Academic"
        },
        {
          name: "Research Proposal",
          description: "Detailed proposal of your research plans",
          required: true,
          category: "Academic"
        },
        {
          name: "Publications",
          description: "Copies of any academic publications or research papers",
          required: false,
          category: "Academic"
        }
      )
    }

    // Add country specific documents
    switch (answers.country) {
      case "germany":
        documents.push(
          {
            name: "German Language Certificate",
            description: "TestDaF/DSH for German-taught programs, or IELTS/TOEFL for English-taught programs",
            required: true,
            category: "Language"
          },
          {
            name: "Blocked Account",
            description: "Proof of financial means (€11,208 for 2024) through a blocked account",
            required: true,
            category: "Financial"
          },
          {
            name: "Health Insurance",
            description: "German statutory health insurance or equivalent private coverage",
            required: true,
            category: "Insurance & Health"
          },
          {
            name: "APS Certificate",
            description: "For students from certain countries (e.g., India, China, Vietnam)",
            required: false,
            category: "Academic"
          }
        )
        break

      case "ireland":
        documents.push(
          {
            name: "English Language Certificate",
            description: "IELTS (min. 6.5) or equivalent TOEFL/PTE scores",
            required: true,
            category: "Language"
          },
          {
            name: "Proof of Funds",
            description: "Bank statement showing sufficient funds (€10,000 + first year tuition)",
            required: true,
            category: "Financial"
          },
          {
            name: "Private Health Insurance",
            description: "Comprehensive health insurance coverage",
            required: true,
            category: "Insurance & Health"
          }
        )
        break

      case "uk":
        documents.push(
          {
            name: "English Language Certificate",
            description: "IELTS UKVI or equivalent approved test",
            required: true,
            category: "Language"
          },
          {
            name: "Financial Documents",
            description: "Proof of funds for tuition and living costs",
            required: true,
            category: "Financial"
          },
          {
            name: "TB Test Certificate",
            description: "If you're from a listed country",
            required: false,
            category: "Insurance & Health"
          },
          {
            name: "CAS Statement",
            description: "Confirmation of Acceptance for Studies from your university",
            required: true,
            category: "Academic"
          }
        )
        break

      case "netherlands":
        documents.push(
          {
            name: "English/Dutch Language Certificate",
            description: "IELTS/TOEFL for English programs, NT2 for Dutch programs",
            required: true,
            category: "Language"
          },
          {
            name: "Proof of Sufficient Funds",
            description: "€11,000+ for living expenses (2024 requirement)",
            required: true,
            category: "Financial"
          },
          {
            name: "Nuffic Certificate",
            description: "For Chinese students (Nuffic Certificate)",
            required: false,
            category: "Academic"
          }
        )
        break

      case "poland":
        documents.push(
          {
            name: "Language Certificate",
            description: "English (IELTS/TOEFL) or Polish language proficiency",
            required: true,
            category: "Language"
          },
          {
            name: "Bank Statement",
            description: "Proof of funds for tuition and living expenses",
            required: true,
            category: "Financial"
          },
          {
            name: "Health Insurance",
            description: "European Health Insurance Card or private insurance",
            required: true,
            category: "Insurance & Health"
          }
        )
        break

      case "france":
        documents.push(
          {
            name: "Language Certificate",
            description: "DELF/DALF for French programs, IELTS/TOEFL for English programs",
            required: true,
            category: "Language"
          },
          {
            name: "Proof of Income",
            description: "€615 per month minimum financial guarantee",
            required: true,
            category: "Financial"
          },
          {
            name: "Campus France Authorization",
            description: "Approval from Campus France",
            required: true,
            category: "Academic"
          }
        )
        break

      case "italy":
        documents.push(
          {
            name: "Language Certificate",
            description: "Italian (CELI/CILS) or English proficiency",
            required: true,
            category: "Language"
          },
          {
            name: "Declaration of Value",
            description: "Dichiarazione di Valore of previous qualifications",
            required: true,
            category: "Academic"
          },
          {
            name: "Financial Guarantee",
            description: "Proof of sufficient funds for study period",
            required: true,
            category: "Financial"
          }
        )
        break

      case "australia":
        documents.push(
          {
            name: "English Language Certificate",
            description: "IELTS, TOEFL, PTE, or CAE with required scores",
            required: true,
            category: "Language"
          },
          {
            name: "Financial Documents",
            description: "Proof of funds for tuition, living costs, and return travel",
            required: true,
            category: "Financial"
          },
          {
            name: "GTE Statement",
            description: "Genuine Temporary Entrant statement",
            required: true,
            category: "Visa"
          },
          {
            name: "OSHC",
            description: "Overseas Student Health Cover",
            required: true,
            category: "Insurance & Health"
          }
        )
        break

      case "canada":
        documents.push(
          {
            name: "Language Test Results",
            description: "IELTS/TOEFL for English, TEF for French programs",
            required: true,
            category: "Language"
          },
          {
            name: "Proof of Funds",
            description: "Tuition fees plus CAD 10,000 for living expenses",
            required: true,
            category: "Financial"
          },
          {
            name: "Police Certificate",
            description: "Criminal record check from your country",
            required: false,
            category: "Identity"
          },
          {
            name: "Study Plan",
            description: "Detailed explanation of your study plans in Canada",
            required: true,
            category: "Academic"
          }
        )
        break

      case "usa":
        documents.push(
          {
            name: "English Proficiency",
            description: "TOEFL/IELTS scores meeting university requirements",
            required: true,
            category: "Language"
          },
          {
            name: "Financial Documents",
            description: "Bank statements, affidavit of support, scholarship letters",
            required: true,
            category: "Financial"
          },
          {
            name: "I-20 Form",
            description: "Certificate of Eligibility for Nonimmigrant Student Status",
            required: true,
            category: "Visa"
          },
          {
            name: "SEVIS Fee Receipt",
            description: "Payment confirmation for SEVIS fee",
            required: true,
            category: "Financial"
          }
        )
        break

      case "japan":
        documents.push(
          {
            name: "Language Certificate",
            description: "JLPT for Japanese programs, IELTS/TOEFL for English programs",
            required: true,
            category: "Language"
          },
          {
            name: "Financial Documents",
            description: "Bank statements showing sufficient funds for stay",
            required: true,
            category: "Financial"
          },
          {
            name: "Certificate of Eligibility",
            description: "COE from Japanese immigration",
            required: true,
            category: "Visa"
          }
        )
        break

      case "singapore":
        documents.push(
          {
            name: "English Proficiency",
            description: "IELTS/TOEFL scores if required",
            required: true,
            category: "Language"
          },
          {
            name: "Financial Proof",
            description: "Proof of ability to pay tuition and living expenses",
            required: true,
            category: "Financial"
          },
          {
            name: "Student's Pass Application",
            description: "Required for studying in Singapore",
            required: true,
            category: "Visa"
          }
        )
        break
    }

    // Add university status specific documents
    const universityDocs = getUniversitySpecificDocuments(answers.university)
    documents.push(...universityDocs)

    // Add recommendations based on university status
    if (answers.university === "exploring" || answers.university === "multiple") {
      documents.push(
        {
          name: "University Finder Tool",
          description: "Compare and find universities based on your preferences",
          required: false,
          category: "Resources"
        },
        {
          name: "Cost Calculator",
          description: "Calculate and compare estimated costs of studying abroad",
          required: false,
          category: "Resources"
        }
      )
    }

    return documents
  }

  const documents = getDocuments()
  const categories = Array.from(new Set(documents.map(doc => doc.category)))

  // Add a helper message based on university status
  const getHelperMessage = () => {
    switch (answers.university) {
      case "exploring":
        return "Since you're still exploring universities, we've included planning documents and tools to help you make an informed decision. Use our university finder to narrow down your options."
      case "multiple":
        return "We've included documents and planning tools to help you manage multiple university applications. Use our cost calculator to compare expenses across universities."
      default:
        return "Here's what you'll need for your study abroad journey"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] w-full px-4 py-12"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold"
          >
            Your Document Checklist
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground"
          >
            {getHelperMessage()}
          </motion.p>
        </div>

        {/* Document Categories */}
        <div className="grid gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid gap-4">
                {documents
                  .filter(doc => doc.category === category)
                  .map((doc, docIndex) => (
                    <Card key={doc.name} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {doc.required ? (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{doc.name}</h3>
                            <Badge variant={doc.required ? "default" : "secondary"}>
                              {doc.required ? "Required" : "Recommended"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show additional help message for exploring/multiple applications */}
        {(answers.university === "exploring" || answers.university === "multiple") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-muted/50 rounded-lg p-6 mt-8"
          >
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Use our university finder to discover and compare universities based on your preferences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="outline"
                className="gap-2"
              >
                <a href="/tools/university-finder">
                  <Search className="w-4 h-4" />
                  Find Universities
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="gap-2"
              >
                <a href="/tools/cost-calculator">
                  <Calculator className="w-4 h-4" />
                  Calculate Costs
                </a>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 pt-8"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </Button>
          <Button
            size="lg"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Checklist
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
} 