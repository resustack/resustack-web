import useSWR from 'swr';
import { AUTH_ENDPOINTS } from '@/constants/api';

/**
 * 백엔드 공통 응답 형식
 */
type ResponseData<T> = {
  timestamp: string;
  httpStatus: number;
  data: T | null;
  errorCode: ErrorCode | null;
};

type ErrorCode = {
  httpStatus: string;
  message: string;
};

/**
 * 사용자 정보
 */
type UserInfo = {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
};

/**
 * SWR fetcher
 */
async function fetchUserInfo(): Promise<UserInfo | null> {
  let response: Response;

  try {
    response = await fetch(AUTH_ENDPOINTS.ME, {
      credentials: 'include', // HttpOnly 쿠키 포함
    });
  } catch (error) {
    // 네트워크 에러 (fetch 실패)
    console.error('Network error:', error);
    throw error; // SWR이 에러 처리
  }

  if (response.ok) {
    const result: ResponseData<UserInfo> = await response.json();
    return result.data;
  }

  if (response.status === 401) {
    // 인증되지 않음 (정상 케이스)
    return null;
  }

  // 404 또는 기타 에러는 SWR error로 노출
  const result: ResponseData<UserInfo> = await response.json();
  const message = result.errorCode?.message ?? response.statusText;
  throw new Error(message);
}

/**
 * 인증 훅 (SWR 기반)
 *
 * 특징:
 * - 자동 캐싱 및 중복 요청 제거
 * - 포커스 시 재검증 비활성화 (불필요한 API 호출 방지)
 * - 재연결 시에만 재검증
 * - 1분간 중복 요청 자동 차단
 */
export function useAuth() {
  const { data: user, error, isLoading, mutate } = useSWR(
    '/api/auth/me', // SWR 키
    fetchUserInfo,
    {
      revalidateOnFocus: false, // 포커스 시 재검증 안 함
      revalidateOnReconnect: true, // 재연결 시 재검증
      dedupingInterval: 60000, // 1분간 중복 요청 방지
      shouldRetryOnError: false, // 401 에러 시 재시도 안 함
    }
  );

  const isLoggedIn = !!user;
  const userName = user?.name || null;

  /**
   * 로그아웃 함수
   */
  const logout = async () => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Logout failed:', response.status);
      }

      // SWR 캐시 무효화 (로그아웃 상태로 전환)
      await mutate(null, false);
    } catch (error) {
      console.error('Network error during logout:', error);
      // 실패해도 클라이언트 상태는 로그아웃 처리
      await mutate(null, false);
    }
  };

  /**
   * 수동 재검증 (필요 시에만 사용)
   */
  const revalidate = () => mutate();

  return {
    // 상태
    isLoggedIn,
    userName,
    user,
    isLoading,
    error: error?.message || null,

    // 액션
    logout,
    revalidate, // 로그인 성공 후 등 필요 시에만 호출
  };
}
