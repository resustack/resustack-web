import { Button } from '@/components/ui/button';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import FileText from 'lucide-react/dist/esm/icons/file-text';

type EditErrorStateProps = {
  error: string;
  onBack: () => void;
};

export function EditErrorState({ error, onBack }: EditErrorStateProps) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
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
  );
}
