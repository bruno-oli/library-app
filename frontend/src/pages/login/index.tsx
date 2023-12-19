import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, loginSchema } from '@/schemas/login.schema'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/services/user-services'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { AxiosError } from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const { toast } = useToast()

  const [isFetching, setIsFetching] = useState(false)

  async function handleLogin(data: LoginSchema) {
    setIsFetching(true)

    try {
      const token = (await loginUser(data)) as string

      localStorage.setItem('token', token)

      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast({
          description: error.response?.data.error,
          title: 'Algo deu errado',
          variant: 'destructive',
        })
      }

      toast({
        description: 'Erro interno no servidor, tente novamente mais tarde!',
        title: 'Erro',
        variant: 'destructive',
      })
    } finally {
      setIsFetching(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex w-[450px] flex-col space-y-4 rounded-[--radius] border-2 border-border p-5"
      >
        <h1 className="text-4xl font-bold text-primary">Login</h1>
        <Separator />

        <div>
          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-destructive">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          variant={'default'}
          disabled={!!(errors.email || errors.password || isFetching)}
        >
          Entrar
        </Button>

        <Button
          type="button"
          variant={'outline'}
          onClick={() => {
            navigate('/register')
          }}
        >
          Criar conta
        </Button>
      </form>
    </main>
  )
}

export { Login }
