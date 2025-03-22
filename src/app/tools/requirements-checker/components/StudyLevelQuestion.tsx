import { GraduationCap, BookOpen, Microscope } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface StudyLevelQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const studyLevelOptions = [
  {
    label: "Bachelor's Degree",
    sublabel: "First university degree (3-4 years)",
    icon: <BookOpen className="w-5 h-5" />,
    value: "bachelors",
    requirements: "High school diploma, language tests"
  },
  {
    label: "Master's Degree",
    sublabel: "Advanced degree (1-2 years)",
    icon: <GraduationCap className="w-5 h-5" />,
    value: "masters",
    requirements: "Bachelor's degree, possible work experience"
  },
  {
    label: "PhD",
    sublabel: "Research doctorate (3+ years)",
    icon: <Microscope className="w-5 h-5" />,
    value: "phd",
    requirements: "Master's degree, research proposal"
  }
]

export function StudyLevelQuestion({
  value,
  onChange,
  isActive
}: StudyLevelQuestionProps) {
  return (
    <QuestionCard
      title="What level do you want to study?"
      description="Your study level determines specific admission requirements, language proficiency needs, and documentation."
      progress={25}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {studyLevelOptions.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            icon={option.icon}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </QuestionCard>
  )
} 