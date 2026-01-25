import FileText from 'lucide-react/dist/esm/icons/file-text';

export function EditLoadingState() {
  return (
    <div className="border border-border rounded-lg p-12">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">이력서를 불러오는 중...</p>
      </div>
    </div>
  );
}
