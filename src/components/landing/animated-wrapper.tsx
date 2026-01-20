'use client';

import { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

type AnimatedWrapperProps = {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
};

export function AnimatedWrapper({
  children,
  animation = 'fade-in',
  delay = 0,
  className = '',
}: AnimatedWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !isMounted) return;

    const element = ref.current;
    let hasTriggered = false;

    const triggerAnimation = () => {
      if (hasTriggered) return;
      hasTriggered = true;

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '100px',
      }
    );

    // 관찰 시작
    observer.observe(element);

    // 초기 상태 체크를 다음 프레임에서 수행
    requestAnimationFrame(() => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        triggerAnimation();
        observer.disconnect();
      }
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, isMounted]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';

    if (!isVisible) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-up':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slide-down':
          return `${baseClasses} opacity-0 -translate-y-8`;
        case 'slide-left':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'slide-right':
          return `${baseClasses} opacity-0 -translate-x-8`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
  };

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
}
