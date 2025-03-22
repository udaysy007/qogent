import { Code, GraduationCap, Stethoscope, Beaker, Palette, Users, Wrench } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"
import { LucideIcon } from "lucide-react"

interface FieldOfStudyQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

interface FieldOption {
  label: string
  sublabel: string
  icon: React.ReactNode
  value: string
}

const fieldOptions: FieldOption[] = [
  {
    label: "Computer Science & IT",
    sublabel: "Software, Data Science, Cybersecurity",
    icon: <Code className="h-5 w-5" />,
    value: "tech"
  },
  {
    label: "Business & Management",
    sublabel: "Finance, Marketing, MBA",
    icon: <GraduationCap className="h-5 w-5" />,
    value: "business"
  },
  {
    label: "Healthcare & Medicine",
    sublabel: "Medical, Nursing, Public Health",
    icon: <Stethoscope className="h-5 w-5" />,
    value: "healthcare"
  },
  {
    label: "Sciences",
    sublabel: "Physics, Chemistry, Biology",
    icon: <Beaker className="h-5 w-5" />,
    value: "sciences"
  },
  {
    label: "Arts & Design",
    sublabel: "Digital Design, Fine Arts, Media",
    icon: <Palette className="h-5 w-5" />,
    value: "arts"
  },
  {
    label: "Social Sciences",
    sublabel: "Psychology, Sociology, Education",
    icon: <Users className="h-5 w-5" />,
    value: "social"
  },
  {
    label: "Engineering",
    sublabel: "Mechanical, Civil, Electrical",
    icon: <Wrench className="h-5 w-5" />,
    value: "engineering"
  }
]

export function FieldOfStudyQuestion({
  value,
  onChange,
  isActive
}: FieldOfStudyQuestionProps) {
  return (
    <QuestionCard
      title="What is your field of study?"
      description="Select the field that best matches your academic background or interests"
      progress={20}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fieldOptions.map((option) => (
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