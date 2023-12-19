import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { RegisterSchema, registerSchema } from '@/schemas/register.schema'
import { registerUser } from '@/services/user-services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-separator'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(data: RegisterSchema) {
    try {
      await registerUser(data)

      toast({
        description:
          'Usuário criado com sucesso! Redirecionando para a página de login...',
        title: 'Sucesso',
      })

      navigate('/login')
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
    }
  }

  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex w-[450px] flex-col space-y-4 rounded-[--radius] border-2 border-border p-5"
      >
        <h1 className="text-4xl font-bold text-primary">Cadastro</h1>

        <Separator />

        <div>
          <Input type="text" placeholder="Name" {...register('name')} />
          {errors.name && (
            <span className="text-destructive">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-destructive">{errors.password.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register('passwordConfirm')}
          />

          {errors.passwordConfirm && (
            <span className="text-destructive">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>

        <Button type="submit" variant={'default'}>
          Cadastrar
        </Button>

        <Button
          type="button"
          variant={'outline'}
          onClick={() => {
            navigate('/login')
          }}
        >
          Já possui uma conta? Clique aqui para entrar
        </Button>
      </form>
    </main>
  )
}

export { Register }
