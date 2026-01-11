# 5.entities Layer

Business domain models: types, query factories, display-only UI.

## STRUCTURE

Each entity slice follows:
```
{entity}/
├── api/
│   ├── {entity}.queries.ts    # Query Factory (queryOptions)
│   └── get-{entity}.ts        # API fetch functions
├── model/
│   ├── {entity}.type.ts       # TypeScript types/interfaces
│   └── {entity}.constants.ts  # Domain constants (optional)
├── lib/                        # Entity-specific utilities (optional)
├── ui/                         # Display-only components (no mutations)
└── index.ts                    # Public API exports
```

## ENTITIES

| Entity | Purpose |
|--------|---------|
| `course` | Course catalog, details |
| `lecture` | Individual lectures within courses |
| `quiz` | Quiz questions, submissions, stats |
| `enrollment` | User-course enrollment status |
| `announcement` | Site announcements |
| `question` | Q&A forum questions |
| `user` | User profile data |
| `admin/*` | Admin-specific versions (user, quiz, course, category) |

## QUERY FACTORY PATTERN

```typescript
// course.queries.ts
export const courseQueries = {
  all: () => ["course"],
  lists: () => [...courseQueries.all(), "list"],
  list: () => queryOptions({
    queryKey: [...courseQueries.lists()],
    queryFn: () => getCourses(),
  }),
  detail: (courseId: number) => queryOptions({
    queryKey: [...courseQueries.all(), courseId, "detail"],
    queryFn: () => getCourseDetail(courseId),
  }),
};

// Usage in components
const { data } = useSuspenseQuery(courseQueries.detail(courseId));
```

## CONVENTIONS

- Queries are READ-ONLY (no mutations here - those go in `4.features`)
- UI components are display-only (no form submissions)
- Export categories in `index.ts`: `// API`, `// Model`, `// UI`, `// Lib`
- Admin entities in `admin/` subdirectory mirror user-facing structure

## ANTI-PATTERNS

| DO NOT | Reason |
|--------|--------|
| Add mutations here | Mutations belong in `4.features` |
| Import from `4.features` | Violates FSD layer direction |
| Put form components here | Forms with actions → `4.features` |
