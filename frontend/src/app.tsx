import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Toaster } from './components/ui/toaster'
import { Register } from './pages/register'
import { Home } from './pages/home'
import UserProtectedRoutes from './utils/UserProtectedRoutes'
import { UserAuthRoutes } from './utils/UserAuthRoutes'
import { AdminLogin } from './pages/admin-login'
import { AdminDashboard } from './pages/admin-dashboard'
import { AdminProtectedRoutes } from './utils/AdminProtectedRoutes'
import { AdminAuthRoutes } from './utils/AdminAuthRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserAuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<UserProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AdminAuthRoutes />}>
          <Route path="/dashboard/login" element={<AdminLogin />} />
        </Route>

        <Route element={<AdminProtectedRoutes />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export { App }
