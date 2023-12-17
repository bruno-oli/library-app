import { api } from '@/lib/api'
import { LoginSchema } from '@/schemas/login.schema'
import { CustomError } from '@/utils/CustomError'
import { AxiosError } from 'axios'
import { create } from 'zustand'

export type User = {
  id: string
  name: string
  email: string
  iat: number
}

type UserStore = {
  user: User | null
  isAuthenticated: () => boolean
  setUser: (user: User) => void
  authUser: (token: string) => Promise<void>
  loginUser: (credentials: LoginSchema) => Promise<void>
}

const useUserStore = create<UserStore>((set, get) => {
  return {
    user: null,
    isAuthenticated: () => !!get().user,
    setUser: (user: User) => set({ user }),
    authUser: async (token: string) => {
      await api
        .post<User>('/user/auth', { token })
        .then(({ data }) => {
          set({ user: data })
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    loginUser: async (credentials) => {
      await api
        .post('/user/login', credentials)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
        })
        .catch((err: AxiosError) => {
          throw new CustomError(
            err.response?.statusText as string,
            err.response?.status as number,
          )
        })
    },
  }
})

export { useUserStore }
