import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(1, 'Insira sua senha'),
})

export type ILogin = z.infer<typeof loginSchema>

export { loginSchema }
