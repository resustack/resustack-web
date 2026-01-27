import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Save from 'lucide-react/dist/esm/icons/save';
import { resumeFormSchema, type ResumeFormData } from '../validation/resume-schema';
import { BasicInfoSection } from './basic-info-section';
import { ProfileSection } from './profile-section';
import { SkillsSection } from './skills-section';
import { SectionsManager } from './sections-manager';
import type { Template } from '@/types/resume';

type ResumeCreateFormProps = {
  templates: Template[];
  selectedTemplateId: string;
  onTemplateSelect: (id: string) => void;
  error: string | null;
  isCreating: boolean;
  onSubmit: (data: ResumeFormData & { templateId: string }) => Promise<void>;
  onCancel: () => void;
};

export function ResumeCreateForm({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  error,
  isCreating,
  onSubmit,
  onCancel,
}: ResumeCreateFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      title: '',
      public: false,
      profile: {
        name: '',
        position: '',
        introduction: '',
        photoUrl: '',
        contact: {
          phone: '',
          email: '',
          github: '',
          linkedin: '',
          blog: '',
        },
      },
      skills: {
        language: [],
        framework: [],
        database: [],
        devOps: [],
        tool: [],
        library: [],
        testing: [],
        collaboration: [],
        etc: [],
      },
      sections: [],
    },
  });

  const handleFormSubmit = async (data: ResumeFormData) => {
    if (!selectedTemplateId) {
      return;
    }

    // Calculate orderIndex for sections
    const processedData = {
      ...data,
      templateId: selectedTemplateId,
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
        <CardTitle>새 이력서 만들기</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Template Selection */}
          <div className="space-y-4">
            <div>
              <Label>
                템플릿 선택 <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                이력서 레이아웃을 선택하세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => onTemplateSelect(template.id)}
                  disabled={isCreating}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    selectedTemplateId === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="aspect-[3/4] bg-muted rounded mb-3 overflow-hidden">
                    {template.thumbnail && (
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Basic Info Section */}
          <BasicInfoSection control={control} errors={errors} disabled={isCreating} />

          <Separator />

          {/* Profile Section */}
          <ProfileSection control={control} errors={errors} disabled={isCreating} />

          <Separator />

          {/* Skills Section */}
          <SkillsSection control={control} disabled={isCreating} />

          <Separator />

          {/* Sections */}
          <SectionsManager control={control} errors={errors} disabled={isCreating} />

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isCreating || !selectedTemplateId}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isCreating ? '생성 중...' : '이력서 생성'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isCreating}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
