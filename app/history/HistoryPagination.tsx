"use client";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SetStateAction } from "react";
import { Dispatch } from "react";

export default function HistoryPagination({
  totalPages,
  currentPage,
  setPage,
}: {
  totalPages: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const { paginationList } = usePagination(totalPages);

  const handlePreviousPage = () => {
    setPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination className="p-1">
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-secondary text-primary border-none shadow-none hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {paginationList.map(
          (page) =>
            currentPage >= page.firstPage &&
            currentPage < page.lastPage &&
            page.list.map((list) => (
              <PaginationItem key={list}>
                <Button
                  onClick={() => handlePageClick(list)}
                  className={cn(
                    "bg-secondary text-primary border-none shadow-none hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed",
                    list === currentPage && "bg-background shadow text-primary"
                  )}
                >
                  {list}
                </Button>
              </PaginationItem>
            ))
        )}
        {paginationList.map(
          (page) =>
            currentPage < page.firstPage && (
              <PaginationItem key={page.firstPage}>
                <PaginationEllipsis />
              </PaginationItem>
            )
        )}
        <PaginationItem>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-secondary text-primary border-none shadow-none hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
