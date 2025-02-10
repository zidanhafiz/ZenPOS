import { PaginationList } from "@/types/pagination";

export const getListOfPages = (totalPages: number) => {
  const LIST_PER_SECTION = 5;
  const TOTAL_SECTIONS = Math.ceil(totalPages / LIST_PER_SECTION);

  const pagination: PaginationList = [];

  for (let i = 1; i <= TOTAL_SECTIONS; i++) {
    const startPage = i === 1 ? 1 : i * LIST_PER_SECTION - LIST_PER_SECTION;
    const endPage = i === 1 ? LIST_PER_SECTION : startPage + LIST_PER_SECTION;

    const list = [];

    for (let j = startPage; j <= endPage; j++) {
      if (j > totalPages) break;
      list.push(j);
    }

    pagination.push({ firstPage: startPage, lastPage: endPage, list });
  }

  return pagination;
};
