import { z } from 'zod'

const createBookSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(20),
  image: z.string().url(),
  stock: z.number().nonnegative(),
  price_in_cents: z.number().nonnegative(),
  author: z.string().min(2),
  featured: z.boolean().optional(),
})

export { createBookSchema }
