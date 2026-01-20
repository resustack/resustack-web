import { AnimatedWrapper } from '@/components/landing/animated-wrapper';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { UserFlowSection } from '@/components/landing/user-flow-section';
import { CTASection } from '@/components/landing/cta-section';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
      <AnimatedWrapper animation="fade-in" delay={0}>
        <HeroSection />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slide-up" delay={100}>
        <ProblemSection />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slide-up" delay={200}>
        <FeaturesSection />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slide-up" delay={300}>
        <UserFlowSection />
      </AnimatedWrapper>

      <AnimatedWrapper animation="slide-up" delay={400}>
        <CTASection />
      </AnimatedWrapper>
    </main>
    </>
  );
}
