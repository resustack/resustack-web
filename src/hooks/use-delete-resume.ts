import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { API_ENDPOINTS } from '@/constants/api';
import type { ApiResponse } from '@/types/resume';

type DeleteResumeResult = {
  success: boolean;
  error: string | null;
};

/**
 * 이력서 삭제 fetcher
 */
async function deleteResume(id: string): Promise<DeleteResumeResult> {
  let response: Response;

  try {
    response = await fetch(`${API_ENDPOINTS.RESUMES}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-Api-Version': '1.0',
      },
    });
  } catch (error) {
    console.error('Network error:', error);
    return {
      success: false,
      error: '네트워크 오류가 발생했습니다.',
    };
  }

  if (response.ok) {
    return {
      success: true,
      error: null,
    };
  }

  if (response.status === 401) {
    return {
      success: false,
      error: '로그인이 필요합니다.',
    };
  }

  if (response.status === 403) {
    return {
      success: false,
      error: '삭제 권한이 없습니다.',
    };
  }

  if (response.status === 404) {
    return {
      success: false,
      error: '이력서를 찾을 수 없습니다.',
    };
  }

  try {
    const result: ApiResponse<unknown> = await response.json();
    const message = result.errorCode ?? response.statusText;
    return {
      success: false,
      error: message,
    };
  } catch {
    return {
      success: false,
      error: response.statusText,
    };
  }
}

/**
 * 이력서 삭제 훅
 */
export function useDeleteResume() {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);

  const remove = async (id: string) => {
    setIsDeleting(true);
    try {
      const result = await deleteResume(id);

      if (result.success) {
        // 상세 조회 캐시 무효화
        await Promise.all([
          mutate(`/api/resumes/${id}`),
          // 목록 캐시 무효화
          mutate((key) => typeof key === 'string' && key.startsWith('/api/resumes?')),
        ]);
      }

      return result;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    remove,
    isDeleting,
  };
}
