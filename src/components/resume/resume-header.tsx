import { Button } from '@/components/ui/button';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import type { ResumeStatus } from '@/types/resume';

type ResumeHeaderProps = {
  title: string;
  status: ResumeStatus;
  isPublic: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ResumeHeader({ title, status, isPublic, onEdit, onDelete }: ResumeHeaderProps) {
  return (
    <div className="border-b border-border p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {isPublic && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                공개
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={onEdit}>
            <Edit className="w-4 h-4" />
            편집
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-destructive hover:bg-destructive/10" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
