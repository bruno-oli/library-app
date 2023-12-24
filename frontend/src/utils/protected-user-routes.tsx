import { UserAuthContext } from '@/context/UserAuthContext'
import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const ProtectedUserRoutes = () => {
  const { isAuthLoading, authUser } = useContext(UserAuthContext)

  useEffect(() => {
    async function loadUser() {
      await authUser(localStorage.getItem('userToken') || '')
    }

    loadUser()
  }, [])

  if (isAuthLoading) {
    return <div>Carregando...</div>
  }

  return <Outlet />
}

export { ProtectedUserRoutes }
