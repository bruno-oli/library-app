import { z } from 'zod'

const loginAdminSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export { loginAdminSchema }
