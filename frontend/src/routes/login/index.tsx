import { LoginForm } from '@/components/login/login-form'
import { RegisterForm } from '@/components/login/register-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Login = () => {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[480px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export { Login }
