import { UserAuthContext } from '@/context/user-auth-context'
import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const ProtectedUserRoutes = () => {
  const { isAuthLoading, authUser } = useContext(UserAuthContext)

  useEffect(() => {
    async function loadUser() {
      await authUser(localStorage.getItem('userToken') || '')
    }

    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isAuthLoading) {
    return <div>Carregando...</div>
  }

  return <Outlet />
}

export { ProtectedUserRoutes }
