'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { isLoggedIn, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              ResuStack
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              기능
            </a>
            <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              프로세스
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button asChild size="sm">
                <Link href="/dashboard">대시보드</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link href="/login">로그인</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/dashboard">시작하기</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
