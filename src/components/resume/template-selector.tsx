import type { Template } from '@/types/resume';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import { cn } from '@/lib/utils';

type TemplateCardProps = {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
};

function TemplateCard({ template, isSelected, onSelect, disabled }: TemplateCardProps) {
  const layoutTypeLabel = {
    SINGLE_COLUMN: '단일 컬럼',
    TWO_COLUMN_LEFT: '좌측 2단 컬럼',
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(template.id)}
      disabled={disabled}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border-2 bg-white transition-all',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isSelected
          ? 'border-primary shadow-lg'
          : 'border-border hover:border-primary/50',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            미리보기 없음
          </div>
        )}

        {/* Selected Overlay */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
            <CheckCircle2 className="h-12 w-12 text-primary drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 text-left font-semibold text-foreground">
            {template.name}
          </h3>
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {layoutTypeLabel[template.layoutType]}
          </span>
        </div>
        <p className="line-clamp-2 text-left text-sm text-muted-foreground">
          {template.description}
        </p>
      </div>
    </button>
  );
}

type TemplateSelectorProps = {
  templates: Template[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
};

export function TemplateSelector({
  templates,
  selectedId,
  onSelect,
  disabled,
}: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedId === template.id}
          onSelect={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
