import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FieldOfStudyQuestion } from "./FieldOfStudyQuestion"
import { CareerPrioritiesQuestion } from "./CareerPrioritiesQuestion"
import { LocationPreferencesQuestion } from "./LocationPreferencesQuestion"
import { WorkStyleQuestion } from "./WorkStyleQuestion"
import { IndustryPreferencesQuestion } from "./IndustryPreferencesQuestion"
import { CareerResults } from "./CareerResults"

// Total number of steps in the questionnaire
const TOTAL_STEPS = 5;

export function QuestionnaireContainer() {
  const [started, setStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState({
    fieldOfStudy: "",
    careerPriorities: [] as string[],
    locationPreference: "",
    workStyle: "",
    industryPreferences: [] as string[],
  })

  const updateAnswer = (field: keyof typeof answers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    
    // For the last question, show results
    if (field === "industryPreferences") {
      // For departure time selection, we'll show the results instead
      setTimeout(() => {
        setShowResults(true)
      }, 500)
    } else {
      // Auto advance to next question after a short delay
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 500)
    }
  }

  const resetQuestionnaire = () => {
    setAnswers({
      fieldOfStudy: "",
      careerPriorities: [],
      locationPreference: "",
      workStyle: "",
      industryPreferences: [],
    });
    setCurrentStep(0);
    setShowResults(false);
    setStarted(false);
  }

  if (!started) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-12"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Career Explorer 🎯
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            Discover potential career paths based on your study choices<br />
            and preferences. Get personalized recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => setStarted(true)}
              className="mt-8 text-lg px-8 py-6 rounded-full"
            >
              Start Now <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (showResults) {
    return (
      <CareerResults
        fieldOfStudy={answers.fieldOfStudy}
        careerPriorities={answers.careerPriorities}
        locationPreference={answers.locationPreference}
        workStyle={answers.workStyle}
        industryPreferences={answers.industryPreferences}
        onBack={resetQuestionnaire}
      />
    )
  }

  return (
    <div className="min-h-[80vh] w-full px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <FieldOfStudyQuestion
              key="field-of-study"
              value={answers.fieldOfStudy}
              onChange={(value) => updateAnswer("fieldOfStudy", value)}
              isActive={true}
            />
          )}
          
          {currentStep === 1 && (
            <CareerPrioritiesQuestion
              key="career-priorities"
              value={answers.careerPriorities}
              onChange={(value) => updateAnswer("careerPriorities", value)}
              isActive={true}
            />
          )}
          
          {currentStep === 2 && (
            <LocationPreferencesQuestion
              key="location"
              value={answers.locationPreference}
              onChange={(value) => updateAnswer("locationPreference", value)}
              isActive={true}
            />
          )}

          {currentStep === 3 && (
            <WorkStyleQuestion
              key="work-style"
              value={answers.workStyle}
              onChange={(value) => updateAnswer("workStyle", value)}
              isActive={true}
            />
          )}

          {currentStep === 4 && (
            <IndustryPreferencesQuestion
              key="industry"
              value={answers.industryPreferences}
              onChange={(value) => updateAnswer("industryPreferences", value)}
              isActive={true}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 