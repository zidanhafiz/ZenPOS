"use client";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { useStore } from "zustand";
import {
  type UserStore,
  createUserStore,
  defaultInitState,
} from "@/stores/userStore";
import useSWR from "swr";
import { ErrorResponse } from "@/types/api-response/ErrorResponse";
import { UserResponse } from "@/types/api-response/userTypes";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/navigation";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>(null);
  const router = useRouter();

  if (!storeRef.current) {
    storeRef.current = createUserStore(defaultInitState);
  }

  const state = useStore(storeRef.current);

  const { data, isLoading, error } = useSWR<UserResponse, ErrorResponse>(
    `/api/get-user`,
    fetcher,
  );

  useEffect(() => {
    if (isLoading || !data) {
      state.setIsLoading(true);
    }

    if (data) {
      state.setUser(data.data);
      state.setIsLoading(false);
    }

    if (error) {
      state.setError(new Error(error.message));
      state.setIsLoading(false);
      router.push("/login");
    }
  }, [data, isLoading, error, router]);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
