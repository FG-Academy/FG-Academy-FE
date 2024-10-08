"use client";

import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectGroup,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormSchema } from "../lib/CourseFormSchema";
import { useCourseMutation } from "../hook/useCourseMutation";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { userLevelSettingOptions } from "@/app/types/type";
import { Textarea } from "@/components/ui/textarea";
import { useFetchAllCategoriesQuery } from "../../category/hooks/useCategoryQuery";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>();
  const { data: categories } = useFetchAllCategoriesQuery(accessToken);

  const form = useForm<z.infer<typeof CourseFormSchema>>({
    resolver: zodResolver(CourseFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      curriculum: "",
      openDate: "",
      finishDate: "",
      level: "",
      // thumbnailImage: null,
    },
  });

  const { mutate } = useCourseMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 선택된 파일이 있는지 확인
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFile(file);
        // form.setValue("thumbnailImage", file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof CourseFormSchema>) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "thumbnailImage") {
        formData.append("thumbnailImage", imageFile as Blob);
      } else {
        formData.append(key, data[key as keyof typeof data]);
      }
    });

    mutate({ accessToken, data: formData });
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen p-2 py-8">
      <X
        onClick={() => router.push("/admin/videos")}
        className="absolute w-8 h-8 rounded-full right-10 top-10 hover:bg-black hover:bg-opacity-20"
      />
      <h2 className="mb-4 text-2xl">코스 등록</h2>
      <Form {...form}>
        <form
          id="userInfoDialog"
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
                  {/* <Input placeholder="코스 설명을 입력해주세요." {...field} /> */}
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
                      {categories?.map((ele, index) => (
                        <SelectItem key={index} value={ele.name}>
                          {ele.name}
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
                  {/* <Input
                    autoComplete="off"
                    placeholder="최소 수강 레벨을 입력해주세요."
                    {...field}
                  /> */}
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
                        {userLevelSettingOptions.map((ele, index) => (
                          <SelectItem key={index} value={ele.value}>
                            {ele.value}
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
          <Button className="w-full" type="submit">
            코스 등록
          </Button>
        </form>
      </Form>
    </div>
  );
}
