"use client";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Textarea } from "@/6.shared/ui/shadcn/ui/textarea";
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

import { uploadFileToS3 } from "@/6.shared/api";
import { userLevelSettingOptions } from "@/5.entities/user";
import { categoryQueries } from "@/5.entities/admin/category";
import { useCreateCourseMutation } from "../api/use-create-course-mutation";
import {
  CourseFormSchema,
  type CourseFormValues,
} from "../model/course-form.schema";

export function CourseRegisterForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const { data: categories } = useQuery(categoryQueries.all());
  const { mutate, isPending } = useCreateCourseMutation();

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(CourseFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      curriculum: "",
      openDate: "",
      finishDate: "",
      level: "",
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFile(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CourseFormValues) => {
    let thumbnailImagePath: string | undefined;

    if (imageFile) {
      setIsUploading(true);
      try {
        thumbnailImagePath = await uploadFileToS3(imageFile);
      } catch (error) {
        console.error("Failed to upload image:", error);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    mutate({
      title: data.title,
      description: data.description,
      curriculum: data.curriculum,
      openDate: data.openDate,
      finishDate: data.finishDate,
      level: data.level,
      thumbnailImagePath,
    });
  };

  const isSubmitting = isPending || isUploading;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen p-2 py-8">
      <X
        onClick={() => router.push("/admin/courses")}
        className="absolute w-8 h-8 rounded-full cursor-pointer right-10 top-10 hover:bg-black hover:bg-opacity-20"
      />
      <h2 className="mb-4 text-2xl">코스 등록</h2>
      <Form {...form}>
        <form
          autoComplete="off"
          autoFocus={false}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-1/2 p-10 space-y-6 overflow-y-auto border-2 rounded-md"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  코스 이름 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="코스 이름을 입력해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  코스 설명 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="코스 설명을 입력해주세요."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="curriculum"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  코스 과정 <span className="text-red-500">*</span>
                </FormLabel>
                <Select name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="코스 과정 선택"
                    />
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
            name="openDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  시작일자 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                <FormLabel className="text-base font-bold">
                  마감일자 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  최소 수강 레벨 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select name={field.name} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        onBlur={field.onBlur}
                        ref={field.ref}
                        placeholder="최소 수강 레벨 선택"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {userLevelSettingOptions.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnailImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  썸네일 이미지 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="file" {...field} onChange={handleFileChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isUploading ? "이미지 업로드 중..." : isPending ? "등록 중..." : "코스 등록"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
