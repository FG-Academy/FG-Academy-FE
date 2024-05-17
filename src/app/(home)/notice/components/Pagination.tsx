import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function PaginationMenu({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
            aria-disabled={currentPage <= 1}
            href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
