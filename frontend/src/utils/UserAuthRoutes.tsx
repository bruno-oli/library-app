import { authUser } from '@/services/user-services'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserAuthRoutes = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('token')

      if (!token) {
        return setIsAuth(false)
      }

      const isAuthtenticatedResponse = await authUser(token)

      if (!isAuthtenticatedResponse) {
        return setIsAuth(false)
      }

      setIsAuth(true)
    }

    checkAuth()
  }, [])

  if (isAuth) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export { UserAuthRoutes }
