import useSWR from 'swr';
import { API_ENDPOINTS } from '@/constants/api';
import type { ResumeDetail, ResumeDetailResponse } from '@/types/resume';

/**
 * 이력서 상세 fetcher
 */
async function fetchResume(id: string): Promise<ResumeDetail | null> {
  let response: Response;

  try {
    response = await fetch(`${API_ENDPOINTS.RESUMES}/${id}`, {
      credentials: 'include', // HttpOnly 쿠키 포함
      headers: {
        'X-Api-Version': '1.0',
      },
    });
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }

  if (response.ok) {
    const result: ResumeDetailResponse = await response.json();
    return result.data;
  }

  if (response.status === 401) {
    // 인증되지 않음
    throw new Error('로그인이 필요합니다.');
  }

  if (response.status === 404) {
    // 이력서를 찾을 수 없음
    return null;
  }

  // 기타 에러
  const result: ResumeDetailResponse = await response.json();
  const message = result.errorCode ?? response.statusText;
  throw new Error(message);
}

/**
 * 이력서 상세 조회 훅
 */
export function useResume(id: string | null) {
  // id가 null이면 요청하지 않음
  const key = id ? `/api/resumes/${id}` : null;

  const { data: resume, error, isLoading, mutate } = useSWR(
    key,
    () => fetchResume(id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
      shouldRetryOnError: false,
    }
  );

  return {
    resume,
    isLoading,
    error: error?.message || null,
    mutate, // 수동 갱신용
  };
}
