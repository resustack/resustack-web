# /test - Test Code Generator

자동으로 Vitest + React Testing Library 기반 테스트 코드를 생성합니다.

## 사용법

```
/test                                    # 현재 열린 파일의 테스트 생성
/test src/components/ui/button.tsx      # 특정 파일의 테스트 생성
/test --integration                      # 통합 테스트 생성
```

## 테스트 스택

- **Vitest** - 빠른 유닛 테스트
- **React Testing Library** - 컴포넌트 테스트
- **@testing-library/user-event** - 사용자 인터랙션
- **@testing-library/jest-dom** - 커스텀 matcher

## 테스트 파일 구조

### 컴포넌트 테스트

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()

      render(<Button onClick={onClick}>Click</Button>)
      await user.click(screen.getByRole('button'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has accessible name', () => {
      render(<Button aria-label="Submit">→</Button>)
      expect(screen.getByRole('button')).toHaveAccessibleName('Submit')
    })
  })

  describe('Edge Cases', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Click</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })
})
```

### Hook 테스트

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCustomHook } from './use-custom-hook'

describe('useCustomHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useCustomHook())
    expect(result.current.value).toBe(expected)
  })

  it('updates state', async () => {
    const { result } = renderHook(() => useCustomHook())

    act(() => result.current.setValue('new'))

    await waitFor(() => {
      expect(result.current.value).toBe('new')
    })
  })
})
```

## 테스트 커버리지

다음 항목을 반드시 포함:

1. **Rendering** - 렌더링, props 표시
2. **Interactions** - 클릭, 입력, 키보드
3. **Accessibility** - ARIA, role, 접근성
4. **Edge Cases** - 로딩, 에러, 빈 상태

## Query 우선순위 (React Testing Library)

1. `getByRole` ⭐ (가장 권장)
2. `getByLabelText` ⭐
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (최후의 수단)

## 파일 네이밍

- 컴포넌트: `button.test.tsx`
- Hook: `use-auth.test.ts`
- 유틸: `format-date.test.ts`
- 통합: `auth-flow.integration.test.tsx`

## Mocking 패턴

### API Mock

```typescript
vi.mock('@/lib/api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: '1', name: 'Test' })
}))
```

### Next.js Router Mock

```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn()
  })
}))
```

### Zustand Store Mock

```typescript
beforeEach(() => {
  useStore.setState({ count: 0 })
})
```

## 베스트 프랙티스

### ✅ Do

- 사용자 관점에서 테스트 (UI 동작)
- 접근성 쿼리 사용 (getByRole, getByLabelText)
- async 인터랙션은 await 사용
- 의미있는 테스트 설명

### ❌ Don't

- 구현 세부사항 테스트 (state, className)
- container.querySelector 사용
- 라이브러리 코드 테스트
- getByTestId 남용

## 생성되는 테스트 구조

```
src/components/ui/
├── button.tsx
└── button.test.tsx          # ← /test 명령어로 생성

describe('Button', () => {
  describe('Rendering', () => { ... })
  describe('Interactions', () => { ... })
  describe('Accessibility', () => { ... })
  describe('Edge Cases', () => { ... })
})
```

## 명령어

```bash
pnpm test              # 테스트 실행
pnpm test:watch        # Watch 모드
pnpm test:coverage     # 커버리지 리포트
```

## 커버리지 목표

- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

---

**Version**: 1.0.0