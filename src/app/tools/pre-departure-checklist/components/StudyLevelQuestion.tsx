import { GraduationCap, School, Trophy, Users } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface StudyLevelQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const studyLevelOptions = [
  {
    label: "Bachelors",
    sublabel: "Undergraduate degree",
    icon: <GraduationCap className="w-5 h-5" />,
    value: "bachelors"
  },
  {
    label: "Masters",
    sublabel: "Postgraduate degree",
    icon: <School className="w-5 h-5" />,
    value: "masters"
  },
  {
    label: "PhD",
    sublabel: "Doctoral degree",
    icon: <Trophy className="w-5 h-5" />,
    value: "phd"
  },
  {
    label: "Professional",
    sublabel: "Certificate or diploma",
    icon: <Users className="w-5 h-5" />,
    value: "professional"
  }
]

export function StudyLevelQuestion({
  value,
  onChange,
  isActive
}: StudyLevelQuestionProps) {
  return (
    <QuestionCard
      title="What level will you be studying?"
      description="We'll customize your pre-departure checklist based on your study level."
      progress={33}
      isActive={isActive}
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