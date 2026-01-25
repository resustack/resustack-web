import FileQuestion from 'lucide-react/dist/esm/icons/file-question';

export function TemplateEmptyState() {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 p-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
        <div className="space-y-1">
          <p className="font-medium text-foreground">사용 가능한 템플릿이 없습니다</p>
          <p className="text-sm text-muted-foreground">
            관리자에게 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
