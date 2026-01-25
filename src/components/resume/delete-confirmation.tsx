import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';

type DeleteConfirmationProps = {
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmation({ isDeleting, onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">정말 삭제하시겠습니까?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          이력서가 휴지통으로 이동되며, 30일 후 자동으로 삭제됩니다.
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? '삭제 중...' : '삭제 확인'}
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            취소
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
