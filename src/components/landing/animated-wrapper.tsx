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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

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
