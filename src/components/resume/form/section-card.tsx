import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import type { Control, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { useController, useFieldArray } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';
import { BlocksManager } from './blocks-manager';

type SectionCardProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  sectionIndex: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  disabled?: boolean;
};

export function SectionCard({
  control,
  errors,
  sectionIndex,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
  disabled,
}: SectionCardProps) {
  const basePath = `sections.${sectionIndex}` as const;

  const { field: titleField } = useController({
    name: `${basePath}.title`,
    control,
  });

  const { field: typeField } = useController({
    name: `${basePath}.type`,
    control,
  });

  const blocksFieldArray = useFieldArray({
    control,
    name: `${basePath}.blocks`,
  });

  return (
    <div className="border rounded-lg p-6 space-y-6 bg-card">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${basePath}-title`}>섹션 제목</Label>
              <Input
                id={`${basePath}-title`}
                placeholder="예: 경력"
                {...titleField}
                disabled={disabled}
              />
              {errors.sections?.[sectionIndex]?.title && (
                <p className="text-sm text-destructive">
                  {errors.sections[sectionIndex]?.title?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${basePath}-type`}>섹션 타입</Label>
              <Select
                value={typeField.value || ''}
                onValueChange={typeField.onChange}
                disabled={disabled}
              >
                <SelectTrigger id={`${basePath}-type`}>
                  <SelectValue placeholder="타입 선택 (선택사항)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WORK_EXPERIENCE">경력</SelectItem>
                  <SelectItem value="PROJECT">프로젝트</SelectItem>
                  <SelectItem value="EDUCATION">학력</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onMoveUp}
              disabled={disabled || isFirst}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onMoveDown}
              disabled={disabled || isLast}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              disabled={disabled}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Blocks */}
      <div>
        <h4 className="font-medium mb-4">블록</h4>
        <BlocksManager
          control={control}
          errors={errors}
          sectionIndex={sectionIndex}
          fieldArray={blocksFieldArray}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
