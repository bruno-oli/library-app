import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, loginSchema } from '@/schemas/login.schema'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'
import { useToast } from '@/components/ui/use-toast'

const Login = () => {
  const { loginUser } = useUserStore()

  const navigate = useNavigate()
  const { toast } = useToast()

  async function handleLogin(data: LoginSchema) {
    try {
      await loginUser(data)

      toast({
        title: `Bem vindo de volta!`,
        variant: 'default',
      })

      navigate('/')
    } catch (error) {
      toast({
        title: 'Algo deu errado :(',
        description: 'Email ou senha inválidos',
        variant: 'destructive',
      })
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

        <Button type="submit" variant={'default'}>
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
