import { UserAuthContext } from '@/context/UserAuthContext'
import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthUserRoutes = () => {
  const { authUser, isAuthenticated } = useContext(UserAuthContext)

  useEffect(() => {
    async function loadUser() {
      await authUser(localStorage.getItem('userToken') || '')
    }

    loadUser()
  }, [])

  if (!isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/" />
}

export { AuthUserRoutes }
