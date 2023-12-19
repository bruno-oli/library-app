import { api } from '@/api/api'
import { LoginResponse } from '@/api/types'
import { AdminLoginSchema } from '@/schemas/admin-login.schema'

async function loginAdmin(credentials: AdminLoginSchema) {
  const response = await api.post<LoginResponse>('/admin/login', credentials)

  if (response.status !== 200) {
    return undefined
  }

  return response.data.token
}

async function logoutAdmin() {
  localStorage.removeItem('adminToken')

  window.location.href = '/dashboard/login'
}

async function authAdmin(token: string) {
  const response = await api.post('/admin/auth', { token })

  if (response.status !== 200) {
    return undefined
  }

  return response.data
}

export { loginAdmin, logoutAdmin, authAdmin }
