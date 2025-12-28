"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Upload,
  Calendar,
  BookOpen,
  GraduationCap,
  Eye,
  EyeOff,
  ImageIcon,
} from "lucide-react";

import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Textarea } from "@/6.shared/ui/shadcn/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/6.shared/ui/shadcn/ui/radio-group";
import { toast } from "@/6.shared/ui/shadcn/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/6.shared/ui/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6.shared/ui/shadcn/ui/select";

import { userLevelSettingOptions } from "@/5.entities/user";
import { categoryQueries } from "@/5.entities/admin/category";
import type { AdminCourseDetail } from "@/5.entities/admin/course";
import { dateFormat } from "@/6.shared/lib";
import { useUpdateCourseMutation } from "../api/use-update-course-mutation";
import {
  AdminCourseFormSchema,
  type AdminCourseFormValues,
} from "../model/course-form.schema";
import { LectureEditForm } from "./LectureEditForm";

interface CourseEditFormProps {
  courseInfo: AdminCourseDetail;
}

export function CourseEditForm({ courseInfo }: CourseEditFormProps) {
  const [enabled, setEnabled] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [preview, setPreview] = useState<{ dataUrl: string }>({
    dataUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}${courseInfo.thumbnailImagePath}`,
  });

  const { data: categories } = useQuery(categoryQueries.all());
  const { mutate, isPending } = useUpdateCourseMutation(courseInfo.courseId);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const form = useForm<AdminCourseFormValues>({
    resolver: zodResolver(AdminCourseFormSchema),
    mode: "onChange",
    defaultValues: {
      title: courseInfo.title,
      description: courseInfo.description,
      curriculum: courseInfo.category.name,
      openDate: dateFormat(new Date(courseInfo.openDate)),
      finishDate: dateFormat(new Date(courseInfo.finishDate)),
      level: courseInfo.level,
      status: courseInfo.status,
      thumbnailImage: "",
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFile(file);
        setPreview({
          dataUrl: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: AdminCourseFormValues) => {
    const formData = new FormData();

    const updatedData: Partial<AdminCourseFormValues> = {};
    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof AdminCourseFormValues;
      if (dirtyFields[fieldKey] && data[fieldKey] !== undefined) {
        updatedData[fieldKey] = data[fieldKey];
      }
    });

    Object.keys(data).forEach((key) => {
      if (key === "thumbnailImage" && imageFile) {
        formData.append("thumbnailImage", imageFile);
      } else if (Object.hasOwn(updatedData, key)) {
        const value = updatedData[key as keyof AdminCourseFormValues];
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      }
    });

    if (Object.keys(updatedData).length > 0 || imageFile) {
      mutate(formData);
    } else {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Course Info Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-blue" />
            코스 정보
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            코스의 기본 정보를 수정합니다
          </p>
        </div>

        <Form {...form}>
          <form
            autoComplete="off"
            autoFocus={false}
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto"
          >
            {/* Status Toggle */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    공개 상태
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={courseInfo.status}
                      className="flex gap-3 mt-2"
                    >
                      <label
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all
                          ${
                            field.value === "active"
                              ? "border-primary-blue bg-primary-blue/5 text-primary-blue"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }
                        `}
                      >
                        <RadioGroupItem value="active" className="sr-only" />
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">공개</span>
                      </label>
                      <label
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all
                          ${
                            field.value === "inactive"
                              ? "border-gray-600 bg-gray-50 text-gray-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }
                        `}
                      >
                        <RadioGroupItem value="inactive" className="sr-only" />
                        <EyeOff className="w-4 h-4" />
                        <span className="text-sm font-medium">비공개</span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail Image */}
            <div className="space-y-3">
              <FormLabel className="text-sm font-medium text-gray-700">
                썸네일 이미지
              </FormLabel>
              <div className="relative group">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  {preview.dataUrl ? (
                    <Image
                      src={preview.dataUrl}
                      alt="썸네일 이미지"
                      fill
                      className="object-cover"
                      priority={true}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Upload className="w-4 h-4" />
                        이미지 변경
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    코스 이름 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="코스 이름을 입력해주세요"
                      className="h-11 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    코스 설명 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="코스에 대한 설명을 입력해주세요"
                      className="min-h-[100px] rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category & Level */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="curriculum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      코스 과정 <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={courseInfo.category.name}
                    >
                      <SelectTrigger className="h-11 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20">
                        <SelectValue placeholder="과정 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map((category, index) => (
                            <SelectItem key={index} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      최소 레벨 <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={courseInfo.level}
                    >
                      <SelectTrigger className="h-11 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20">
                        <SelectValue placeholder="레벨 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {userLevelSettingOptions.map((option, index) => (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="openDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      시작일 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="h-11 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="finishDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      종료일 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="h-11 rounded-lg border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
              >
                {isPending ? "저장 중..." : "코스 정보 저장"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Lecture Edit Form */}
      <LectureEditForm
        lecturesInfo={courseInfo.lectures}
        courseId={courseInfo.courseId}
      />
    </div>
  );
}
