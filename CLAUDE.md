# Resustack Web

Next.js 16 App Router + React 19 + TypeScript

## 기술 스택

- **Next.js 16** (App Router, RSC)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS 4** + shadcn/ui (New York style)
- **Zustand** (상태 관리)
- **pnpm** (패키지 매니저 - 필수)

## 프로젝트 구조

```
src/
├── app/          # App Router
├── components/   # React components
│   └── ui/      # shadcn/ui
├── hooks/       # Custom hooks
├── lib/         # utils (cn 등)
└── utils/       # 유틸리티
```

## Path Aliases (필수)

```typescript
import { Button } from '@/components/ui/button'  // ✅
import { cn } from '@/lib/utils'                 // ✅
import { Button } from '../../components'        // ❌
```

`@/*` → `src/*`

## 코딩 규칙

⚠️ **성능 최적화**: `.claude/skills/react-best-practices` (Vercel v1.0.0) 준수

**CRITICAL 필수:**
- Sequential await 금지 → Promise.all() 사용
- Barrel imports 금지 (lucide-react 등) → 직접 경로 import
- 무거운 컴포넌트 → next/dynamic 사용
- Server Component 우선, 필요시에만 'use client'

**TypeScript:**
- any 금지 → unknown 또는 구체적 타입
- type 우선 (interface 대신)

**컴포넌트:**
- 200줄 이상 → 분리
- 하나의 파일에 하나의 주요 컴포넌트

## 명령어

```bash
pnpm dev     # 개발 서버
pnpm build   # 빌드
pnpm lint    # 린트
pnpm dlx shadcn@latest add [component]  # shadcn/ui 추가
```

---

**상세 규칙**: `.claude/skills/react-best-practices/SKILL.md`
