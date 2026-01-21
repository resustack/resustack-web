import { create } from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  userName: string | null;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  login: (userName: string) => void;
  logout: () => void;
};

type UserInfo = {
  name: string;
  // 필요한 다른 사용자 정보 추가
};

/**
 * 쿠키에서 특정 키의 값을 가져오는 함수
 * 최적화: 한 번만 파싱하도록 개선
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return cookies[name] || null;
}

/**
 * 쿠키를 삭제하는 함수
 */
function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * 서버에서 사용자 정보를 가져오는 함수
 * TODO: 실제 API 엔드포인트로 교체 필요
 */
async function fetchUserInfo(): Promise<UserInfo | null> {
  try {
    // TODO: 실제 API 호출로 교체
    // const response = await fetch('/api/auth/me', {
    //   credentials: 'include', // HttpOnly 쿠키 포함
    // });
    //
    // if (!response.ok) {
    //   throw new Error('Failed to fetch user info');
    // }
    //
    // return await response.json();

    // 임시: localStorage에서 가져오기 (백엔드 API 구현 전까지)
    if (typeof window !== 'undefined') {
      const userName = localStorage.getItem('userName');
      if (userName) {
        return { name: userName };
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return null;
  }
}

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  userName: null,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    set({ isLoading: true, error: null });

    try {
      // 쿠키에서 accessToken 확인
      const accessToken = getCookie('accessToken');

      if (!accessToken) {
        // 토큰이 없으면 로그아웃 상태
        set({ isLoggedIn: false, userName: null, isLoading: false });
        return;
      }

      // 서버에서 사용자 정보 가져오기 (토큰 검증 포함)
      const userInfo = await fetchUserInfo();

      if (userInfo) {
        set({ isLoggedIn: true, userName: userInfo.name, isLoading: false });
      } else {
        // 토큰이 유효하지 않으면 로그아웃 처리
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        set({ isLoggedIn: false, userName: null, isLoading: false });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      set({ isLoggedIn: false, userName: null, isLoading: false, error: errorMessage });
    }
  },

  login: (userName: string) => {
    // 쿠키는 서버에서 설정됨 (HttpOnly)
    // 클라이언트에서는 상태만 업데이트

    // TODO: 백엔드 API 구현 후 제거 필요 (임시로 localStorage 사용)
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', userName);
    }

    set({ isLoggedIn: true, userName, error: null });
  },

  logout: () => {
    // 쿠키 삭제 (클라이언트에서 접근 가능한 경우)
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    // TODO: 백엔드 API 구현 후 제거 필요
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userName');
    }

    // TODO: 서버 로그아웃 API 호출
    // fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });

    set({ isLoggedIn: false, userName: null, error: null });
  },
}));
