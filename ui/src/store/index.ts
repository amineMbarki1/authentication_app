import create from "zustand";

import { UserDetailsResponse } from "../schemas/models.schemas";

type Store = {
  authUser: UserDetailsResponse | null;
  requestLoading: boolean;
  isAuthenticated: boolean;
  initialRequestLoading: boolean;
  setAuthUser: (user: UserDetailsResponse | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  setIsAuthenticated: (isUserAuthenticated: boolean) => void;
  setInitialRequestLoading: (initialLoading: boolean) => void;
  logout: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  initialRequestLoading: true,
  isAuthenticated: false,

  setIsAuthenticated: (isUserAuthenticated) =>
    set((state) => ({ ...state, isAuthenticated: isUserAuthenticated })),

  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),

  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),

  setInitialRequestLoading: (initialLoading) =>
    set((state) => ({ ...state, initialRequestLoading: initialLoading })),

  logout: () =>
    set((state) => ({ ...state, isAuthenticated: false, authUser: null })),
}));

export default useStore;
