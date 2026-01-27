import Link from 'next/link';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import type { ResumeSummary } from '@/types/resume';

type ResumeCardProps = {
  resume: ResumeSummary;
};

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Link
      href={`/dashboard/resumes/${resume.id}`}
      className="border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card block"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <FileText className="w-8 h-8 text-primary" />
          <div className="flex gap-2">
            {resume.public && (
              <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">
                공개
              </span>
            )}
          </div>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">
          {resume.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          최근 수정: {new Date(resume.updatedAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </Link>
  );
}
