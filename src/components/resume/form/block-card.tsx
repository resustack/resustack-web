import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import type { Control, FieldErrors } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';
import { TagInput } from './tag-input';

type BlockCardProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  sectionIndex: number;
  blockIndex: number;
  onRemove: () => void;
  disabled?: boolean;
};

export function BlockCard({
  control,
  errors,
  sectionIndex,
  blockIndex,
  onRemove,
  disabled,
}: BlockCardProps) {
  const basePath = `sections.${sectionIndex}.blocks.${blockIndex}` as const;

  const { field: subTitleField } = useController({
    name: `${basePath}.subTitle`,
    control,
    defaultValue: '',
  });

  const { field: periodField } = useController({
    name: `${basePath}.period`,
    control,
    defaultValue: '',
  });

  const { field: contentField } = useController({
    name: `${basePath}.content`,
    control,
    defaultValue: '',
  });

  const { field: visibleField } = useController({
    name: `${basePath}.visible`,
    control,
    defaultValue: true,
  });

  const { field: techStackField } = useController({
    name: `${basePath}.blockMeta.techStack`,
    control,
    defaultValue: [],
  });

  const { field: linkField } = useController({
    name: `${basePath}.blockMeta.link`,
    control,
    defaultValue: '',
  });

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-sm">블록 #{blockIndex + 1}</h5>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={`${basePath}-visible`} className="text-xs">
              공개
            </Label>
            <Switch
              id={`${basePath}-visible`}
              checked={visibleField.value}
              onCheckedChange={visibleField.onChange}
              disabled={disabled}
            />
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${basePath}-subtitle`}>소제목</Label>
          <Input
            id={`${basePath}-subtitle`}
            placeholder="예: 백엔드 개발자"
            {...subTitleField}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${basePath}-period`}>기간</Label>
          <Input
            id={`${basePath}-period`}
            placeholder="예: 2020.01 - 2023.12"
            {...periodField}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${basePath}-content`}>내용</Label>
        <Textarea
          id={`${basePath}-content`}
          placeholder="설명을 입력하세요"
          rows={4}
          {...contentField}
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${basePath}-techstack`}>기술 스택</Label>
        <TagInput
          value={techStackField.value || []}
          onChange={techStackField.onChange}
          placeholder="기술을 입력하고 Enter를 누르세요"
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${basePath}-link`}>링크</Label>
        <Input
          id={`${basePath}-link`}
          type="url"
          placeholder="https://example.com"
          {...linkField}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
