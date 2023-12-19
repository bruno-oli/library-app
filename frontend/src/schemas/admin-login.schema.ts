import { z } from 'zod'

const adminLoginSchema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .nonempty('Campo obrigatório'),
  password: z.string().nonempty('Campo obrigatório'),
})

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>

export { adminLoginSchema }
