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
import { AdminCourse } from "@/model/course";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { transformDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCourseEditMutation } from "../../hook/useCourseEditMutation";
import Image from "next/image";
import { dateFormat } from "@/lib/dateFormat";
import CourseLectureEdit from "./CourseLectureEdit";

type Props = {
  courseInfo: AdminCourse;
};

export default function CourseEdit({ courseInfo }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  // console.log(courseInfo);

  const router = useRouter();

  const [preview, setPreview] = useState<{ dataUrl: string }>({
    dataUrl: "/images/testCourseThumbnail.jpeg",
  });
  const [imageFile, setImageFile] = useState<File>();
  const [enabled, setEnabled] = useState(false);

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
      curriculum: courseInfo.curriculum,
      openDate: dateFormat(new Date(courseInfo.openDate)),
      finishDate: dateFormat(new Date(courseInfo.finishDate)),
      level: courseInfo.level,
      thumbnailImage: "",
    },
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = form;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 선택된 파일이 있는지 확인
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      console.log(file);

      reader.onloadend = () => {
        setImageFile(file);
        setPreview({
          dataUrl: reader.result as string,
          // file,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const { mutate } = useCourseEditMutation(accessToken, courseInfo.courseId);

  const onSubmit = async (data: z.infer<typeof AdminCourseFormSchema>) => {
    const userData: z.infer<typeof AdminCourseFormSchema> = data;
    const formData = new FormData();

    // 사용자 데이터 처리
    type UserData = z.infer<typeof AdminCourseFormSchema>;
    // type UpdateData = { [K in keyof UserData]: UserData[K] };
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
      // console.log(key, updatedData[key]);
      if (key === "thumbnailImage" && imageFile) {
        // console.log("thumbnailImage");
        formData.append("thumbnailImage", imageFile as Blob);
      } else if (updatedData.hasOwnProperty(key)) {
        formData.append(key, updatedData[key]);
      }
    });

    // 데이터가 업데이트 되었으면 서버 호출
    if (Object.keys(updatedData).length > 0 || imageFile) {
      mutate(formData);
    } else {
      console.log("No fields have been changed.");
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen p-2 py-4 bg-green-50">
      <X
        onClick={() => router.back()}
        className="absolute w-8 h-8 rounded-full right-10 top-10 hover:bg-black hover:bg-opacity-20"
      />
      <h2 className="mb-4 text-2xl">코스 편집</h2>
      <div className="flex flex-row overflow-y-auto w-full bg-red-50 p-2 space-x-2">
        <Form {...form}>
          <form
            id="courseEdit"
            autoComplete="off"
            autoFocus={false}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-1/2 p-10 space-y-2 overflow-y-auto bg-blue-50"
          >
            <div className="flex flex-row w-full justify-between space-x-2 overflow-y-auto">
              <div className="p-2 space-y-2 overflow-y-auto w-full">
                <Image
                  className="mx-auto"
                  src={preview?.dataUrl as string}
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
                        <Input
                          placeholder="코스 설명을 입력해주세요."
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
                        // defaultValue={userInfo.departmentName}
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
                            {/* <SelectLabel>부서명</SelectLabel> */}
                            <SelectItem value="sdf">ㄴㅇㄹ</SelectItem>
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
                        <Input
                          placeholder="ex) 20241216"
                          {...field}
                          onChange={(e) => {
                            const cleanInput = e.target.value.replace(
                              /\D/g,
                              ""
                            ); // 숫자가 아닌 문자 제거
                            const formattedInput = transformDate(cleanInput);
                            field.onChange(formattedInput); // 업데이트된 값을 form 필드에 설정
                          }}
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
                      <FormLabel className="text-base font-bold">
                        마감일자 <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex) 19901216"
                          {...field}
                          onChange={(e) => {
                            const cleanInput = e.target.value.replace(
                              /\D/g,
                              ""
                            ); // 숫자가 아닌 문자 제거
                            const formattedInput = transformDate(cleanInput);
                            field.onChange(formattedInput); // 업데이트된 값을 form 필드에 설정
                          }}
                        />
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
                        <Input
                          autoComplete="off"
                          placeholder="최소 수강 레벨을 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-10" type="submit">
                  코스 등록
                </Button>
              </div>
            </div>
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