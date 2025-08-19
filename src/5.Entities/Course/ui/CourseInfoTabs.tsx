import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/6.shared/ui";
import { Typography } from "@/6.shared/ui";

type Props = { description: string };

const CourseInfoTabs = ({ description }: Props) => {
  return (
    <div className="flex flex-col justify-center w-full p-4 bg-white rounded-lg">
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">강의 정보</TabsTrigger>
          <TabsTrigger value="notice">공지사항</TabsTrigger>
          <TabsTrigger value="attachments">첨부파일</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="flex flex-col gap-4 p-2">
            <Typography name="h3">강의 정보</Typography>
            <p
              className="text-base leading-7 font-Pretendard"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </TabsContent>
        <TabsContent value="notice">
          <div className="flex flex-col gap-4 p-2">
            <Typography name="h3">공지 사항</Typography>
            <p className="text-base font-Pretendard">공지 사항이 없습니다.</p>
          </div>
        </TabsContent>
        <TabsContent value="attachments">
          <div className="flex flex-col gap-4 p-2">
            <Typography name="h3">첨부 파일</Typography>
            <p className="text-base font-Pretendard">첨부 파일이 없습니다.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { CourseInfoTabs };
