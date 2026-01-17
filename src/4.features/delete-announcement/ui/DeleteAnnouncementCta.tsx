import { Button } from "@/6.shared/ui";
import { useDeleteAnnouncementMutation } from "../api/use-delete-announcement-mutation";
import { TrashIcon } from "lucide-react";

interface Props {
  announcementId: number;
}

const DeleteAnnouncementCta = ({ announcementId }: Props) => {
  const { mutate } = useDeleteAnnouncementMutation();

  const handleDelete = async () => {
    if (confirm("공지사항을 정말로 삭제하시겠습니까?")) {
      mutate([announcementId]);
    }
  };

  return (
    <Button
      className="flex items-center gap-2"
      variant="destructive"
      onClick={handleDelete}
    >
      <TrashIcon size={18} />
      삭제
    </Button>
  );
};

export { DeleteAnnouncementCta };
