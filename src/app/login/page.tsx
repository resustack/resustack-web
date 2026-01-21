'use client';

import { Button } from '@/components/ui/button';
import { AUTH_ENDPOINTS } from '@/constants/api';

// SVG 아이콘을 컴포넌트 외부로 hoisting (React Best Practices)
const NaverIcon = (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.6284 10.0039L6.41748 0H0.5V20H6.37158V9.9961L13.5825 20H19.5V0H13.6284V10.0039Z" />
  </svg>
);

export default function LoginPage() {
  const handleNaverLogin = () => {
    window.location.href = AUTH_ENDPOINTS.NAVER_LOGIN;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">ResuStack</span>에 오신 것을 환영합니다
            </h1>
            <p className="text-muted-foreground text-lg">
              간편하게 로그인하고 이력서 작성을 시작하세요
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            <div className="space-y-4">
              {/* Naver Login Button */}
              <Button
                onClick={handleNaverLogin}
                size="lg"
                className="w-full bg-[#03C75A] hover:bg-[#02b350] text-white text-lg py-6 shadow-md hover:shadow-lg transition-all"
              >
                {NaverIcon}
                네이버로 시작하기
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">
                    간편하고 안전한 로그인
                  </span>
                </div>
              </div>

              {/* Info Text */}
              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>로그인하면 ResuStack의</p>
                <p>
                  <a href="#" className="text-primary hover:underline">
                    이용약관
                  </a>
                  {' '}및{' '}
                  <a href="#" className="text-primary hover:underline">
                    개인정보처리방침
                  </a>
                  에 동의하게 됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Guest Access Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              둘러보기만 하시려면{' '}
              <a href="/" className="text-primary hover:underline font-medium">
                메인으로 돌아가기
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
