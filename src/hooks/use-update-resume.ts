import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { API_ENDPOINTS } from '@/constants/api';
import type { ResumeUpdateRequest, ResumeDetail, ResumeDetailResponse } from '@/types/resume';

type UpdateResumeResult = {
  resume: ResumeDetail | null;
  error: string | null;
};

/**
 * 이력서 수정 fetcher
 */
async function updateResume(id: string, data: ResumeUpdateRequest): Promise<UpdateResumeResult> {
  let response: Response;

  try {
    response = await fetch(`${API_ENDPOINTS.RESUMES}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': '1.0',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Network error:', error);
    return {
      resume: null,
      error: '네트워크 오류가 발생했습니다.',
    };
  }

  if (response.ok) {
    const result: ResumeDetailResponse = await response.json();
    return {
      resume: result.data,
      error: null,
    };
  }

  if (response.status === 401) {
    return {
      resume: null,
      error: '로그인이 필요합니다.',
    };
  }

  if (response.status === 403) {
    return {
      resume: null,
      error: '수정 권한이 없습니다.',
    };
  }

  if (response.status === 404) {
    return {
      resume: null,
      error: '이력서를 찾을 수 없습니다.',
    };
  }

  const result: ResumeDetailResponse = await response.json();
  const message = result.errorCode ?? response.statusText;
  return {
    resume: null,
    error: message,
  };
}

/**
 * 이력서 수정 훅
 */
export function useUpdateResume() {
  const { mutate } = useSWRConfig();
  const [isUpdating, setIsUpdating] = useState(false);

  const update = async (id: string, data: ResumeUpdateRequest) => {
    setIsUpdating(true);
    const result = await updateResume(id, data);
    setIsUpdating(false);

    if (result.resume) {
      // 상세 조회 캐시 무효화
      await Promise.all([
        mutate(`/api/resumes/${id}`),
        // 목록 캐시 무효화
        mutate((key) => typeof key === 'string' && key.startsWith('/api/resumes?')),
      ]);
    }

    return result;
  };

  return {
    update,
    isUpdating,
  };
}
