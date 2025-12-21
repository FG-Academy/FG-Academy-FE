"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  toast,
} from "@/6.shared/ui";
import { AnnouncementSchema } from "@/5.entities/announcement";

type FormValues = z.infer<typeof AnnouncementSchema>;

interface Props {
  initialValues: FormValues;
  submitLabel?: string;
  className?: string;
  onSubmit: (data: FormValues) => void | Promise<void>;
  schema?: z.ZodType<FormValues>;
  requireDirty?: boolean;
  isPending?: boolean;
}

export const AnnouncementForm = ({
  initialValues,
  submitLabel = "제출하기",
  className,
  onSubmit,
  schema,
  requireDirty = false,
  isPending = false,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content,
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  const handleSubmit = async (data: FormValues) => {
    if (requireDirty && Object.keys(dirtyFields).length === 0) {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
      return;
    }
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}
        className={["flex flex-col w-full h-full p-10 space-y-6", className]
          .filter(Boolean)
          .join(" ")}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                제목 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="제목을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                내용 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="h-[400px] resize-none"
                  autoComplete="off"
                  placeholder="내용을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isPending}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default AnnouncementForm;
