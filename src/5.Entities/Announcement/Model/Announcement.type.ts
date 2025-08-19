export interface Announcement {
  announcementId: number;
  title: string;
  content: string;
  courseId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementsResponse {
  posts: Announcement[];
  totalPages: number;
}
