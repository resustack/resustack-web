import useSWR from 'swr';
import { API_ENDPOINTS } from '@/constants/api';
import type { Template, TemplateListResponse, TemplateStatus } from '@/types/resume';

/**
 * 템플릿 목록 fetcher
 */
async function fetchTemplates(status: TemplateStatus): Promise<Template[]> {
  let response: Response;

  try {
    response = await fetch(`${API_ENDPOINTS.TEMPLATES}?status=${status}`, {
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
    const result: TemplateListResponse = await response.json();
    return result.data || [];
  }

  if (response.status === 401) {
    // 인증되지 않음
    throw new Error('로그인이 필요합니다.');
  }

  // 기타 에러
  const result: TemplateListResponse = await response.json();
  const message = result.errorCode ?? response.statusText;
  throw new Error(message);
}

/**
 * 템플릿 목록 조회 훅
 */
export function useTemplates(status: TemplateStatus = 'ACTIVE') {
  const key = `/api/templates?status=${status}`;

  const { data: templates, error, isLoading, mutate } = useSWR(
    key,
    () => fetchTemplates(status),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 60초
      shouldRetryOnError: true,
    }
  );

  return {
    templates: templates || [],
    isLoading,
    error: error?.message || null,
    mutate, // 수동 갱신용
  };
}
