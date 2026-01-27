import { Separator } from '@/components/ui/separator';
import type { Control, FieldErrors } from 'react-hook-form';
import type { ResumeFormData } from '../validation/resume-schema';
import { ContactFields } from './contact-fields';
import { ProfileBasicFields } from './profile-basic-fields';

type ProfileSectionProps = {
  control: Control<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
  disabled?: boolean;
};

export function ProfileSection({ control, errors, disabled }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">프로필</h3>
        <ProfileBasicFields control={control} errors={errors} disabled={disabled} />
      </div>

      <Separator />

      <ContactFields control={control} errors={errors} disabled={disabled} />
    </div>
  );
}
