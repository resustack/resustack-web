import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { resumeFormSchema, type ResumeFormData } from '../validation/resume-schema';
import { BasicInfoSection } from './basic-info-section';
import { FormActions } from './form-actions';
import { ProfileSection } from './profile-section';
import { SectionsManager } from './sections-manager';
import { SkillsSection } from './skills-section';

type ResumeEditFormProps = {
  defaultValues: ResumeFormData;
  error: string | null;
  isUpdating: boolean;
  isDeleting: boolean;
  onSubmit: (data: ResumeFormData) => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
};

export function ResumeEditForm({
  defaultValues,
  error,
  isUpdating,
  isDeleting,
  onSubmit,
  onCancel,
  onDelete,
}: ResumeEditFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: ResumeFormData) => {
    // Calculate orderIndex for sections
    const processedData = {
      ...data,
      sections: data.sections?.map((section, index) => ({
        ...section,
        orderIndex: index,
      })),
    };

    await onSubmit(processedData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>이력서 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Basic Info Section */}
          <BasicInfoSection
            control={control}
            errors={errors}
            disabled={isUpdating || isDeleting}
          />

          <Separator />

          {/* Profile Section */}
          <ProfileSection
            control={control}
            errors={errors}
            disabled={isUpdating || isDeleting}
          />

          <Separator />

          {/* Skills Section */}
          <SkillsSection control={control} disabled={isUpdating || isDeleting} />

          <Separator />

          {/* Sections */}
          <SectionsManager
            control={control}
            errors={errors}
            disabled={isUpdating || isDeleting}
          />

          <Separator />

          {/* Action Buttons */}
          <FormActions
            isSubmitting={isUpdating}
            isDeleting={isDeleting}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        </form>
      </CardContent>
    </Card>
  );
}
