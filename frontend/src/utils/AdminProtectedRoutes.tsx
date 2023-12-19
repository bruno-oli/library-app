import { authAdmin, logoutAdmin } from '@/services/admin-services'
import { useAdminAuthStore } from '@/store/admin-auth-store'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const AdminProtectedRoutes = () => {
  const {
    state: { isAdminAuthLoading },
    actions: { setAdmin, setIsAdminAuthLoading },
  } = useAdminAuthStore()

  useEffect(() => {
    async function checkAdminAuth() {
      const token = localStorage.getItem('adminToken')

      if (!token) {
        logoutAdmin()
      }

      const admin = await authAdmin(token as string)

      if (!admin) {
        setIsAdminAuthLoading(false)
        return logoutAdmin()
      }

      setAdmin(admin)
      setIsAdminAuthLoading(false)
    }

    checkAdminAuth()
  }, [setAdmin, setIsAdminAuthLoading])

  if (isAdminAuthLoading) {
    return <div>Loading...</div>
  }

  return <Outlet />
}

export { AdminProtectedRoutes }
