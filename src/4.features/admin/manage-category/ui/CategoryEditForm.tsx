"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/6.shared/ui/shadcn/ui/form";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { toast } from "@/6.shared/ui";
import { useUpdateCategoriesMutation } from "../api/use-update-categories-mutation";
import {
  CategoryFormSchema,
  type CategoryFormValues,
} from "../model/category-form.schema";
import type { ICategory } from "@/5.entities/admin/category";

interface CategoryEditFormProps {
  categoriesInfo: ICategory[];
}

export function CategoryEditForm({ categoriesInfo }: CategoryEditFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      categories: categoriesInfo.length > 0 ? categoriesInfo : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  const onDragEnd = (result: DropResult) => {
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

  const { mutate } = useUpdateCategoriesMutation();

  const onSubmit = async (data: CategoryFormValues) => {
    if (Object.keys(dirtyFields).length > 0) {
      mutate(data.categories);
    } else {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        id="categoryEditForm"
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            총 {fields.length}개 카테고리
          </div>
          <Button
            type="button"
            onClick={onAddCategory}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            카테고리 추가
          </Button>
        </div>

        {/* Category List */}
        <div className="p-4 max-h-[500px] overflow-y-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(droppableProvided) => (
                <div
                  className="space-y-3"
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            bg-white border rounded-lg p-4
                            ${snapshot.isDragging 
                              ? "border-gray-400 shadow-lg" 
                              : "border-gray-200 hover:border-gray-300"
                            }
                            transition-all duration-200
                          `}
                        >
                          <div className="flex items-center gap-3">
                            {/* Drag Handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                            >
                              <GripVertical className="w-5 h-5" />
                            </div>

                            {/* Order Badge */}
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                              {index + 1}
                            </div>

                            {/* Input */}
                            <FormField
                              control={form.control}
                              name={`categories.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      {...field}
                                      {...form.register(
                                        `categories.${index}.name`
                                      )}
                                      placeholder="카테고리 이름"
                                      className="border-gray-200 focus:ring-gray-900 focus:border-transparent"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Delete Button */}
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => onRemoveCategory(index)}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {fields.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              등록된 카테고리가 없습니다.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            변경사항 저장
          </Button>
        </div>
      </form>
    </Form>
  );
}
