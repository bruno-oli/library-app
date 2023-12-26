import { UserAuthContext } from '@/context/user-auth-context'
import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthUserRoutes = () => {
  const { authUser, isAuthenticated } = useContext(UserAuthContext)

  useEffect(() => {
    async function loadUser() {
      await authUser(localStorage.getItem('userToken') || '')
    }

    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/" />
}

export { AuthUserRoutes }
