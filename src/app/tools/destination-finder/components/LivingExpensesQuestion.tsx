import { FC } from 'react';
import { 
  Coins, 
  Home, 
  Coffee, 
  Gem
} from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { OptionButton } from './OptionButton';

interface LivingExpensesQuestionProps {
  value: number;
  onChange: (value: number) => void;
  isActive: boolean;
}

const expenseOptions = [
  {
    label: '€800-1,000',
    sublabel: 'Smart saver',
    Icon: Coins,
    value: 800
  },
  {
    label: '€1,000-1,500',
    sublabel: 'Comfortable living',
    Icon: Home,
    value: 1200
  },
  {
    label: '€1,500-2,000',
    sublabel: 'Extra comfort',
    Icon: Coffee,
    value: 1800
  },
  {
    label: '€2,000+',
    sublabel: 'Premium lifestyle',
    Icon: Gem,
    value: 2500
  }
];

export const LivingExpensesQuestion: FC<LivingExpensesQuestionProps> = ({
  value,
  onChange,
  isActive
}) => {
  return (
    <QuestionCard
      title="How about monthly living costs?"
      description="Consider accommodation, food, transportation, and other expenses."
      progress={70}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {expenseOptions.map((option) => {
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