"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/6.shared/ui/shadcn/ui/form";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { useFieldArray, useForm, type UseFormReturn } from "react-hook-form";
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

interface SortableCategoryItemProps {
  id: string;
  index: number;
  form: UseFormReturn<CategoryFormValues>;
  onRemove: (index: number) => void;
}

function SortableCategoryItem({
  id,
  index,
  form,
  onRemove,
}: SortableCategoryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white border rounded-lg p-4
        ${
          isDragging
            ? "border-gray-400 shadow-lg z-10"
            : "border-gray-200 hover:border-gray-300"
        }
        transition-all duration-200
      `}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
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
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      const newFields = arrayMove(fields, oldIndex, newIndex);
      const updatedFields = newFields.map((field, index) => ({
        ...field,
        order: index + 1,
      }));

      form.setValue("categories", updatedFields, { shouldDirty: true });
    }
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
          {fields.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              등록된 카테고리가 없습니다.
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <SortableCategoryItem
                      key={field.id}
                      id={field.id}
                      index={index}
                      form={form}
                      onRemove={onRemoveCategory}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
