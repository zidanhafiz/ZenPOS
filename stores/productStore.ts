import { Product } from "@/types/product";
import { createStore } from "zustand/vanilla";

export type ProductState = {
  products: Product[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
  queryParams: URLSearchParams;
};

export type ProductActions = {
  setProducts: (products: Product[]) => void;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (page: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setQueryParams: (
    query: string,
    category: string,
    sortBy: string,
    order: string,
    page: number
  ) => void;
  resetFilters: () => void;
};

export type ProductStore = ProductState & ProductActions;

export const defaultInitState: ProductState = {
  products: [],
  totalPages: 1,
  currentPage: 1,
  isLoading: false,
  error: null,
  queryParams: new URLSearchParams({
    page: "1",
    sortBy: "name",
    order: "asc",
  }),
};

export const createProductStore = (
  initState: ProductState = defaultInitState
) => {
  return createStore<ProductStore>()((set, get) => ({
    ...initState,

    setProducts: (products) => set(() => ({ products })),

    setTotalPages: (totalPages) => set(() => ({ totalPages })),

    setCurrentPage: (currentPage) => set(() => ({ currentPage })),

    setLoading: (isLoading) => set(() => ({ isLoading })),

    setError: (error) => set(() => ({ error })),

    setQueryParams: (
      query: string,
      category: string,
      sortBy: string,
      order: string,
      page: number = 1
    ) =>
      set(() => {
        const queryParams = new URLSearchParams(get().queryParams);
        queryParams.set("q", query);
        queryParams.set("category", category);
        queryParams.set("sortBy", sortBy);
        queryParams.set("order", order);
        queryParams.set("page", page.toString());
        return { queryParams };
      }),

    resetFilters: () =>
      set(() => ({
        queryParams: new URLSearchParams({
          page: "1",
          sortBy: "name",
          order: "asc",
        }),
      })),
  }));
};
