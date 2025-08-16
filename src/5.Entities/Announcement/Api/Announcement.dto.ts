import { Announcement } from "../Model";

export interface AnnouncementsResponse {
  posts: Announcement[];
  totalPages: number;
}
