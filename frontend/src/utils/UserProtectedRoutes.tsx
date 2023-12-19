import { authUser, logoutUser } from '@/services/user-services'
import { useAuthStore } from '@/store/auth-store'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const UserProtectedRoutes = () => {
  const {
    state: { isAuthLoading },
    actions: { setIsAuthLoading, setUser },
  } = useAuthStore()
  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('token')

      if (!token) {
        logoutUser()
      }

      const user = await authUser(token as string)

      if (!user) {
        setIsAuthLoading(false)
        return logoutUser()
      }

      setUser(user)
      setIsAuthLoading(false)
    }

    checkAuth()
  }, [setIsAuthLoading, setUser])

  if (isAuthLoading) {
    return <div>Loading...</div>
  }

  return <Outlet />
}

export default UserProtectedRoutes
