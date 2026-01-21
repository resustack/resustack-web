import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Plus from 'lucide-react/dist/esm/icons/plus';
import FileText from 'lucide-react/dist/esm/icons/file-text';

export function LoginRequiredState() {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-12">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            로그인이 필요합니다
          </h3>
          <p className="text-muted-foreground max-w-md">
            이력서를 만들고 관리하려면 로그인해주세요.
          </p>
        </div>
        <Button asChild className="gap-2 mt-4">
          <Link href="/login">로그인하기</Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="border border-border rounded-lg p-12">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">이력서 목록을 불러오는 중...</p>
      </div>
    </div>
  );
}

export function EmptyResumeState() {
  return (
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
  );
}
