import { create } from 'zustand'

export interface Admin {
  id: string
  name: string
  email: string
  iat: number
}

interface AdminAuthStore {
  state: {
    admin: Admin | null
    isAdminAuthLoading: boolean
  }
  actions: {
    setAdmin: (admin: Admin | null) => void
    setIsAdminAuthLoading: (isAdminAuthLoading: boolean) => void
  }
}

const useAdminAuthStore = create<AdminAuthStore>((set, get) => ({
  state: {
    admin: null,
    isAdminAuthLoading: true,
  },
  actions: {
    setAdmin: (admin) => set({ state: { ...get().state, admin } }),
    setIsAdminAuthLoading: (isAdminAuthLoading) =>
      set({ state: { ...get().state, isAdminAuthLoading } }),
  },
}))

export { useAdminAuthStore }
