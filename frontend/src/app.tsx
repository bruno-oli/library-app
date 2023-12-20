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
import { useEffect } from 'react'
import { useThemeStore } from './store/theme-store'

function App() {
  const {
    actions: { setTheme },
  } = useThemeStore()

  useEffect(() => {
    function setPreferredTheme() {
      const root = window.document.documentElement
      root.classList.remove('dark', 'light')

      const theme = localStorage.getItem('theme')

      if (
        !theme ||
        theme === 'system' ||
        (theme !== 'light' && theme !== 'dark')
      ) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'

        root.classList.add(systemTheme)

        localStorage.setItem('theme', systemTheme)

        return setTheme(systemTheme)
      }

      root.classList.add(theme)
      setTheme(theme)
    }

    setPreferredTheme()
  }, [setTheme])

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
          <Route path="/dashboard/*" element={<AdminDashboard />} />
        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export { App }
