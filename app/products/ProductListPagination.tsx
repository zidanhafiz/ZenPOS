import { useProductStore } from "@/providers/ProductProvider";
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

export default function ProductListPagination() {
  const { setQueryParams, queryParams, totalPages, currentPage } =
    useProductStore((state) => state);
  const { paginationList } = usePagination(totalPages);

  const qParams = queryParams.get("q") ?? "";
  const category = queryParams.get("category") ?? "";
  const sortBy = queryParams.get("sortBy") ?? "";
  const order = queryParams.get("order") ?? "";

  const handlePreviousPage = () => {
    setQueryParams(qParams, category, sortBy, order, currentPage - 1);
  };

  const handleNextPage = () => {
    setQueryParams(qParams, category, sortBy, order, currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setQueryParams(qParams, category, sortBy, order, page);
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
