"use client";

import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/6.shared/ui";
import type { CourseLecture } from "../model/lecture.type";

type Props = {
  completedCount: number;
  lectures: CourseLecture[];
  isTaking: boolean | null;
  lastStudyLectureId: number | null;
  courseCurriculum: string;
};

const LectureList = ({
  lectures,
  isTaking,
  lastStudyLectureId,
  completedCount,
  courseCurriculum,
}: Props) => {
  return (
    <Accordion type="multiple" className="border rounded-tl-md rounded-tr-md">
      {lectures.map((ele, index) => (
        <AccordionItem
          disabled={courseCurriculum !== "세미나" && index >= completedCount}
          key={ele.lectureId}
          value={`item-${index}`}
          className="bg-gray-100"
        >
          <AccordionTrigger className="mx-4 text-left text-md">
            {ele.lectureNumber}강. {ele.title}
          </AccordionTrigger>
          {isTaking !== false && lastStudyLectureId && (
            <AccordionContent className="flex items-center w-full px-4 py-3 bg-white hover:bg-gray-100">
              <Link
                className="flex items-center w-full gap-2 "
                href={`/course/${ele.courseId}/lecture/${lastStudyLectureId}`}
              >
                <FaCirclePlay size={16} />
                <p className="text-base">강의 들으러 가기</p>
              </Link>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export { LectureList };
