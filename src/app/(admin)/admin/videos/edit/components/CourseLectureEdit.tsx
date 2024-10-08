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
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LectureFormSchema } from "../../lib/LecturesFormSchema";
import { useSession } from "next-auth/react";
import { useLectureMutation } from "../../hook/useLectureMutation";
import { toast } from "@/components/ui/use-toast";
interface LecturesResponse {
  lectureId: number;
  title: string;
  videoLink: string;
  lectureNumber: number;
}

type Props = {
  lecturesInfo: LecturesResponse[];
  courseId: number;
};

export default function CourseLectureEdit({ lecturesInfo, courseId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const form = useForm<z.infer<typeof LectureFormSchema>>({
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

    form.setValue("lectures", updatedFields, { shouldDirty: true });
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
            lectureNumber: idx + 1, // Increment index to start from 1
          })
        );

        form.setValue("lectures", lecturesWithUpdatedNumbers);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "요청이 불안정합니다..",
          description: "잠시 후 다시 시도해주세요.",
        });
        console.error("Failed to delete courses:", error);
      }
    } else {
      // User clicked 'Cancel'
      // console.log("Deletion cancelled.");
    }
  };

  const { mutate } = useLectureMutation(accessToken, courseId);

  const onSubmit = async (data: z.infer<typeof LectureFormSchema>) => {
    // console.log(dirtyFields);
    if (Object.keys(dirtyFields).length > 0) {
      mutate(data);
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
        id="courseLectureEdit"
        autoComplete="off"
        autoFocus={false}
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-1/2 border h-full border-gray-300 space-y-4 p-12 rounded-lg"
      >
        <Button
          onClick={handleAddLecture}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          강의 추가
        </Button>
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
                      draggableId={field.id}
                      index={index}
                    >
                      {(provide) => (
                        <div
                          ref={provide.innerRef}
                          {...provide.draggableProps}
                          {...provide.dragHandleProps}
                          className="border-2 bg-white p-4 space-y-2 rounded-xl border-gray-300 border-dashed"
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
        <Button className="flex w-full mt-10" type="submit">
          강의 저장
        </Button>
      </form>
    </Form>
  );
}
