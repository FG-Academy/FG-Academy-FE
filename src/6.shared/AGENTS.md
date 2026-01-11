# 6.shared Layer

Cross-cutting utilities and UI primitives. Importable from any FSD layer.

## STRUCTURE

```
6.shared/
├── api/           # ApiClient class (auto-injects auth tokens)
├── config/        # Environment constants (SERVER_API_URL, auth settings)
├── lib/           # Utilities: cn(), getImageUrl(), date formatters
│   └── hooks/     # Shared hooks: useIsMobile, useDebouncedValue
└── ui/
    ├── shadcn/    # shadcn/ui primitives (Button, Dialog, Form, etc.)
    └── admin/     # Admin-specific UI components
```

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Add shadcn component | `ui/shadcn/ui/` then export in `ui/shadcn/index.ts` |
| Add shared hook | `lib/hooks/` then export in `lib/hooks/index.ts` |
| Modify API behavior | `api/apiClient.ts` |
| Add utility function | `lib/utils.ts` or new file in `lib/` |
| Add admin UI primitive | `ui/admin/` |

## API CLIENT

```typescript
import { apiClient } from "@/6.shared/api";

// Auto-handles: base URL, versioning, auth token injection
await apiClient.get<Course[]>("courses");
await apiClient.post("enrollments", { courseId: 1 });
await apiClient.postFormData("upload", formData);  // File uploads
```

- Server-side: Uses `auth()` for token
- Client-side: Uses `getSession()` for token
- Default API version: `v1` (prefix: `/api/v1/`)

## CONVENTIONS

- Export everything via `index.ts` (Public API)
- Use `cn()` for Tailwind class merging
- shadcn components live in `ui/shadcn/ui/`, re-exported from `ui/shadcn/index.ts`
- `getImageUrl(path)` handles S3/CDN URL prefixing

## ANTI-PATTERNS

| DO NOT | DO |
|--------|-----|
| Import from `ui/shadcn/ui/button` | Import from `@/6.shared/ui` |
| Use raw `fetch()` | Use `apiClient.get/post/etc` |
| Hardcode image URLs | Use `getImageUrl()` |
