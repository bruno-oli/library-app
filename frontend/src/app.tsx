import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Toaster } from './components/ui/toaster'
import { Register } from './pages/register'
import { Home } from './pages/home'
import UserProtectedRoutes from './utils/UserProtectedRoutes'
import { UserAuthRoutes } from './utils/UserAuthRoutes'

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
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export { App }
