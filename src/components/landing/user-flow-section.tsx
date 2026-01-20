import { FlowStep } from './flow-step';
import PenTool from 'lucide-react/dist/esm/icons/pen-tool';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import MousePointerClick from 'lucide-react/dist/esm/icons/mouse-pointer-click';
import Download from 'lucide-react/dist/esm/icons/download';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down';

export function UserFlowSection() {
  const steps = [
    {
      icon: PenTool,
      title: 'Input',
      description: '블록 단위로 경력, 학력, 기술을 입력하세요.',
    },
    {
      icon: Sparkles,
      title: 'AI Check',
      description: 'AI가 실시간으로 내용을 분석하고 개선점을 제안합니다.',
    },
    {
      icon: MousePointerClick,
      title: 'Select',
      description: '제안된 개선안 중 원하는 것을 선택하여 적용합니다.',
    },
    {
      icon: Download,
      title: 'Export',
      description: '완성된 이력서를 PDF로 다운로드하세요.',
    },
  ];

  return (
    <section id="process" className="bg-background">
      <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            4단계로 완성하는 완벽한 이력서
          </h2>
          <p className="text-lg text-muted-foreground">
            복잡한 과정 없이 빠르고 간단하게
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8 items-start">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <FlowStep
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index}>
              <FlowStep
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
              {index < steps.length - 1 && (
                <div className="flex justify-center my-6">
                  <ArrowDown className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
