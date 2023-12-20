import { AdminDropdown } from '@/components/admin-dropdown'
import { useThemeStore } from '@/store/theme-store'
import { Sun, Moon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  const {
    states: { theme },
    actions: { setTheme },
  } = useThemeStore()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className="flex min-h-screen flex-col items-start justify-between bg-accent py-4 shadow-2xl">
      <div className="space-y-10">
        <h1 className="px-6 text-4xl font-bold">Dashboard</h1>
        <ul className="flex flex-col items-center gap-5">
          <NavLink to="products" className="px-6 py-2 text-xl font-semibold">
            Produtos
          </NavLink>

          <NavLink to="orders" className="px-6 py-2 text-xl font-semibold">
            Orders
          </NavLink>

          <NavLink to="admins" className="px-6 py-2 text-xl font-semibold">
            Admins
          </NavLink>
        </ul>
      </div>
      <div className="flex w-full items-center justify-between px-6">
        <button onClick={toggleTheme}>
          {theme === 'light' ? (
            <Sun className="h-10 w-10" />
          ) : (
            <Moon className="h-10 w-10" />
          )}
        </button>

        <AdminDropdown />
      </div>
    </nav>
  )
}

export { Nav }
