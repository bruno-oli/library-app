import { create } from 'zustand'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  states: {
    theme: Theme
  }
  actions: {
    setTheme: (theme: Theme) => void
  }
}

const useThemeStore = create<ThemeStore>((set) => ({
  states: {
    theme: 'light',
  },
  actions: {
    setTheme: (theme) => {
      localStorage.setItem('theme', theme)

      const root = window.document.documentElement

      root.classList.remove('dark', 'light')

      root.classList.add(theme)

      set({ states: { theme } })
    },
  },
}))

export { useThemeStore }
