import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { Control, FieldErrors } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';

type BasicInfoSectionProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  disabled?: boolean;
};

export function BasicInfoSection({ control, errors, disabled }: BasicInfoSectionProps) {
  const { field: titleField } = useController({
    name: 'title',
    control,
  });

  const { field: publicField } = useController({
    name: 'public',
    control,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">기본 정보</h3>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              제목 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="예: 시니어 백엔드 개발자 이력서"
              {...titleField}
              disabled={disabled}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public">공개 이력서</Label>
              <p className="text-sm text-muted-foreground">
                이력서를 다른 사람들이 볼 수 있도록 설정합니다
              </p>
            </div>
            <Switch
              id="public"
              checked={publicField.value}
              onCheckedChange={publicField.onChange}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
