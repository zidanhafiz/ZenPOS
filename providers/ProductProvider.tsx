"use client";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";
import useSWR from "swr";
import {
  type ProductStore,
  createProductStore,
  defaultInitState,
} from "@/stores/productStore";
import fetcher from "@/lib/fetcher";
import { ProductResponse } from "@/types/api-response/productTypes";
import { ErrorResponse } from "@/types/api-response/ErrorResponse";

export type ProductStoreApi = ReturnType<typeof createProductStore>;

export const ProductStoreContext = createContext<ProductStoreApi | undefined>(
  undefined
);

export interface ProductStoreProviderProps {
  children: ReactNode;
}

export const ProductStoreProvider = ({
  children,
}: ProductStoreProviderProps) => {
  const storeRef = useRef<ProductStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createProductStore(defaultInitState);
  }

  const state = useStore(storeRef.current);

  const { data, isLoading, error } = useSWR<ProductResponse, ErrorResponse>(
    `/api/products?${state.queryParams.toString()}&limit=${
      state.view === "grid" ? 8 : 12
    }`,
    fetcher
  );

  useEffect(() => {
    if (isLoading || !data) {
      state.setLoading(true);
    }

    if (data) {
      state.setProducts(data.data);
      state.setTotalPages(data.total_pages);
      state.setCurrentPage(data.current_page);
      state.setError(null);
      state.setLoading(false);
    }
  }, [data, isLoading, error, state.queryParams]);

  useEffect(() => {
    if (error) {
      state.setError(new Error(error.message));
    }
  }, [error, state]);

  return (
    <ProductStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductStoreContext.Provider>
  );
};

export const useProductStore = <T,>(
  selector: (store: ProductStore) => T
): T => {
  const productStoreContext = useContext(ProductStoreContext);

  if (!productStoreContext) {
    throw new Error(`useProductStore must be used within ProductStoreProvider`);
  }

  return useStore(productStoreContext, selector);
};
