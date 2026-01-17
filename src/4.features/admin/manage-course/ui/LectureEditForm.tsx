"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Trash2,
  Plus,
  GripVertical,
  Video,
  FileText,
  PlayCircle,
} from "lucide-react";

import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { toast } from "@/6.shared/ui/shadcn/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/6.shared/ui/shadcn/ui/form";

import type { Lecture } from "@/5.entities/lecture";
import { useUpdateLecturesMutation } from "../api/use-update-lectures-mutation";
import {
  LectureFormSchema,
  type LectureFormValues,
} from "../model/course-form.schema";
import type { UseFormReturn } from "react-hook-form";

interface LectureEditFormProps {
  lecturesInfo: Lecture[];
  courseId: number;
}

interface SortableLectureItemProps {
  id: string;
  index: number;
  form: UseFormReturn<LectureFormValues>;
  onRemove: (index: number) => void;
}

function SortableLectureItem({
  id,
  index,
  form,
  onRemove,
}: SortableLectureItemProps) {
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
        group bg-white rounded-xl border transition-all
        ${
          isDragging
            ? "border-primary-blue shadow-lg shadow-primary-blue/10 z-10"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
        <div
          {...attributes}
          {...listeners}
          className="p-1 rounded hover:bg-gray-200 cursor-grab active:cursor-grabbing transition-colors"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-semibold">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-gray-700">강</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="h-8 px-2 text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        <FormField
          control={form.control}
          name={`lectures.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                강의 제목 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="강의 제목을 입력하세요"
                  className="h-10 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`lectures.${index}.videoLink`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-gray-400" />
                유튜브 영상 코드 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="예: dQw4w9WgXcQ"
                  className="h-10 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20 font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export function LectureEditForm({
  lecturesInfo,
  courseId,
}: LectureEditFormProps) {
  const { mutate, isPending } = useUpdateLecturesMutation(courseId);

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(LectureFormSchema),
    mode: "onChange",
    defaultValues: {
      lectures:
        lecturesInfo.length > 0
          ? lecturesInfo
          : [
              {
                title: "",
                videoLink: "",
                lectureNumber: 1,
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lectures",
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      const newFields = arrayMove(fields, oldIndex, newIndex);
      const updatedFields = newFields.map((field, index) => ({
        ...field,
        lectureNumber: index + 1,
      }));

      form.setValue("lectures", updatedFields, { shouldDirty: true });
    }
  };

  const handleAddLecture = () => {
    append({
      lectureNumber: fields.length + 1,
      title: "",
      videoLink: "",
    });
  };

  const handleRemoveLecture = (index: number) => {
    if (
      confirm("정말로 삭제하시겠습니까? (등록된 강의, 퀴즈 모두 삭제됩니다.)")
    ) {
      try {
        remove(index);

        const updatedLectures = fields.slice();
        updatedLectures.splice(index, 1);

        const lecturesWithUpdatedNumbers = updatedLectures.map(
          (lecture, idx) => ({
            ...lecture,
            lectureNumber: idx + 1,
          })
        );

        form.setValue("lectures", lecturesWithUpdatedNumbers);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "요청이 불안정합니다.",
          description: "잠시 후 다시 시도해주세요.",
        });
        console.error("Failed to delete lecture:", error);
      }
    }
  };

  const onSubmit = async (data: LectureFormValues) => {
    if (Object.keys(dirtyFields).length > 0) {
      mutate(data);
    } else {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-primary-blue" />
            강의 목록
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            드래그하여 순서를 변경할 수 있습니다
          </p>
        </div>
        <Button
          type="button"
          onClick={handleAddLecture}
          className="h-9 px-4 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          강의 추가
        </Button>
      </div>

      {/* Lecture List */}
      <Form {...form}>
        <form
          id="courseLectureEdit"
          autoComplete="off"
          autoFocus={false}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-320px)]">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  등록된 강의가 없습니다
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  위의 &apos;강의 추가&apos; 버튼을 클릭하여 강의를 추가하세요
                </p>
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
                      <SortableLectureItem
                        key={field.id}
                        id={field.id}
                        index={index}
                        form={form}
                        onRemove={handleRemoveLecture}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
            >
              {isPending ? "저장 중..." : "강의 목록 저장"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
