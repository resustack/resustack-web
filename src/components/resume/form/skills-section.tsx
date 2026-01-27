import type { Control } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';
import { SkillCategoryInput } from './skill-category-input';

type SkillsSectionProps = {
  control: Control<ResumeFormData>;
  disabled?: boolean;
};

const skillCategories = [
  { name: 'language' as const, label: 'Language' },
  { name: 'framework' as const, label: 'Framework' },
  { name: 'database' as const, label: 'Database' },
  { name: 'devOps' as const, label: 'DevOps' },
  { name: 'tool' as const, label: 'Tool' },
  { name: 'library' as const, label: 'Library' },
  { name: 'testing' as const, label: 'Testing' },
  { name: 'collaboration' as const, label: 'Collaboration' },
  { name: 'etc' as const, label: 'Etc' },
];

export function SkillsSection({ control, disabled }: SkillsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">기술 스택</h3>
        <p className="text-sm text-muted-foreground mb-6">
          각 카테고리에 기술을 입력하고 Enter 또는 콤마(,)를 눌러 추가하세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <SkillCategoryInput
              key={category.name}
              control={control}
              name={category.name}
              label={category.label}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
