import { api } from '@/api/api'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

interface IUserAuthContext {
  user: IUser | null
  setUser: (user: IUser | null) => void
  isAuthenticated: boolean
  isAuthLoading: boolean
  setIsAuthLoading: (loading: boolean) => void
  loginUser(email: string, password: string): Promise<void>
  registerUser(credentials: IUserRegister): Promise<void>
  authUser(token: string): Promise<void>
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

  async function loginUser(email: string, password: string) {
    try {
      const response = await api.post<IUserLoginResponse>('/login', {
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

  async function registerUser(credentials: IUserRegister) {
    try {
      await api.post<IUser>('/user', credentials)

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

  async function authUser(token: string) {
    try {
      const response = await api.post<IUser>('/user/auth', {
        token,
      })

      setUser(response.data)
    } catch (error) {
      toast({
        title: 'Erro ao validar sessão',
        description: 'Realize login novamente',
        variant: 'destructive',
      })

      navigate('/login')
    } finally {
      setIsAuthLoading(false)
    }
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
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

export { UserAuthContext, UserAuthContextProvider }
