import { User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type UserState = {
  user: User;
  isLoading: boolean;
  error: Error | null;
};

export type UserActions = {
  setUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (user: User): UserState => {
  return { user, isLoading: false, error: null };
};

export const defaultInitState: UserState = {
  user: {
    created_at: "",
    email: "",
    first_name: "",
    id: "",
    is_verified: false,
    last_name: "",
    photo_url: "",
  },
  isLoading: false,
  error: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => set(() => ({ user })),
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    setError: (error) => set(() => ({ error })),
  }));
};
