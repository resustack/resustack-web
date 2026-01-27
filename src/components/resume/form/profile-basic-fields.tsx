import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Control, FieldErrors } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';

type ProfileBasicFieldsProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  disabled?: boolean;
};

export function ProfileBasicFields({ control, errors, disabled }: ProfileBasicFieldsProps) {
  const { field: nameField } = useController({
    name: 'profile.name',
    control,
    defaultValue: '',
  });

  const { field: positionField } = useController({
    name: 'profile.position',
    control,
    defaultValue: '',
  });

  const { field: introductionField } = useController({
    name: 'profile.introduction',
    control,
    defaultValue: '',
  });

  const { field: photoUrlField } = useController({
    name: 'profile.photoUrl',
    control,
    defaultValue: '',
  });

  return (
    <div className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          이름 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="홍길동"
          {...nameField}
          disabled={disabled}
        />
        {errors.profile?.name && (
          <p className="text-sm text-destructive">{errors.profile.name.message}</p>
        )}
      </div>

      {/* Position */}
      <div className="space-y-2">
        <Label htmlFor="position">포지션</Label>
        <Input
          id="position"
          placeholder="예: 백엔드 개발자"
          {...positionField}
          disabled={disabled}
        />
        {errors.profile?.position && (
          <p className="text-sm text-destructive">{errors.profile.position.message}</p>
        )}
      </div>

      {/* Introduction */}
      <div className="space-y-2">
        <Label htmlFor="introduction">소개</Label>
        <Textarea
          id="introduction"
          placeholder="자신을 소개하는 간단한 문구를 입력하세요"
          rows={4}
          {...introductionField}
          disabled={disabled}
        />
        {errors.profile?.introduction && (
          <p className="text-sm text-destructive">{errors.profile.introduction.message}</p>
        )}
      </div>

      {/* Photo URL */}
      <div className="space-y-2">
        <Label htmlFor="photoUrl">프로필 이미지 URL</Label>
        <Input
          id="photoUrl"
          type="url"
          placeholder="https://example.com/photo.jpg"
          {...photoUrlField}
          disabled={disabled}
        />
        {errors.profile?.photoUrl && (
          <p className="text-sm text-destructive">{errors.profile.photoUrl.message}</p>
        )}
      </div>
    </div>
  );
}
