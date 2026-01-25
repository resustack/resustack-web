'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { useCreateResume } from '@/hooks/use-create-resume';
import { useTemplates } from '@/hooks/use-templates';
import { TemplateLoadingState } from '@/components/resume/template-loading-state';
import { TemplateErrorState } from '@/components/resume/template-error-state';
import { TemplateEmptyState } from '@/components/resume/template-empty-state';
import { ResumeCreateForm } from '@/components/resume/form/resume-create-form';
import type { ResumeFormData } from '@/components/resume/validation/resume-schema';

export default function CreateResumePage() {
  const router = useRouter();
  const { create, isCreating } = useCreateResume();
  const { templates, isLoading: isLoadingTemplates, error: templatesError, mutate: retryTemplates } = useTemplates('ACTIVE');
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  const handleSubmit = async (data: ResumeFormData & { templateId: string }) => {
    setError(null);

    if (!data.templateId) {
      setError('템플릿을 선택해주세요.');
      return;
    }

    const result = await create(data);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.resume) {
      router.push(`/dashboard/resumes/${result.resume.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              ResuStack
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            대시보드로 돌아가기
          </Button>

          {/* Template Loading/Error States */}
          {isLoadingTemplates && <TemplateLoadingState />}

          {!isLoadingTemplates && templatesError && (
            <TemplateErrorState
              error={templatesError}
              onRetry={() => retryTemplates()}
            />
          )}

          {!isLoadingTemplates && !templatesError && templates.length === 0 && (
            <TemplateEmptyState />
          )}

          {/* Create Form */}
          {!isLoadingTemplates && !templatesError && templates.length > 0 && (
            <ResumeCreateForm
              templates={templates}
              selectedTemplateId={selectedTemplateId}
              onTemplateSelect={setSelectedTemplateId}
              error={error}
              isCreating={isCreating}
              onSubmit={handleSubmit}
              onCancel={() => router.push('/dashboard')}
            />
          )}
        </div>
      </main>
    </div>
  );
}
