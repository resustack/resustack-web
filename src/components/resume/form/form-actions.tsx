import { Button } from '@/components/ui/button';
import Save from 'lucide-react/dist/esm/icons/save';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';

type FormActionsProps = {
  isSubmitting: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export function FormActions({
  isSubmitting,
  isDeleting,
  onCancel,
  onDelete,
}: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button type="submit" disabled={isSubmitting || isDeleting} className="gap-2">
        <Save className="w-4 h-4" />
        {isSubmitting ? '저장 중...' : '변경사항 저장'}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting || isDeleting}
      >
        취소
      </Button>
      <div className="flex-1" />
      <Button
        type="button"
        variant="destructive"
        onClick={onDelete}
        disabled={isSubmitting || isDeleting}
        className="gap-2"
      >
        <Trash2 className="w-4 h-4" />
        {isDeleting ? '삭제 중...' : '삭제'}
      </Button>
    </div>
  );
}
