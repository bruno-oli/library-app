import { api } from '@/api/api'
import { LoginResponse } from '@/api/types'
import { AdminLoginSchema } from '@/schemas/admin-login.schema'
import { UpdateAdminSchema } from '@/schemas/update-admin.schema'
import { Admin } from '@/store/admin-auth-store'
import { AxiosError } from 'axios'

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
  const response = await api.post<Admin>('/admin/auth', { token })

  if (response.status !== 200) {
    return undefined
  }

  return response.data
}

async function updateAdmin(data: Partial<UpdateAdminSchema>) {
  const filteredData = Object.entries(data).reduce((result, [key, value]) => {
    if (typeof value === 'string' && value === '') {
      return result
    }

    // eslint-disable-next-line
    // @ts-ignore
    result[key] = value

    return result
  }, {})

  try {
    await api.patch('/admin', filteredData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })

    return filteredData
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error
    }

    throw new Error('Erro interno no servidor, tente novamente mais tarde!')
  }
}

export { loginAdmin, logoutAdmin, authAdmin, updateAdmin }
