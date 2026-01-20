import type { LucideIcon } from 'lucide-react';

type FlowStepProps = {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FlowStep({ number, title, description, icon: Icon }: FlowStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
          {number}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      </div>
    </div>
  );
}
