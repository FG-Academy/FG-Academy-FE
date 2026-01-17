# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-02
**Commit:** 01acd24
**Branch:** feature/fsd

## OVERVIEW

Next.js 14 (App Router) LMS platform for "꽃동산 아카데미" using **Feature-Sliced Design (FSD)** with numbered layer prefixes. Stack: TypeScript, TanStack Query v5, NextAuth v5, Zustand, Tailwind CSS, shadcn/ui.

## STRUCTURE

```
FG-Academy-FE/
├── app/                    # Next.js App Router (thin wrappers → src/2.pages)
│   ├── (main)/             # Public/student routes
│   ├── (admin)/            # Admin panel routes
│   └── (lecture)/          # Immersive lecture player
├── src/
│   ├── 1.app/              # Global providers (Auth, ReactQuery)
│   ├── 2.pages/            # Page compositions
│   ├── 3.widgets/          # Complex UI blocks (header, footer, lecture-player)
│   ├── 4.features/         # User actions (login, enroll, CRUD)
│   ├── 5.entities/         # Business domain (course, quiz, user)
│   ├── 6.shared/           # Utilities, API client, UI components
│   └── store/              # Zustand stores (legacy, being migrated)
├── auth.ts                 # NextAuth v5 config with JWT refresh
└── middleware.ts           # Route protection + RBAC
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new page | `src/2.pages/{name}/` then `app/(group)/` | Page exports from index.ts |
| Add user action | `src/4.features/{action-name}/` | CRUD, form submissions |
| Add data entity | `src/5.entities/{entity}/` | Types, queries, display UI |
| Add shared component | `src/6.shared/ui/` | Or `ui/shadcn/` for primitives |
| Modify auth flow | `auth.ts`, `middleware.ts` | JWT callbacks, route guards |
| Add admin feature | `src/4.features/admin/{feature}/` | Separate admin namespace |
| API calls | `src/6.shared/api/apiClient.ts` | Auto-injects auth tokens |

## CONVENTIONS

### FSD Layer Rules (CRITICAL)
```
Import direction: pages → widgets → features → entities → shared
                    ↓         ↓          ↓          ↓
                 shared    shared     shared     shared
```
- **NEVER** import from higher layers (entities cannot import features)
- **NEVER** cross-import within same layer (feature A cannot import feature B)
- Each slice exports via `index.ts` (Public API pattern)

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Folders | kebab-case | `login-user/`, `course-detail/` |
| Components | PascalCase | `LoginForm.tsx`, `CourseList.tsx` |
| API files | kebab-case | `get-courses.ts`, `use-login-mutation.ts` |
| Types | `.type.ts` | `course.type.ts` |
| Queries | `.queries.ts` | `course.queries.ts` |
| Schemas | `.schema.ts` | `login.schema.ts` |

### Data Fetching Patterns
```typescript
// Entity queries (src/5.entities/{name}/api/{name}.queries.ts)
export const courseQueries = {
  all: () => ["course"],
  list: () => queryOptions({ queryKey: [...courseQueries.all(), "list"], queryFn: getCourses }),
  detail: (id: number) => queryOptions({ queryKey: [...courseQueries.all(), id], queryFn: () => getCourseDetail(id) }),
};

// Feature mutations (src/4.features/{name}/api/use-{name}-mutation.ts)
export const useLoginMutation = () => useMutation({ mutationFn: login, onSuccess: ... });
```

### Path Aliases
```typescript
import { Button } from "@/6.shared/ui";
import { courseQueries } from "@/5.entities/course";
import { LoginForm } from "@/4.features/login-user";
import { auth } from "@auth";  // Special alias for auth.ts
```

## ANTI-PATTERNS (THIS PROJECT)

| DO NOT | Reason |
|--------|--------|
| Import between same-layer slices | Violates FSD isolation |
| Put new Zustand stores in `src/store/` | Legacy location; use `4.features/{name}/model/` |
| Use `fetch()` directly | Use `apiClient` (auto-handles auth tokens) |
| Create components in `app/` | Use `src/2.pages/` or `src/3.widgets/` |
| Hardcode API URLs | Use `SERVER_API_URL` from `@/6.shared/config` |

## AUTH & ROUTING

### Protected Routes (middleware.ts)
- `/qna/*`, `/me/*` - Requires login
- `/course/:id/*` - Requires enrollment in that course
- `/admin/*` - Requires role: `admin`, `tutor`, or `manager`

### Admin RBAC
| Role | Allowed Paths |
|------|---------------|
| `admin` | All `/admin/*` |
| `tutor` | `/admin/quizzes/descriptive` only |
| `manager` | `/admin/videos`, `/admin/quizzes/register` |

### Token Refresh
- JWT auto-refreshes in `auth.ts` `jwt` callback
- On failure, `AuthProvider` triggers logout via `RefreshAccessTokenError`

## COMMANDS

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm start        # Start production server
```

## NOTES

- **Rendering Strategy**: Hybrid SSR/CSR. Data-dependent areas use Server Components; interactive areas use Client Components.
- **Image Handling**: Use `getImageUrl()` from `@/6.shared/lib` for S3/CDN URLs.
- **Form Validation**: Zod schemas in `{feature}/model/{name}.schema.ts` with `react-hook-form`.
- **No Tests**: Testing infrastructure not yet set up.
- **Korean UI**: Site language is Korean ("꽃동산 아카데미" = Flower Garden Academy).
