import { FeatureCard } from './feature-card';
import Blocks from 'lucide-react/dist/esm/icons/blocks';
import BrainCircuit from 'lucide-react/dist/esm/icons/brain-circuit';

export function FeaturesSection() {
  const features = [
    {
      icon: Blocks,
      title: 'Smart Resume',
      description: '블록 기반으로 이력서를 빠르게 작성하고 실시간으로 확인하세요.',
      badge: 'Core',
      items: [
        '직관적인 블록 기반 입력 시스템',
        '실시간 미리보기로 즉시 확인',
        '원클릭 PDF 내보내기',
      ],
    },
    {
      icon: BrainCircuit,
      title: 'AI Coach',
      description: 'AI가 이력서를 분석하고 JD에 맞춰 최적화 방법을 제안합니다.',
      badge: 'AI',
      items: [
        'AI 기반 이력서 자동 리뷰',
        'JD 매칭도 분석 및 개선안 제공',
        '맞춤형 피드백으로 합격률 향상',
      ],
    },
  ];

  return (
    <section id="features" className="bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ResuStack의 핵심 기능
          </h2>
          <p className="text-lg text-muted-foreground">
            빠르고 정확한 이력서 작성을 위한 완벽한 도구
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              items={feature.items}
              badge={feature.badge}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
