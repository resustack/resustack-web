'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Plus from 'lucide-react/dist/esm/icons/plus';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import { useAuth } from '@/hooks/use-auth';

type Resume = {
  id: string;
  title: string;
  updatedAt: string;
  status: 'draft' | 'completed';
};

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, userName, logout, revalidate } = useAuth();

  useEffect(() => {
    // URL 쿼리 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get('login');

    if (loginSuccess === 'success') {
      // 로그인 성공 시 사용자 정보 재검증
      revalidate();
      // URL에서 쿼리 파라미터 제거 (히스토리 정리)
      router.replace('/dashboard');
    }
  }, [revalidate, router]);

  const resumes: Resume[] = [
    // Placeholder 데이터
    // { id: '1', title: '프론트엔드 개발자 이력서', updatedAt: '2025-01-20', status: 'draft' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
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

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {userName}님 환영합니다
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">로그아웃</span>
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    로그인하고 이력서를 저장하세요
                  </span>
                  <Button asChild variant="default" size="sm">
                    <Link href="/login">로그인</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              내 이력서
            </h1>
            <p className="text-muted-foreground">
              이력서를 만들고 관리하세요. AI가 실시간으로 최적화를 도와드립니다.
            </p>
          </div>

          {/* Create New Resume Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              새 이력서 만들기
            </Button>
          </div>

          {/* Resumes List */}
          <div className="space-y-4">
            {resumes.length === 0 ? (
              /* Empty State */
              <div className="border-2 border-dashed border-border rounded-lg p-12">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      아직 이력서가 없습니다
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      첫 이력서를 만들어보세요. 블록 단위로 간편하게 작성하고,
                      AI가 실시간으로 검증하고 최적화합니다.
                    </p>
                  </div>
                  <Button className="gap-2 mt-4">
                    <Plus className="w-4 h-4" />
                    첫 이력서 만들기
                  </Button>
                </div>
              </div>
            ) : (
              /* Resumes Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <FileText className="w-8 h-8 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {resume.status === 'draft' ? '작성 중' : '완료'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        최근 수정: {resume.updatedAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="border border-primary/20 bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-3">💡 빠른 시작 가이드</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 이력서는 블록 단위로 작성됩니다 - 경력, 학력, 프로젝트 등을 개별적으로 추가하세요</li>
              <li>• AI가 실시간으로 문법과 표현을 검증하고 개선 제안을 제공합니다</li>
              <li>• 다양한 템플릿과 스타일로 내보내기가 가능합니다</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
