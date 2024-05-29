import { auth } from "@/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AllLecturesResponse } from "@/hooks/useLectureQuery";
import { ILecture } from "@/model/lecture";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";

type Props = {
  lectures: AllLecturesResponse[];
  isTaking: boolean | null;
  lastStudyLectureId: number | null;
};

export default function LectureList({
  lectures,
  isTaking,
  lastStudyLectureId,
}: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {lectures.map((ele, index) => (
        <AccordionItem
          disabled={true}
          key={ele.lectureId}
          value={`item-${index}`}
          className="bg-blue-100 border border-blue-300 rounded-md mt-3"
        >
          <AccordionTrigger className="mx-4 text-xl ">
            {ele.lectureNumber}강 {ele.title}
          </AccordionTrigger>
          {isTaking !== false && lastStudyLectureId && (
            <AccordionContent className="flex items-center p-2 bg-white">
              <FaCirclePlay className="mr-2" size={16} />
              <Link
                href={`/course/${ele.courseId}/lecture/${lastStudyLectureId}`}
              >
                강의 들으러 가기
              </Link>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
