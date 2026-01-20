import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import Check from 'lucide-react/dist/esm/icons/check';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
  badge?: string;
};

export function FeatureCard({ title, description, icon: Icon, items, badge }: FeatureCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-primary/10 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
