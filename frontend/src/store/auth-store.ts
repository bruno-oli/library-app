import { create } from 'zustand'

export type User = {
  id: string
  name: string
  email: string
  iat: number
}

type AuthStore = {
  state: {
    user: User | null
    isAuthLoading: boolean
  }
  actions: {
    setUser: (user: User | null) => void
    setIsAuthLoading: (isAuthLoading: boolean) => void
    getUserIsAuthenticated: () => boolean
  }
}

const useAuthStore = create<AuthStore>((set, get) => ({
  state: {
    user: null,
    isAuthLoading: true,
  },
  actions: {
    setUser: (user) => set({ state: { ...get().state, user } }),
    setIsAuthLoading: (isAuthLoading) =>
      set({ state: { ...get().state, isAuthLoading } }),
    getUserIsAuthenticated: () => !!get().state.user,
  },
}))

export { useAuthStore }
