import { GraduationCap } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface StudyLevelQuestionProps {
  value?: string
  onChange: (value: string) => void
  isActive: boolean
}

const studyLevelOptions = [
  {
    value: "bachelors",
    label: "Bachelor's Degree",
    sublabel: "3-4 years undergraduate program",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    value: "masters",
    label: "Master's Degree",
    sublabel: "1-2 years postgraduate program",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    value: "phd",
    label: "PhD",
    sublabel: "3-5 years doctoral program",
    icon: <GraduationCap className="w-5 h-5" />,
  }
]

export function StudyLevelQuestion({ value, onChange, isActive }: StudyLevelQuestionProps) {
  return (
    <QuestionCard
      isActive={isActive}
      icon={<GraduationCap className="h-6 w-6" />}
      title="What level do you want to study at?"
      description="Choose your intended study level to get relevant timeline information."
      progress={50}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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