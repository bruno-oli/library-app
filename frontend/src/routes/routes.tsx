import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import { Home } from './home'
import { UserAuthContextProvider } from '@/context/UserAuthContext'
import { ProtectedUserRoutes } from '@/utils/protected-user-routes'
import { AuthUserRoutes } from '@/utils/auth-user-routes'
import { Login } from './login'

const Routes = () => {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <ReactRoutes>
          <Route element={<ProtectedUserRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AuthUserRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </ReactRoutes>
      </UserAuthContextProvider>
    </BrowserRouter>
  )
}

export { Routes }
