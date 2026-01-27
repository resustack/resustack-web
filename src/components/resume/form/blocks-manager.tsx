import { Button } from '@/components/ui/button';
import Plus from 'lucide-react/dist/esm/icons/plus';
import type { Control, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { generateId } from '@/utils/id';
import type { ResumeFormData } from '../validation/resume-schema';
import { BlockCard } from './block-card';

type BlocksManagerProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  sectionIndex: number;
  fieldArray: UseFieldArrayReturn<ResumeFormData, `sections.${number}.blocks`, 'id'>;
  disabled?: boolean;
};

export function BlocksManager({
  control,
  errors,
  sectionIndex,
  fieldArray,
  disabled,
}: BlocksManagerProps) {
  const { fields, append, remove } = fieldArray;

  const handleAddBlock = () => {
    append({
      id: generateId(),
      subTitle: '',
      period: '',
      content: '',
      visible: true,
      blockMeta: {
        techStack: [],
        link: '',
      },
    });
  };

  return (
    <div className="space-y-4">
      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <BlockCard
              key={field.id}
              control={control}
              errors={errors}
              sectionIndex={sectionIndex}
              blockIndex={index}
              onRemove={() => remove(index)}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddBlock}
        disabled={disabled}
        className="gap-2"
      >
        <Plus className="w-4 h-4" />
        블록 추가
      </Button>
    </div>
  );
}
