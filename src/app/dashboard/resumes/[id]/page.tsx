'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import { useResume } from '@/hooks/use-resume';
import { ResumeHeader } from '@/components/resume/resume-header';
import { ProfileSection } from '@/components/resume/profile-section';
import { SkillsSection } from '@/components/resume/skills-section';
import { SectionsContent } from '@/components/resume/sections-content';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ResumeDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { resume, isLoading, error } = useResume(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="border border-border rounded-lg p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">이력서를 불러오는 중...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              대시보드로 돌아가기
            </Button>

            <div className="border-2 border-dashed border-destructive/50 rounded-lg p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">오류가 발생했습니다</h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              대시보드로 돌아가기
            </Button>

            <div className="border-2 border-dashed border-border rounded-lg p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">이력서를 찾을 수 없습니다</h3>
                  <p className="text-muted-foreground">
                    삭제되었거나 존재하지 않는 이력서입니다.
                  </p>
                </div>
              </div>
            </div>
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            대시보드로 돌아가기
          </Button>

          {/* Resume Detail Card */}
          <div className="border border-border rounded-lg bg-card">
            <ResumeHeader
              title={resume.title}
              status={resume.status}
              isPublic={resume.public}
            />

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">생성일:</span>
                  <span className="ml-2 font-medium">
                    {new Date(resume.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">최근 수정:</span>
                  <span className="ml-2 font-medium">
                    {new Date(resume.updatedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <ProfileSection profile={resume.profile} />
              <SkillsSection skills={resume.skills} />
              <SectionsContent sections={resume.sections} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
