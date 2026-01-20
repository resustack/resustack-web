import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            입력은 블록으로,
            <br />
            완성은 AI로.
            <br />
            <span className="text-primary">가장 빠른 이력서 빌더</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            복잡한 이력서 작성을 블록 단위로 간편하게.
            AI가 실시간으로 검증하고 최적화합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
              지금 시작하기
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/5 transition-all">
              데모 보기
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[500px] w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-2xl">
            {/* TODO: 이력서 빌더 UI 스크린샷 또는 제품 데모 이미지로 교체 */}
            {/* Placeholder for Hero Image */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-sm">Hero Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
