import { Button } from '@/components/ui/button';
import Plus from 'lucide-react/dist/esm/icons/plus';
import { memo } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { generateId } from '@/utils/id';
import type { ResumeFormData } from '../validation/resume-schema';
import { SectionCard } from './section-card';

type SectionsManagerProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  disabled?: boolean;
};

const MemoizedSectionCard = memo(SectionCard);

export function SectionsManager({ control, errors, disabled }: SectionsManagerProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'sections',
  });

  const handleAddSection = () => {
    append({
      id: generateId(),
      title: '',
      type: undefined,
      blocks: [],
    });
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">섹션</h3>
        <p className="text-sm text-muted-foreground mb-6">
          경력, 프로젝트, 학력 등 이력서 섹션을 추가하고 관리하세요
        </p>

        {fields.length > 0 && (
          <div className="space-y-4 mb-4">
            {fields.map((field, index) => (
              <MemoizedSectionCard
                key={field.id}
                control={control}
                errors={errors}
                sectionIndex={index}
                isFirst={index === 0}
                isLast={index === fields.length - 1}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                onRemove={() => remove(index)}
                disabled={disabled}
              />
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddSection}
          disabled={disabled}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          섹션 추가
        </Button>
      </div>
    </div>
  );
}
