import useSWR from 'swr';
import { API_ENDPOINTS } from '@/constants/api';
import type { ResumeListResponse, ResumeSummary } from '@/types/resume';

/**
 * 이력서 목록 조회 파라미터
 */
type ResumeListParams = {
  page?: number;
  size?: number;
  sort?: string;
  enabled?: boolean; // 조건부 fetching 제어
};

/**
 * 이력서 목록 fetcher 반환 타입
 */
type FetchResumesResult = {
  resumes: ResumeSummary[];
  pagination: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

/**
 * 이력서 목록 fetcher
 */
async function fetchResumes(params: ResumeListParams = {}): Promise<FetchResumesResult> {
  const { page = 0, size = 10, sort = 'updatedAt,desc' } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  let response: Response;

  try {
    response = await fetch(`${API_ENDPOINTS.RESUMES}?${queryParams}`, {
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
    const result: ResumeListResponse = await response.json();
    return {
      resumes: result.data?.content ?? [],
      pagination: {
        totalElements: result.data?.totalElements ?? 0,
        totalPages: result.data?.totalPages ?? 0,
        currentPage: result.data?.currentPage ?? 0,
        pageSize: result.data?.pageSize ?? size,
        hasNext: result.data?.hasNext ?? false,
        hasPrevious: result.data?.hasPrevious ?? false,
      },
    };
  }

  if (response.status === 401) {
    // 인증되지 않음
    return {
      resumes: [],
      pagination: {
        totalElements: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: size,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }

  // 기타 에러
  const result: ResumeListResponse = await response.json();
  const message = result.errorCode ?? response.statusText;
  throw new Error(message);
}

export function useResumes(params: ResumeListParams = {}) {
  const { page = 0, size = 10, sort = 'updatedAt,desc', enabled = true } = params;

  // SWR 키에 파라미터 포함하여 각 페이지별로 캐싱
  // enabled가 false면 null로 설정하여 요청 차단
  const key = enabled ? `/api/resumes?page=${page}&size=${size}&sort=${sort}` : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetchResumes({ page, size, sort }),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
      shouldRetryOnError: false,
    }
  );

  return {
    resumes: data?.resumes ?? [],
    pagination: data?.pagination ?? {
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: size,
      hasNext: false,
      hasPrevious: false,
    },
    isLoading,
    error: error?.message || null,
    mutate, // 수동 갱신용
  };
}
