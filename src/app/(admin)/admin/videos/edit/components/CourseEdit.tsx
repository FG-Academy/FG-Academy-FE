"use client";

import { useFieldArray, useForm } from "react-hook-form";
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
import { AdminCourse, Course } from "@/model/course";
import { useSession } from "next-auth/react";
import { useUserMutation } from "@/app/(home)/userInfo/lib/useUserMutation";
import { Input } from "@/components/ui/input";
import { transformDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Plus, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useCourseLectureMutation } from "../../hook/useCourseLectureMutation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { dateFormat } from "@/lib/dateFormat";

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
      lectures:
        courseInfo.lectures?.length > 0
          ? courseInfo.lectures
          : [{ title: "", videoLink: "", lectureNumber: 1 }],
    },
  });
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lectures",
  });

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

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

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
      lectureNumber: index + 1, // 인덱스는 0부터 시작하므로 +1을 해줍니다.
    }));
    form.setValue("lectures", updatedFields);
  };

  const handleAddLecture = () => {
    append({
      lectureNumber: fields.length + 1,
      title: "",
      videoLink: "",
    });
  };

  const handleRemoveLecture = (index: number) => {
    remove(index);
    // Update lecture numbers for all lectures that come after the removed one
    const updatedLectures = fields.slice(); // Make a copy of the current fields
    updatedLectures.splice(index, 1); // This matches what `remove(index)` does

    // Re-assign the `lectureNumber` starting from the removed index
    const lecturesWithUpdatedNumbers = updatedLectures.map((lecture, idx) => ({
      ...lecture,
      lectureNumber: idx + 1, // Increment index to start from 1
    }));

    form.setValue("lectures", lecturesWithUpdatedNumbers);
  };

  const { mutate } = useCourseLectureMutation(accessToken, courseInfo.courseId);

  const onSubmit = async (data: z.infer<typeof AdminCourseFormSchema>) => {
    // console.log(data);
    const userData: z.infer<typeof AdminCourseFormSchema> = data;
    const formData = new FormData();

    // 사용자 데이터 처리
    type UserData = z.infer<typeof AdminCourseFormSchema>;
    type UpdateData = { [K in keyof UserData]: UserData[K] };
    const updatedData: any = {};

    // 오직 dirtyFields를 확인하여 업데이트된 필드만 formData에 추가
    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof UserData;
      if (dirtyFields[fieldKey] && userData[fieldKey] !== undefined) {
        updatedData[fieldKey] = userData[fieldKey];
      }
    });
    // console.log(updatedData);

    // formData를 구성, 특별 처리가 필요한 'thumbnailImage' 필드에 대한 처리
    Object.keys(data).forEach((key) => {
      // console.log(key, updatedData[key]);
      if (key === "thumbnailImage" && imageFile) {
        // console.log("thumbnailImage");
        formData.append("thumbnailImage", imageFile as Blob);
      } else if (updatedData.hasOwnProperty(key)) {
        if (key === "lectures") {
          console.log(updatedData[key]);
          updatedData[key].forEach((v: any) => {
            console.log("v,k", v);
            formData.append(key, JSON.stringify(v));
          });
        } else {
          formData.append(key, updatedData[key]);
        }
      }
    });
    formData.forEach((value, key) => {
      console.log(key, value);
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

  // if (!courseInfo) {
  //   return <Loading />;
  // }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen p-2 py-2">
      <X
        onClick={() => router.back()}
        className="absolute w-8 h-8 rounded-full right-10 top-10 hover:bg-black hover:bg-opacity-20"
      />
      <h2 className="mb-4 text-2xl">코스 편집</h2>
      <Form {...form}>
        <form
          id="userInfoDialog"
          autoComplete="off"
          autoFocus={false}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full p-10 space-y-2 overflow-y-auto"
        >
          <div className="flex flex-row justify-between space-x-2 overflow-y-auto">
            <div className="w-1/2 p-2 space-y-2 overflow-y-auto">
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
                          const cleanInput = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
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
                          const cleanInput = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
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
            </div>

            <div className="w-1/2 overflow-y-auto border border-gray-400 space-y-4 p-12 rounded-lg">
              <Button
                onClick={handleAddLecture}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                강의 추가
              </Button>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(droppableProvided) => (
                    <div
                      className="space-y-2 overflow-auto"
                      {...droppableProvided.droppableProps}
                      ref={droppableProvided.innerRef}
                    >
                      {fields.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provide) => (
                            <div
                              ref={provide.innerRef}
                              {...provide.draggableProps}
                              {...provide.dragHandleProps}
                              className="border-2 bg-white p-4 space-y-2 rounded-xl border-blue-300 border-dashed"
                            >
                              <div className="flex flex-row justify-between font-semibold text-lg">
                                <div>{index + 1} 강</div>
                                <Button
                                  variant="ghost"
                                  onClick={() => handleRemoveLecture(index)}
                                  className="border border-red-600 rounded-md"
                                >
                                  <Trash />
                                  강의 제거
                                </Button>
                              </div>
                              <FormField
                                control={form.control}
                                name={`lectures.${index}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base font-bold">
                                      강의 제목{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        {...form.register(
                                          `lectures.${index}.title`
                                        )}
                                        // onChange={handleFileChange}
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
                                    <FormLabel className="text-base font-bold">
                                      유튜브 영상 코드{" "}
                                      <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        {...form.register(
                                          `lectures.${index}.videoLink`
                                        )}
                                        // onChange={handleFileChange}
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
          </div>
          <Button className="w-full mt-4" type="submit">
            코스 등록
          </Button>
        </form>
      </Form>
    </div>
  );
}
