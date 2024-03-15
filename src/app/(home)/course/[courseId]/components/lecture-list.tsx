import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";

export default function LectureList() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={`item-${1}`}
        className="bg-blue-100 border border-blue-300 rounded-md "
      >
        <AccordionTrigger className="mx-4 text-xl ">
          1강 제목이 들어갈 공간입니다.
        </AccordionTrigger>

        <AccordionContent className="flex items-center p-2 bg-white">
          <FaCirclePlay className="mr-2" size={16} />
          <p>1강 링크가 들어갈 곳이고요</p>
        </AccordionContent>

        <AccordionContent className="flex items-center p-2 bg-white">
          <MdOutlineQuiz className="mr-2" size={16} />
          <p>1강 퀴즈</p>
        </AccordionContent>
        <AccordionContent className="flex items-center p-2 bg-white">
          <MdOutlineQuiz className="mr-2" size={16} />
          <p>1강 퀴즈</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
