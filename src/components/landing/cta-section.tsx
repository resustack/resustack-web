import { Button } from '@/components/ui/button';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

export function CTASection() {
  return (
    <section className="bg-gradient-to-b from-background via-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            회원가입 후 바로 사용할 수 있습니다.
            <br />
            복잡한 설정 없이 5분 안에 첫 이력서를 완성하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
            >
              무료로 시작하기
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            신용카드 필요 없음 • 언제든 취소 가능
          </p>
        </div>
      </div>
    </section>
  );
}
