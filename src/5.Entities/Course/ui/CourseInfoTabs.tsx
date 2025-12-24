import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/6.shared/ui";
import { Info, Bell, Paperclip } from "lucide-react";

type Props = { description: string };

const CourseInfoTabs = ({ description }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full justify-start gap-0 p-0 h-auto bg-gray-50 border-b border-gray-100 rounded-none overflow-x-auto scrollbar-hide">
          <TabsTrigger
            value="info"
            className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-none border-b-2 border-transparent 
                      data-[state=active]:border-primary-blue data-[state=active]:bg-white 
                      data-[state=active]:text-primary-blue data-[state=active]:shadow-none
                      text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Info className="w-4 h-4 shrink-0" />
            <span className="text-sm">강의 정보</span>
          </TabsTrigger>
          <TabsTrigger
            value="notice"
            className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-none border-b-2 border-transparent 
                      data-[state=active]:border-primary-blue data-[state=active]:bg-white 
                      data-[state=active]:text-primary-blue data-[state=active]:shadow-none
                      text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Bell className="w-4 h-4 shrink-0" />
            <span className="text-sm">공지사항</span>
          </TabsTrigger>
          <TabsTrigger
            value="attachments"
            className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-none border-b-2 border-transparent 
                      data-[state=active]:border-primary-blue data-[state=active]:bg-white 
                      data-[state=active]:text-primary-blue data-[state=active]:shadow-none
                      text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Paperclip className="w-4 h-4 shrink-0" />
            <span className="text-sm">첨부파일</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="p-6 mt-0">
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </TabsContent>

        <TabsContent value="notice" className="p-6 mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Bell className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm">등록된 공지사항이 없습니다</p>
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="p-6 mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Paperclip className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm">등록된 첨부파일이 없습니다</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { CourseInfoTabs };
