"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import HistoryTable from "./HistoryTable";
import { ErrorResponse } from "@/types/api-response/ErrorResponse";
import { TransactionResponse } from "@/types/api-response/transactionsTypes";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HistoryPagination from "./HistoryPagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryCard() {
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>("desc");
  const { data, isLoading, error } = useSWR<TransactionResponse, ErrorResponse>(
    `/api/transactions?sortBy=created_at&order=${order}&page=${page}`,
    fetcher
  );

  if (error) {
    throw error;
  }

  const handleOrderChange = (value: string) => {
    setOrder(value);
  };

  return (
    <div className="space-y-4 mt-2">
      <Select onValueChange={handleOrderChange} defaultValue={order}>
        <SelectTrigger className="w-[180px] bg-white m-1">
          <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Oldest</SelectItem>
          <SelectItem value="desc">Newest</SelectItem>
        </SelectContent>
      </Select>
      {!data || isLoading ? (
        <Loading />
      ) : (
        <>
          <HistoryTable transactions={data.data} />
          <HistoryPagination
            totalPages={data.total_pages}
            currentPage={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="space-y-4 mt-2">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
