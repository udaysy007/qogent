import { Book, Code, Beaker, HeartPulse, Landmark, Palette, Ruler } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface FieldOfStudyQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const fieldOfStudyOptions = [
  {
    label: "Engineering",
    sublabel: "Computer Science, Mechanical, Civil, etc.",
    icon: <Code className="w-5 h-5" />,
    value: "engineering"
  },
  {
    label: "Sciences",
    sublabel: "Physics, Chemistry, Biology, etc.",
    icon: <Beaker className="w-5 h-5" />,
    value: "sciences"
  },
  {
    label: "Medical",
    sublabel: "Medicine, Dentistry, Nursing, etc.",
    icon: <HeartPulse className="w-5 h-5" />,
    value: "medical"
  },
  {
    label: "Business",
    sublabel: "Management, Finance, Economics, etc.",
    icon: <Landmark className="w-5 h-5" />,
    value: "business"
  },
  {
    label: "Arts",
    sublabel: "Fine Arts, Design, Music, etc.",
    icon: <Palette className="w-5 h-5" />,
    value: "arts"
  },
  {
    label: "Architecture",
    sublabel: "Architecture, Urban Planning, etc.",
    icon: <Ruler className="w-5 h-5" />,
    value: "architecture"
  }
]

export function FieldOfStudyQuestion({
  value,
  onChange,
  isActive
}: FieldOfStudyQuestionProps) {
  return (
    <QuestionCard
      title="What field would you like to study?"
      description="Select your field of study to check specific program requirements."
      progress={75}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fieldOfStudyOptions.map((option) => (
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