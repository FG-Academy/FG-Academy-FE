"use client";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaySquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Lecture {
  id: number;
  title: string;
  videoUrl: string;
}

export default function Page() {
  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: 1,
      title: "1강: 하나님은 어떻게 우리에게 드러내시나요.",
      videoUrl: "https://www.youtube.com/embed/Hf5I-jsd1zs",
    },
    {
      id: 2,
      title: "강의 2",
      videoUrl: "https://www.youtube.com/embed/MhsrciebdAQ",
    },
    {
      id: 3,
      title: "강의 3",
      videoUrl: "https://www.youtube.com/embed/RqHNowHuID0",
    },
  ]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(
    "https://www.youtube.com/embed/Hf5I-jsd1zs"
  );
  const [selectedlecture, setSelectedLecture] = useState(lectures[0]);

  return (
    <div id="container" className="flex flex-row w-screen h-screen">
      <div id="main-content" className="flex flex-col w-2/3 h-auto">
        <iframe
          width="100%"
          height="100%"
          src={selectedVideoUrl}
          allowFullScreen
        ></iframe>
      </div>
      <div id="nav" className="w-1/3">
        <div className="flex flex-col items-start justify-center h-auto p-6 space-y-4">
          <h2 className="text-2xl font-bold">커리큘럼</h2>
          <div className="text-lg">[필수]교사기초양육2 : 교리 및 기본신앙</div>
          <div className="flex flex-col space-y-2">
            <p>수강 기한 : 무제한</p>
            <p>진도율 : 53강/75강 (70.67%) | 시간: 10시간 12분/14시간 46분</p>
            <Progress value={70.67} indicatorColor="bg-blue-500" />
          </div>
        </div>

        <Accordion
          className="flex flex-col justify-center p-4 bg-gray-100 border-y-2"
          type="single"
          collapsible
        >
          {lectures.map((lecture) => (
            <AccordionItem key={lecture.id} value={lecture.title}>
              <AccordionTrigger>
                {lecture.title}
                {/* <ChevronRight size={16} /> */}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="flex flex-col p-4 space-y-4 bg-white"
                  onClick={() => setSelectedVideoUrl(lecture.videoUrl)}
                >
                  <div className="flex flex-row items-center justify-start space-x-2">
                    <PlaySquare />
                    <div>{lecture.title}</div>
                  </div>
                  <div>{lecture.title}</div>
                  <div>{lecture.videoUrl}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* <div
            className="my-[10px] justify-between cursor-pointer flex flex-row"
            key={lecture.id}
            onClick={() => setSelectedVideoUrl(lecture.videoUrl)}
          >
            {lecture.title}
            <ChevronRight />
          </div>
        ))} */}
        </Accordion>
      </div>
    </div>
  );
}
