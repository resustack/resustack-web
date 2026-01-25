import FileText from 'lucide-react/dist/esm/icons/file-text';

export function TemplateLoadingState() {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 p-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <FileText className="h-12 w-12 animate-pulse text-muted-foreground" />
        <p className="text-sm text-muted-foreground">템플릿을 불러오는 중...</p>
      </div>
    </div>
  );
}
