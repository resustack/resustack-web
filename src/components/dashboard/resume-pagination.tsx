'use client';

import { Button } from '@/components/ui/button';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

type ResumePaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
};

export function ResumePagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: ResumePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        이전
      </Button>

      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="gap-1"
      >
        다음
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
