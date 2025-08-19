import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../../../components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { useSession } from "next-auth/react";
import { addEnrollment } from "./add-enrollment";

export function useEnrollmentMutation(
  courseId: number,
  lastStudyLecture: number | null
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: session, update } = useSession();

  return useMutation({
    mutationKey: ["registerEnrollment"],
    mutationFn: async () => addEnrollment(courseId),
    onSuccess: (data) => {
      console.log(data);

      update({
        enrollmentIds: [...(session?.user.enrollmentIds || []), courseId],
      });

      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      toast({
        title: data.message,
        duration: 10000,
        description: (
          <div className="flex justify-end mt-2 w-[340px] rounded-md p-4">
            <Button
              className="text-white bg-blue-500 shadow-md hover:bg-slate-50 hover:text-black"
              onClick={() => {
                if (lastStudyLecture) {
                  router.push(
                    `/course/${courseId}/lecture/${lastStudyLecture}`
                  );
                }
              }}
            >
              강의 수강하기
            </Button>
          </div>
        ),
      });
    },
    onError: (error: any) => {
      toast({
        title: error?.message ?? "에러가 발생했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });
}
