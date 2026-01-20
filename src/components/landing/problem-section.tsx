import { Card, CardContent } from '@/components/ui/card';
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import Clock from 'lucide-react/dist/esm/icons/clock';

export function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: '비효율적인 작성 과정',
      description:
        '이력서 작성에 너무 많은 시간이 소요됩니다. 포맷팅, 레이아웃 조정, 내용 정리까지 반복적인 작업이 필요합니다.',
    },
    {
      icon: AlertCircle,
      title: '객관적 검증 부재',
      description:
        '내가 작성한 이력서가 실제로 효과적인지 알 수 없습니다. JD(Job Description)에 적합한지 확인할 방법이 없습니다.',
    },
  ];

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            이력서 작성, 왜 이렇게 어려울까요?
          </h2>
          <p className="text-lg text-muted-foreground">
            많은 구직자들이 겪는 공통적인 문제점입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card key={index} className="border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
