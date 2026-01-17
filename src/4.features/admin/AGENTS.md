# 4.features/admin

Admin panel features: CRUD operations for courses, users, quizzes, categories.

## STRUCTURE

```
admin/
├── manage-category/    # Category CRUD
├── manage-course/      # Course + lecture management
├── manage-quiz/        # Quiz creation, grading
└── manage-user/        # User administration
```

Each feature follows:
```
{feature}/
├── api/
│   ├── {action}.ts                # API call function
│   └── use-{action}-mutation.ts   # React Query mutation hook
├── model/
│   ├── {name}.schema.ts           # Zod validation schema
│   └── {name}.type.ts             # Feature-specific types
├── ui/                             # Feature UI components
└── index.ts
```

## FEATURES

| Feature | Actions |
|---------|---------|
| `manage-category` | Create, update, delete, reorder categories |
| `manage-course` | Course CRUD, lecture management, video uploads |
| `manage-quiz` | Quiz CRUD, question management, grading |
| `manage-user` | User list, role assignment, enrollment management |

## CONVENTIONS

- Mutations use `useMutation` from TanStack Query
- Forms use `react-hook-form` + Zod schemas
- File uploads use `apiClient.postFormData()` / `patchFormData()`
- Invalidate related queries on mutation success

## MUTATION PATTERN

```typescript
// use-create-course-mutation.ts
export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminCourseQueries.all() });
    },
  });
};
```

## RBAC CONTEXT

Admin features are protected by middleware:
- `admin` role: Full access
- `tutor` role: Quiz grading only (`/admin/quizzes/descriptive`)
- `manager` role: Videos + quiz registration only
