/**
 * API 서버 엔드포인트 상수
 * 환경변수 사용
 *
 * 필수 환경변수:
 * - NEXT_PUBLIC_AUTH_SERVER_URL: 인증 서버 URL
 * - NEXT_PUBLIC_API_SERVER_URL: API 서버 URL
 * - NEXT_PUBLIC_FRONTEND_URL: 프론트엔드 URL
 */

// 환경변수에서 URL 가져오기
const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
const API_SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

if (!AUTH_SERVER_URL || !API_SERVER_URL || !FRONTEND_URL) {
  throw new Error(
    '필수 환경변수가 설정되지 않았습니다:\n' +
    'NEXT_PUBLIC_AUTH_SERVER_URL, NEXT_PUBLIC_API_SERVER_URL, NEXT_PUBLIC_FRONTEND_URL'
  );
}

// OAuth 엔드포인트
export const AUTH_ENDPOINTS = {
  NAVER_LOGIN: `${AUTH_SERVER_URL}/oauth2/authorization/naver`,
  // 사용자 정보 조회 (토큰 검증 포함)
  ME: `${AUTH_SERVER_URL}/api/auth/me`,
  // 로그아웃
  LOGOUT: `${AUTH_SERVER_URL}/api/auth/logout`,
} as const;

// API 엔드포인트 (추후 확장용)
export const API_ENDPOINTS = {
  BASE_URL: API_SERVER_URL,
  // TODO: API 엔드포인트 추가
} as const;

// 리다이렉트 URL (백엔드 설정용)
export const REDIRECT_URLS = {
  AFTER_LOGIN: `${FRONTEND_URL}/dashboard?login=success`,
  LOGIN_PAGE: `${FRONTEND_URL}/login`,
} as const;
