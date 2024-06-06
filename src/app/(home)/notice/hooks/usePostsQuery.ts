import { useQuery } from "@tanstack/react-query";
import { getQnaPosts } from "../lib/getPosts";
import { getOnePost } from "../lib/getOnePost";

interface Response {
  posts: PostsResponse[];
  totalPages: number;
}

export interface PostsResponse {
  announcementId: number;
  title: string;
  content: string;
  courseId: null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/** [공지사항 화면] 게시판 전체 조회 */
export const useFetchQnaPostsQuery = (
  accessToken: string,
  page: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<Response>({
    queryKey: ["posts", "qna", page],
    queryFn: () => getQnaPosts(accessToken, page),
    // enabled: !!accessToken,
  });
};

/** [공지사항 화면] 게시판 ID로 게시물 조회 */
export const useFetchOnePostQuery = (
  accessToken: string,
  announcementId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<PostsResponse>({
    queryKey: ["post", announcementId],
    queryFn: () => getOnePost(accessToken, announcementId),
    // enabled: !!accessToken,
  });
};
