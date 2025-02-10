"use client";
import { getListOfPages } from "@/lib/paginationUtils";
import { PaginationList } from "@/types/pagination";
import { useEffect, useState } from "react";

export function usePagination(totalPages: number) {
  const [pagination, setPagination] = useState<PaginationList>([]);

  useEffect(() => {
    setPagination(getListOfPages(totalPages));
  }, [totalPages]);

  return {
    paginationList: pagination,
  };
}
