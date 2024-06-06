// // components/AnnouncementList.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useFetchQnaPostsQuery } from "../notice/hooks/usePostsQuery";

// const announcements = [
//   "새 업데이트가 출시되었습니다!",
//   "서버 점검이 예정되어 있습니다.",
//   "새로운 기능이 추가되었습니다.",
// ];

// export function AnnouncementList() {
//   const [index, setIndex] = useState(0);

//   const { data: posts } = useFetchQnaPostsQuery("", 1);

//   console.log(posts);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     // posts 데이터를 가져오는 로직 (필요시)
//   }, [posts]);

//   return (
//     <div className="relative overflow-hidden ml-4 h-10 w-full">
//       <div
//         className="absolute whitespace-nowrap transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateY(-${index * 2.5}rem)` }}
//       >
//         {announcements.map((announcement, i) => (
//           <div key={i} className="h-10 flex items-center">
//             {announcement}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// components/AnnouncementList.tsx
// components/AnnouncementList.tsx
"use client";

import { useEffect, useState } from "react";
import { useFetchQnaPostsQuery } from "../notice/hooks/usePostsQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import Link from "next/link";
import { useRouter } from "next/navigation";

// interfaces.ts
export interface Post {
  announcementId: number;
  title: string;
  content: string;
  courseId: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsData {
  posts: Post[];
  totalPages: number;
}

export function AnnouncementList() {
  const [index, setIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [postsData, setPostsData] = useState<PostsData | null>(null);

  const router = useRouter();

  const { data: posts } = useFetchQnaPostsQuery("", 1);

  useEffect(() => {
    if (posts) {
      setPostsData(posts);
      const newAnnouncements = posts.posts.map((post: Post) => post.title);
      setAnnouncements(newAnnouncements);
    }
  }, [posts]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [announcements]);

  if (!posts) return <Loading />;

  return (
    <div className="flex mt-4 mx-auto justify-center items-center text-center h-12 w-11/12 rounded-lg bg-blue-100">
      <div className="flex items-center text-nowrap h-full my-auto rounded-lg p-4 bg-blue-200">
        <div className="font-bold text-base md:text-lg">공지사항</div>
      </div>
      <div className="relative overflow-hidden ml-4 h-10 w-full">
        <div
          className="absolute whitespace-nowrap transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateY(-${index * 2.5}rem)` }}
        >
          {posts.posts.map((announcement, i) => (
            <div key={i} className="h-10 flex items-center">
              <Link
                className="mr-5 hover:text-blue-900 text-sm md:text-base"
                href={`/notice/${announcement.announcementId}`}
              >
                {announcement.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
