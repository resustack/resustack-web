'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { useResume } from '@/hooks/use-resume';
import { useUpdateResume } from '@/hooks/use-update-resume';
import { useDeleteResume } from '@/hooks/use-delete-resume';
import { EditLoadingState } from '@/components/resume/edit-loading-state';
import { EditErrorState } from '@/components/resume/edit-error-state';
import { ResumeEditForm } from '@/components/resume/form/resume-edit-form';
import { DeleteConfirmation } from '@/components/resume/delete-confirmation';
import type { ResumeFormData } from '@/components/resume/validation/resume-schema';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditResumePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { resume, isLoading, error: fetchError } = useResume(id);
  const { update, isUpdating } = useUpdateResume();
  const { remove, isDeleting } = useDeleteResume();
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = async (data: ResumeFormData) => {
    setError(null);

    const result = await update(id, data);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.resume) {
      router.push(`/dashboard/resumes/${id}`);
    }
  };

  const handleDelete = async () => {
    const result = await remove(id);

    if (result.error) {
      setError(result.error);
      setShowDeleteConfirm(false);
      return;
    }

    if (result.success) {
      router.push('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <EditLoadingState />
          </div>
        </div>
      </div>
    );
  }

  if (fetchError || !resume) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <EditErrorState
              error={fetchError || '이력서를 찾을 수 없습니다.'}
              onBack={() => router.push('/dashboard')}
            />
          </div>
        </div>
      </div>
    );
  }

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
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push(`/dashboard/resumes/${id}`)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            이력서로 돌아가기
          </Button>

          {/* Edit Form */}
          <ResumeEditForm
            defaultValues={{
              title: resume.title,
              public: resume.public,
              profile: resume.profile,
              skills: resume.skills,
              sections: resume.sections,
            }}
            error={error}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/dashboard/resumes/${id}`)}
            onDelete={() => setShowDeleteConfirm(true)}
          />

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <DeleteConfirmation
              isDeleting={isDeleting}
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteConfirm(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
