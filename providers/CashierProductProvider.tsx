"use client";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
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

export type CashierProductStoreApi = ReturnType<typeof createProductStore>;

export const CashierProductStoreContext = createContext<
  CashierProductStoreApi | undefined
>(undefined);

export interface ProductStoreProviderProps {
  children: ReactNode;
}

export const CashierProductStoreProvider = ({
  children,
}: ProductStoreProviderProps) => {
  const storeRef = useRef<CashierProductStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createProductStore(defaultInitState);
  }

  const state = useStore(storeRef.current);

  const { data, isLoading, error } = useSWR<ProductResponse, ErrorResponse>(
    `/api/products?${state.queryParams.toString()}`,
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
    <CashierProductStoreContext.Provider value={storeRef.current}>
      {children}
    </CashierProductStoreContext.Provider>
  );
};

export const useCashierProductStore = <T,>(
  selector: (store: ProductStore) => T
): T => {
  const cashierProductStoreContext = useContext(CashierProductStoreContext);

  if (!cashierProductStoreContext) {
    throw new Error(
      `useCashierProductStore must be used within CashierProductStoreProvider`
    );
  }

  return useStore(cashierProductStoreContext, selector);
};
