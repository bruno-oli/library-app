import { z } from 'zod'

const registerAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
})

export { registerAdminSchema }
