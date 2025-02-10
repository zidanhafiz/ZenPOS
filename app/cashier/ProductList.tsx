"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useCashierProductStore } from "@/providers/CashierProductProvider";
import ProductCard from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/usePagination";

export default function ProductList() {
  const { products, isLoading, error } = useCashierProductStore(
    (state) => state
  );

  if (error) {
    throw error;
  }

  if (isLoading || !products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full mb-8">
        {products.length > 0 ? (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center mt-8 text-muted-foreground">
            No products found
          </p>
        )}
      </div>
      <ProductListPagination />
    </div>
  );
}

function ProductListPagination() {
  const { setQueryParams, queryParams, totalPages, currentPage } =
    useCashierProductStore((state) => state);
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
