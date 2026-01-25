import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import { Button } from '@/components/ui/button';

type TemplateErrorStateProps = {
  error: string;
  onRetry: () => void;
};

export function TemplateErrorState({ error, onRetry }: TemplateErrorStateProps) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-destructive/50 bg-destructive/5 p-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div className="space-y-2">
          <p className="font-medium text-destructive">템플릿을 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button onClick={onRetry} variant="outline" size="sm">
          다시 시도
        </Button>
      </div>
    </div>
  );
}
