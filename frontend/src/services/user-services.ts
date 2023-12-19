import { api } from '@/api/api'
import { LoginResponse } from '@/api/types'
import { LoginSchema } from '@/schemas/login.schema'
import { RegisterSchema } from '@/schemas/register.schema'
import { User } from '@/store/auth-store'

async function loginUser(
  credentials: LoginSchema,
): Promise<string | undefined> {
  const response = await api.post<LoginResponse>('/user/login', credentials)

  if (response.status !== 200) {
    return undefined
  }

  return response.data.token
}

async function logoutUser() {
  localStorage.removeItem('token')

  window.location.href = '/login'
}

async function registerUser(credentials: RegisterSchema) {
  await api.post('/user/register', credentials)
}

async function authUser(token: string) {
  const response = await api.post('/user/auth', { token })

  if (response.status !== 200) {
    return undefined
  }

  return response.data as User
}

export { loginUser, logoutUser, registerUser, authUser }
