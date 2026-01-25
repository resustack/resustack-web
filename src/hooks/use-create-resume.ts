import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { API_ENDPOINTS } from '@/constants/api';
import type { ResumeCreateRequest, ResumeDetail, ResumeDetailResponse } from '@/types/resume';

type CreateResumeResult = {
  resume: ResumeDetail | null;
  error: string | null;
};

/**
 * 이력서 생성 fetcher
 */
async function createResume(data: ResumeCreateRequest): Promise<CreateResumeResult> {
  let response: Response;

  try {
    response = await fetch(API_ENDPOINTS.RESUMES, {
      method: 'POST',
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

  const result: ResumeDetailResponse = await response.json();
  const message = result.errorCode ?? response.statusText;
  return {
    resume: null,
    error: message,
  };
}

/**
 * 이력서 생성 훅
 */
export function useCreateResume() {
  const { mutate } = useSWRConfig();
  const [isCreating, setIsCreating] = useState(false);

  const create = async (data: ResumeCreateRequest) => {
    setIsCreating(true);
    const result = await createResume(data);
    setIsCreating(false);

    if (result.resume) {
      // 목록 캐시 무효화
      await mutate((key) => typeof key === 'string' && key.startsWith('/api/resumes?'));
    }

    return result;
  };

  return {
    create,
    isCreating,
  };
}
