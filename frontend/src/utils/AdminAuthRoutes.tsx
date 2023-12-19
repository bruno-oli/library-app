import { authAdmin } from '@/services/admin-services'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminAuthRoutes = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    async function checkAdminAuth() {
      const token = localStorage.getItem('adminToken')

      if (!token) {
        return setIsAuth(false)
      }

      const adminIsAuthtenticatedResponse = await authAdmin(token)

      if (!adminIsAuthtenticatedResponse) {
        return setIsAuth(false)
      }

      setIsAuth(true)
    }

    checkAdminAuth()
  }, [])

  if (isAuth) {
    return <Navigate to="/dashboard" />
  }

  return <Outlet />
}

export { AdminAuthRoutes }
