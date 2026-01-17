import { z } from "zod";

export const CategoryFormSchema = z.object({
  categories: z.array(
    z.object({
      categoryId: z.number().optional(),
      name: z.string().nonempty("카테고리 이름을 입력하세요."),
      order: z.number(),
    })
  ),
});

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;
