import { User } from "@/types/user";
import { createStore } from "zustand/vanilla";

export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User | null) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (user: User | null): UserState => {
  return { user };
};

export const defaultInitState: UserState = {
  user: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => set(() => ({ user })),
  }));
};
