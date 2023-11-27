import { z } from 'zod'

const authAdminSchema = z.object({
  token: z.string(),
})

export { authAdminSchema }
