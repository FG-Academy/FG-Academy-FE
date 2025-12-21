import { AnnouncementPage } from "@/2.pages/announcement";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const page = Number(searchParams?.page);
  return <AnnouncementPage page={page} />;
}
