import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Insira um e-mail válido!'),
  password: z.string().nonempty('Insira sua senha!'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema }
