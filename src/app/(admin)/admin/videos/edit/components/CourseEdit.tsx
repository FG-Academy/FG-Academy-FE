"use client";

import { useForm } from "react-hook-form";
import { AdminCourseFormSchema } from "../../lib/CourseFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectGroup,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCourseEditMutation } from "../../hook/useCourseEditMutation";
import Image from "next/image";
import { dateFormat } from "@/lib/dateFormat";
import CourseLectureEdit from "./CourseLectureEdit";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { userLevelSettingOptions } from "@/app/types/type";
import { Textarea } from "@/components/ui/textarea";
import { AdminCourseReponse } from "../../../hooks/useAdminCourseQuery";
import { useFetchAllCategoriesQuery } from "../../category/hooks/useCategoryQuery";

type Props = {
  courseInfo: AdminCourseReponse;
};

export default function CourseEdit({ courseInfo }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const router = useRouter();

  const [preview, setPreview] = useState<{ dataUrl: string }>({
    dataUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}${courseInfo.thumbnailImagePath}`,
  });
  const [imageFile, setImageFile] = useState<File>();
  const [enabled, setEnabled] = useState(false);

  const { mutate } = useCourseEditMutation(accessToken, courseInfo.courseId);
  const { data: category } = useFetchAllCategoriesQuery(accessToken);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const form = useForm<z.infer<typeof AdminCourseFormSchema>>({
    resolver: zodResolver(AdminCourseFormSchema),
    mode: "onChange",
    defaultValues: {
      title: courseInfo.title,
      description: courseInfo.description,
      // categoryId: courseInfo.category.categoryId,
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
    // 선택된 파일이 있는지 확인
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

  const onSubmit = async (data: z.infer<typeof AdminCourseFormSchema>) => {
    // console.log(data);
    const userData: z.infer<typeof AdminCourseFormSchema> = data;
    const formData = new FormData();

    // 사용자 데이터 처리
    type UserData = z.infer<typeof AdminCourseFormSchema>;
    const updatedData: any = {};

    // 오직 dirtyFields를 확인하여 업데이트된 필드만 formData에 추가
    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof UserData;
      if (dirtyFields[fieldKey] && userData[fieldKey] !== undefined) {
        updatedData[fieldKey] = userData[fieldKey];
      }
    });

    // formData를 구성, 특별 처리가 필요한 'thumbnailImage' 필드에 대한 처리
    Object.keys(data).forEach((key) => {
      if (key === "thumbnailImage" && imageFile) {
        formData.append("thumbnailImage", imageFile as Blob);
      } else if (updatedData.hasOwnProperty(key)) {
        formData.append(key, updatedData[key]);
      }
    });

    // 데이터가 업데이트 되었으면 서버 호출
    if (Object.keys(updatedData).length > 0 || imageFile) {
      mutate(formData);
    } else {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
      console.log("No fields have been changed.");
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-6">
      <X
        onClick={() => router.back()}
        className="absolute z-10 w-8 h-8 rounded-full right-10 top-10 hover:bg-black hover:bg-opacity-20"
      />
      <h2 className="mb-4 text-2xl">코스 편집</h2>
      <div className="flex flex-row w-full p-2 space-x-2 h-full">
        <Form {...form}>
          <form
            autoComplete="off"
            autoFocus={false}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-1/2 p-10 rounded-lg space-y-4 overflow-y-auto border"
          >
            <div className="flex flex-col justify-between p-2 space-y-2 overflow-y-auto w-full">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-bold">
                      공개여부 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={courseInfo.status}
                        className="flex flex-row space-x-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="active" />
                          </FormControl>
                          <FormLabel className="text-base">공개</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="inactive" />
                          </FormControl>
                          <FormLabel className="text-base">비공개</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <Image
                className="mx-auto"
                src={preview.dataUrl}
                alt="썸네일 이미지"
                width={200}
                height={200}
                style={{
                  width: "100%", // Make the width responsive
                  height: "auto", // Auto-adjust the height based on the width to maintain aspect ratio
                }}
                priority={true}
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
                      <Input
                        type="file"
                        {...field}
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <Select
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={courseInfo.category.name}
                    >
                      <SelectTrigger>
                        <SelectValue
                          onBlur={field.onBlur}
                          ref={field.ref}
                          placeholder="코스 과정 선택"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {category?.map((ele, index) => (
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
                      <Select
                        name={field.name}
                        onValueChange={field.onChange}
                        defaultValue={courseInfo.level}
                      >
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
            </div>
            <Button className="w-full mt-10" type="submit">
              코스 정보 수정
            </Button>
          </form>
        </Form>
        <CourseLectureEdit
          lecturesInfo={courseInfo.lectures}
          courseId={courseInfo.courseId}
        />
      </div>
    </div>
  );
}
