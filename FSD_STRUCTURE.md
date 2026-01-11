# FG Academy FSD (Feature-Sliced Design) 구조 가이드

이 문서는 FG Academy 프론트엔드 프로젝트의 FSD 아키텍처 구조와 컨벤션을 정리한 문서입니다.

---

## 목차

1. [전체 레이어 구조](#1-전체-레이어-구조)
2. [각 레이어별 상세 구조](#2-각-레이어별-상세-구조)
3. [Import 규칙](#3-import-규칙)
4. [네이밍 컨벤션](#4-네이밍-컨벤션)
5. [주요 패턴](#5-주요-패턴)
6. [마이그레이션 체크리스트](#6-마이그레이션-체크리스트)

---

## 1. 전체 레이어 구조

프로젝트는 `src/` 폴더 내에서 **숫자 접두사**를 사용하여 FSD 레이어를 구분합니다:

```
src/
├── 1.app/       # 앱 설정, 프로바이더
├── 2.pages/     # 페이지 컴포넌트
├── 3.widgets/   # 위젯 - 복합 UI 블록
├── 4.features/  # 기능 - 사용자 시나리오/액션
├── 5.entities/  # 엔티티 - 비즈니스 도메인
└── 6.shared/    # 공유 리소스
```

### 의존성 규칙 (단방향)

```
pages → widgets → features → entities → shared
  ↓        ↓          ↓          ↓
shared   shared     shared     shared
```

- 상위 레이어는 하위 레이어만 import 가능
- 동일 레이어 내 다른 슬라이스 import 금지 (cross-import 금지)
- `shared`는 모든 레이어에서 import 가능

---

## 2. 각 레이어별 상세 구조

### 2.1 `1.app/` - App Layer

**역할:** 애플리케이션 전역 설정, 프로바이더

```
1.app/
└── providers/
    ├── AuthProvider.tsx
    ├── ReactQueryProvider.tsx
    └── index.ts
```

**index.ts 패턴:**

```typescript
export { AuthProvider } from "./AuthProvider";
export { ReactQueryProviders } from "./ReactQueryProvider";
```

---

### 2.2 `2.pages/` - Pages Layer

**역할:** 페이지 단위 컴포넌트, 레이아웃 구성

```
2.pages/
└── [page-name]/
    ├── ui/
    │   └── [PageName]Page.tsx
    └── index.ts
```

**예시 슬라이스:**

- `main/` - 메인 페이지
- `course/` - 강의 목록 페이지
- `course-detail/` - 강의 상세 페이지
- `login/` - 로그인 페이지
- `signup/` - 회원가입 페이지
- `announcement/` - 공지사항 목록 페이지
- `announcement-detail/` - 공지사항 상세 페이지
- `question/` - 질문 목록 페이지
- `my-course/` - 내 강의 페이지

**index.ts 패턴:**

```typescript
export { MainPageContent, MainLayout } from "./ui/MainPage";
```

**Next.js App Router 연동:**

```
app/(main)/course/page.tsx → import { CoursePage } from "@/2.Pages/course"
```

---

### 2.3 `3.widgets/` - Widgets Layer

**역할:** 독립적인 복합 UI 블록 (여러 entities/features 조합)

```
3.widgets/
└── [widget-name]/
    ├── ui/
    │   ├── [WidgetName].tsx        # 메인 위젯 (외부 노출)
    │   ├── [SubComponent].tsx      # 내부 컴포넌트 (외부 노출 X)
    │   └── ...
    └── index.ts
```

**예시 슬라이스:**

- `header/` - 헤더 컴포넌트
- `footer/` - 푸터 컴포넌트
- `course-detail/` - 강의 상세 위젯
- `my-quiz/` - 내 퀴즈 위젯

**index.ts 패턴:**

```typescript
// 외부에는 메인 위젯만 노출
export { MyQuizWidget } from "./ui/MyQuizWidget";

// 내부 컴포넌트 (QuizSidebar, QuizListPanel 등)는 노출하지 않음
```

---

### 2.4 `4.features/` - Features Layer

**역할:** 사용자 시나리오/액션 (CRUD 작업, 인증 등)

```
4.features/
└── [feature-name]/
    ├── api/
    │   ├── [action].ts                  # API 호출 함수
    │   └── use-[action]-mutation.ts     # React Query mutation hook
    ├── model/
    │   ├── [name].schema.ts             # Zod 스키마
    │   └── [name].store.ts              # Zustand store (선택)
    ├── ui/
    │   └── [FeatureComponent].tsx       # UI 컴포넌트 (Form, Button 등)
    └── index.ts
```

**예시 슬라이스:**

- `login-user/` - 로그인 기능
- `signup-user/` - 회원가입 기능
- `enroll-course/` - 강의 수강신청
- `create-announcement/` - 공지사항 생성
- `delete-announcement/` - 공지사항 삭제
- `edit-profile/` - 프로필 수정
- `question-answer/` - 질문 답변
- `reset-password/` - 비밀번호 재설정

**index.ts 패턴:**

```typescript
// UI
export { LoginForm } from "./ui/LoginForm";

// API hooks
export { useLoginMutation } from "./api/use-login-mutation";

// Model (필요시)
export { LoginSchema, type LoginFormValues } from "./model/login.schema";
```

---

### 2.5 `5.entities/` - Entities Layer

**역할:** 비즈니스 도메인 엔티티 (데이터 모델, 조회 API, 표시용 UI)

```
5.entities/
└── [entity-name]/
    ├── api/
    │   ├── [entity].queries.ts     # React Query queryOptions (Query Factory)
    │   └── get-[entity].ts         # API 호출 함수
    ├── model/
    │   ├── [entity].type.ts        # TypeScript 타입/인터페이스
    │   └── [entity].constants.ts   # 도메인 상수 (선택)
    ├── lib/                         # 유틸 함수 (선택)
    │   └── [util].ts
    ├── ui/
    │   └── [EntityComponent].tsx   # 표시용 UI 컴포넌트
    └── index.ts
```

**예시 슬라이스:**

- `course/` - 강의
- `lecture/` - 강의 강좌
- `quiz/` - 퀴즈
- `user/` - 사용자
- `announcement/` - 공지사항
- `enrollment/` - 수강신청
- `question/` - 질문

**index.ts 패턴 (카테고리별 주석 사용):**

```typescript
// API
export { quizQueries } from "./api/quiz.queries";

// Model
export * from "./model/quiz.type";
export * from "./model/quiz.constants";

// Lib
export { getLatestSubmit } from "./lib/getLatestSubmit";
export type { QuizSubmitPick } from "./lib/getLatestSubmit";

// UI
export { QuizCard } from "./ui/QuizCard";
export { QuizStatCard } from "./ui/QuizStatCard";
```

---

### 2.6 `6.shared/` - Shared Layer

**역할:** 공유 리소스 (API 클라이언트, UI 컴포넌트, 유틸리티, 설정)

```
6.shared/
├── api/
│   ├── apiClient.ts           # API 클라이언트 클래스
│   ├── apiClient.type.ts      # 타입
│   └── index.ts
├── config/
│   ├── auth.ts                # 인증 관련 상수
│   ├── constants.ts           # 전역 상수
│   └── index.ts
├── lib/
│   ├── hooks/
│   │   ├── useRefreshTokenGuard.ts
│   │   └── index.ts
│   ├── utils.ts               # 유틸 함수 (cn, formatDate 등)
│   ├── queryClient.ts         # React Query 클라이언트
│   └── index.ts
└── ui/
    ├── shadcn/
    │   ├── ui/                # shadcn/ui 컴포넌트
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   └── ...
    │   └── index.ts           # 모든 shadcn 컴포넌트 re-export
    ├── Logo.tsx
    ├── ImageWithFallback.tsx
    └── index.ts
```

**index.ts 패턴:**

```typescript
// ui/index.ts
export * from "./shadcn";
export { Logo } from "./Logo";
export { ImageWithFallback } from "./ImageWithFallback";

// lib/index.ts
export { useRefreshTokenGuard } from "./hooks";
export { cn, formatDate, transformDate } from "./utils";
export { queryClient } from "./queryClient";
```

---

## 3. Import 규칙

### 3.1 Path Alias

```typescript
// FSD 레이어 import (절대 경로)
import { Button, Form } from "@/6.shared/ui";
import { CourseList, courseQueries } from "@/5.entities/course";
import { LoginForm } from "@/4.features/login-user";
import { MyQuizWidget } from "@/3.widgets/my-quiz";
import { MainPageContent } from "@/2.Pages/main";
import { AuthProvider } from "@/1.app/providers";

// 동일 슬라이스 내부 (상대 경로)
import { courseQueries } from "../api/course.queries";
import { CourseType } from "../model/course.type";
```

### 3.2 Import 순서 권장

```typescript
// 1. React/Next.js
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// 2. 외부 라이브러리
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// 3. FSD 레이어 (상위 → 하위 순)
import { MyQuizWidget } from "@/3.widgets/my-quiz";
import { LoginForm } from "@/4.features/login-user";
import { CourseList, courseQueries } from "@/5.entities/course";
import { Button, cn } from "@/6.shared/ui";

// 4. 동일 슬라이스 내부
import { CourseSchema } from "../model/course.schema";
```

---

## 4. 네이밍 컨벤션

| 유형          | 네이밍                    | 예시                                   |
| ------------- | ------------------------- | -------------------------------------- |
| 폴더명        | kebab-case                | `course-detail/`, `login-user/`        |
| 컴포넌트 파일 | PascalCase                | `CourseList.tsx`, `LoginForm.tsx`      |
| API 함수 파일 | kebab-case                | `get-courses.ts`, `create-question.ts` |
| Hook 파일     | kebab-case + use 접두사   | `use-signup-mutation.ts`               |
| 타입 파일     | kebab-case + `.type`      | `course.type.ts`                       |
| 상수 파일     | kebab-case + `.constants` | `quiz.constants.ts`                    |
| Query 파일    | kebab-case + `.queries`   | `course.queries.ts`                    |
| 스키마 파일   | kebab-case + `.schema`    | `login.schema.ts`                      |
| Store 파일    | kebab-case + `.store`     | `signup.store.ts`                      |

---

## 5. 주요 패턴

### 5.1 Query Factory Pattern (entities)

```typescript
// course.queries.ts
import { queryOptions } from "@tanstack/react-query";
import { getCourses, getCourseDetail } from "./get-courses";

export const courseQueries = {
  all: () => ["course"],
  lists: () => [...courseQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...courseQueries.lists()],
      queryFn: () => getCourses(),
    }),
  detail: (courseId: number) =>
    queryOptions({
      queryKey: [...courseQueries.all(), courseId, "detail"],
      queryFn: () => getCourseDetail(courseId),
    }),
};
```

### 5.2 Mutation Hook Pattern (features)

```typescript
// use-login-mutation.ts
import { useMutation } from "@tanstack/react-query";
import { login } from "./login";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // 성공 처리
    },
    onError: (error) => {
      // 에러 처리
    },
  });
};
```

### 5.3 상수 정의 패턴 (entities/model)

```typescript
// quiz.constants.ts
import { FilterType, FILTER_TYPE } from "./quiz.type";

export type ColorVariant = "blue" | "green" | "red" | "purple" | "gray";

export const STAT_CARD_COLORS: Record<ColorVariant, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  // ...
} as const;

export const FILTER_COLOR_MAP: Record<FilterType, ColorVariant> = {
  [FILTER_TYPE.전체]: "gray",
  [FILTER_TYPE.정답]: "green",
  // ...
} as const;
```

### 5.4 Public API Pattern (index.ts)

모든 슬라이스는 `index.ts`를 통해 외부에 노출할 것만 export:

```typescript
// entities/quiz/index.ts

// API
export { quizQueries } from "./api/quiz.queries";

// Model
export * from "./model/quiz.type";
export * from "./model/quiz.constants";

// Lib
export { getLatestSubmit } from "./lib/getLatestSubmit";

// UI
export { QuizCard } from "./ui/QuizCard";
```

---

## 6. 마이그레이션 체크리스트

레거시 코드를 FSD로 마이그레이션할 때 확인할 사항:

### 슬라이스 생성 시

- [ ] 적절한 레이어 선택 (entity vs feature vs widget)
- [ ] 폴더 구조 생성 (`api/`, `model/`, `ui/`, `lib/`)
- [ ] `index.ts` Public API 정의
- [ ] 타입/상수를 `model/`로 분리

### Import 정리

- [ ] 레거시 경로 (`../../../components/ui/`) → FSD 경로 (`@/6.shared/ui`)
- [ ] 의존성 방향 확인 (상위 → 하위만 허용)
- [ ] Cross-import 제거 (같은 레이어 내 다른 슬라이스 import 금지)

### 코드 분리 기준

| 기준                           | 레이어     |
| ------------------------------ | ---------- |
| 비즈니스 도메인 데이터/조회    | `entities` |
| 사용자 액션 (생성/수정/삭제)   | `features` |
| 여러 entities/features 조합 UI | `widgets`  |
| 전역 공유 리소스               | `shared`   |

### 레거시 코드 위치 (마이그레이션 필요)

```
src/
├── hooks/          → 6.shared/lib/hooks 또는 관련 slice
├── lib/            → 6.shared/lib
├── model/          → 5.entities/[entity]/model
├── store/          → 4.features/[feature]/model 또는 5.entities/[entity]/model
├── components/     → 6.shared/ui 또는 관련 slice/ui
└── app/(home)/     → 2.pages + App Router 연동
```

---

## 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD with Next.js App Router](https://feature-sliced.design/docs/guides/tech/with-nextjs)
