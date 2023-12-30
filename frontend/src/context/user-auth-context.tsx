import { api } from '@/api/api'
import { useToast } from '@/components/ui/use-toast'
import { IRegister } from '@/schemas/register.schema'
import { AxiosError } from 'axios'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

interface IUserAuthContext {
  user: IUser | null
  setUser: (user: IUser | null) => void
  isAuthenticated: boolean
  isAuthLoading: boolean
  setIsAuthLoading: (loading: boolean) => void
  loginUser(email: string, password: string): Promise<void>
  registerUser(credentials: IRegister): Promise<void>
  authUser(token: string): Promise<void>
  logoutUser(): void
}

interface IUserAuthContextProviderProps {
  children: React.ReactNode
}

const UserAuthContext = createContext<IUserAuthContext>({} as IUserAuthContext)

const UserAuthContextProvider = ({
  children,
}: IUserAuthContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const isAuthenticated = !!user

  const navigate = useNavigate()
  const { toast } = useToast()

  const location = useLocation()

  const authUser = useCallback(
    async (token: string) => {
      try {
        const response = await api.post<IUser>('/user/auth', {
          token,
        })

        setUser(response.data)
      } catch (error) {
        navigate('/login')
      } finally {
        setIsAuthLoading(false)
      }
    },
    [navigate],
  )

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('userToken')

      if (token) {
        await authUser(token)
      }
    }

    loadUser()
  }, [authUser])

  async function loginUser(email: string, password: string) {
    try {
      const response = await api.post<IUserLoginResponse>('/user/login', {
        email,
        password,
      })

      const { token } = response.data

      localStorage.setItem('userToken', token)

      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem vindo de volta!',
      })

      navigate('/')
    } catch (error) {
      const customError = error as AxiosError<IApiError>

      toast({
        title: 'Erro ao fazer login',
        description: customError.response?.data.error,
        variant: 'destructive',
      })
    }
  }

  async function registerUser(credentials: IRegister) {
    try {
      await api.post<IUser>('/user/register', credentials)

      toast({
        title: 'Conta criada com sucesso',
        description: 'Realize o login',
      })

      navigate('/login')
    } catch (error) {
      const customError = error as AxiosError<IApiError>

      toast({
        title: 'Erro ao se registrar',
        description: customError.response?.data.error,
        variant: 'destructive',
      })
    }
  }

  function logoutUser() {
    setUser(null)
    localStorage.clear()
    navigate(location.pathname, { replace: true })
  }

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isAuthLoading,
        setIsAuthLoading,
        loginUser,
        registerUser,
        authUser,
        logoutUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

export { UserAuthContext, UserAuthContextProvider }
