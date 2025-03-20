import { FC } from 'react';
import { 
  Cpu, 
  Building2, 
  Stethoscope, 
  Beaker, 
  Palette, 
  Users, 
  Leaf,
  Wrench
} from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { OptionButton } from './OptionButton';

interface FieldOfStudyQuestionProps {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const fieldOptions = [
  {
    label: 'Engineering',
    sublabel: 'Building the future',
    Icon: Wrench,
    value: 'Engineering'
  },
  {
    label: 'Computer Science',
    sublabel: 'Making tech magic',
    Icon: Cpu,
    value: 'Computer Science'
  },
  {
    label: 'Business',
    sublabel: 'Leading and innovating',
    Icon: Building2,
    value: 'Business'
  },
  {
    label: 'Medicine',
    sublabel: 'Helping people thrive',
    Icon: Stethoscope,
    value: 'Medicine'
  },
  {
    label: 'Natural Sciences',
    sublabel: 'Exploring our world',
    Icon: Beaker,
    value: 'Natural Sciences'
  },
  {
    label: 'Arts',
    sublabel: 'Creating and inspiring',
    Icon: Palette,
    value: 'Arts'
  },
  {
    label: 'Social Sciences',
    sublabel: 'Understanding society',
    Icon: Users,
    value: 'Social Sciences'
  },
  {
    label: 'Environmental',
    sublabel: 'Protecting our planet',
    Icon: Leaf,
    value: 'Environmental'
  }
];

export const FieldOfStudyQuestion: FC<FieldOfStudyQuestionProps> = ({
  value,
  onChange,
  isActive
}) => {
  return (
    <QuestionCard
      title="What gets you excited to learn?"
      description="Choose your field of study and let's find programs that match your passion."
      progress={28}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fieldOptions.map((option) => {
          const IconComponent = option.Icon;
          return (
            <OptionButton
              key={option.value}
              label={option.label}
              sublabel={option.sublabel}
              icon={<IconComponent className="w-6 h-6" />}
              isSelected={value === option.value}
              onClick={() => onChange(option.value)}
            />
          );
        })}
      </div>
    </QuestionCard>
  );
}; 