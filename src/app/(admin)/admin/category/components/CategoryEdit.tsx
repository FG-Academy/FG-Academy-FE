import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { useCategoryMutation } from "../hooks/useCategoryMutation";

const CategoryFormSchema = z.object({
  categories: z.array(
    z.object({
      categoryId: z.number().optional(),
      name: z.string().nonempty("카테고리 이름을 입력하세요."),
      order: z.number(),
    })
  ),
});

interface Category {
  categoryId?: number;
  name: string;
  order: number;
}

type Props = {
  categoriesInfo: Category[];
};

export default function CategoryEdit({ categoriesInfo }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      categories: categoriesInfo.length > 0 ? categoriesInfo : [],
    },
  });

  const { fields, move, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });
  const {
    formState: { dirtyFields },
  } = form;

  const onAddCategory = () => {
    const newCategoryOrder = fields.length + 1;
    append({
      name: "",
      order: newCategoryOrder,
    });
  };

  const onRemoveCategory = (index: number) => {
    if (confirm("정말로 이 카테고리를 삭제하시겠습니까?")) {
      remove(index);

      const updatedCategories = fields.slice();
      updatedCategories.splice(index, 1);

      const categoriesWithUpdatedOrder = updatedCategories.map(
        (category, idx) => ({
          ...category,
          order: idx + 1,
        })
      );

      form.setValue("categories", categoriesWithUpdatedOrder, {
        shouldDirty: true,
      });
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const newFields = Array.from(fields);
    const [removed] = newFields.splice(source.index, 1);
    newFields.splice(destination.index, 0, removed);

    const updatedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1,
    }));
    form.setValue("categories", updatedFields, { shouldDirty: true });
  };

  const { mutate } = useCategoryMutation(accessToken);

  const onSubmit = async (data: z.infer<typeof CategoryFormSchema>) => {
    if (Object.keys(dirtyFields).length > 0) {
      mutate(data.categories);
    } else {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
      console.log("No changes detected, no mutation occurred.");
    }
  };

  return (
    <Form {...form}>
      <form
        id="categoryEditForm"
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-1/2 border h-full border-gray-300 space-y-4 p-12 rounded-lg"
      >
        <div className="flex justify-end">
          <Button
            onClick={onAddCategory}
            className="mb-4 bg-green-500 text-white rounded-md"
          >
            카테고리 추가
          </Button>
        </div>
        <div className="overflow-y-auto h-4/5">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(droppableProvided) => (
                <div
                  className="space-y-2 overflow-y-auto"
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-2 bg-white p-4 space-y-2 rounded-xl border-gray-300 border-dashed"
                        >
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-base font-bold">
                              카테고리 {index + 1}
                            </FormLabel>
                            <Button
                              variant="ghost"
                              onClick={() => onRemoveCategory(index)}
                              className="border border-red-600 rounded-md text-red-600"
                            >
                              <Trash size={20} className="mr-1" />
                              삭제
                            </Button>
                          </div>
                          <FormField
                            control={form.control}
                            name={`categories.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                {/* <FormLabel className="text-base font-bold">
                                  카테고리 이름
                                </FormLabel> */}
                                <FormControl>
                                  <Input
                                    {...field}
                                    {...form.register(
                                      `categories.${index}.name`
                                    )}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Button className="flex w-full mt-10" type="submit">
          카테고리 저장
        </Button>
      </form>
    </Form>
  );
}
