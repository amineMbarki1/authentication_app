import create from "zustand";

type UserT = {
  firstName: string;
  lastName: string;
  email: string;
};

type Store = {
  authUser: UserT | null;
  requestLoading: boolean;
  isAuthenticated: boolean;
  initialRequestLoading: boolean;
  setAuthUser: (user: UserT | null) => void;
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
