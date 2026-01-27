import { Label } from '@/components/ui/label';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { ResumeFormData, SkillsFormData } from '../validation/resume-schema';
import { TagInput } from './tag-input';

type SkillCategoryInputProps = {
  control: Control<ResumeFormData>;
  name: keyof SkillsFormData;
  label: string;
  disabled?: boolean;
};

export function SkillCategoryInput({
  control,
  name,
  label,
  disabled,
}: SkillCategoryInputProps) {
  const { field } = useController({
    name: `skills.${name}` as const,
    control,
  });

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <TagInput
        id={name}
        value={field.value || []}
        onChange={field.onChange}
        placeholder={`${label}을(를) 입력하고 Enter를 누르세요`}
        disabled={disabled}
      />
    </div>
  );
}
