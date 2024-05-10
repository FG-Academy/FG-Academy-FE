import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lecture } from "@/model/lecture";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";

type Props = {
  lectures: Lecture[];
};

export default function LectureList({ lectures }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {lectures.map((ele, index) => (
        <AccordionItem
          key={ele.lectureId}
          value={`item-${index}`}
          className="bg-blue-100 border border-blue-300 rounded-md mt-3"
        >
          <AccordionTrigger className="mx-4 text-xl ">
            {ele.lectureNumber}강 {ele.title}
          </AccordionTrigger>

          <AccordionContent className="flex items-center p-2 bg-white">
            <FaCirclePlay className="mr-2" size={16} />
            <Link href={`/course/${ele.courseId}/lecture/${ele.lectureId}`}>
              강의 들으러 가기
            </Link>
          </AccordionContent>

          {/* <AccordionContent className="flex items-center p-2 bg-white">
            <MdOutlineQuiz className="mr-2" size={16} />
            <p  className="text-gray-500">{ele.lectureNumber}강 퀴즈</p>
          </AccordionContent>

          <AccordionContent className="flex items-center p-2 bg-white">
            <MdOutlineQuiz className="mr-2" size={16} />
            <p className="text-gray-500">{ele.lectureNumber}강 퀴즈</p>
          </AccordionContent> */}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
