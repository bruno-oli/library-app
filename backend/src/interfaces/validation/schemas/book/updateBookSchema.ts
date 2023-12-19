import { z } from 'zod'

const updateBookSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().min(20),
    image: z.string().url(),
    stock: z.number().nonnegative(),
    price_in_cents: z.number().nonnegative(),
    author: z.string().min(2),
    featured: z.boolean(),
  })
  .partial()
  .strict()
  .refine(
    (data) =>
      data.name ||
      data.description ||
      data.image ||
      data.stock ||
      data.price_in_cents ||
      data.author ||
      data.featured,
  )

export { updateBookSchema }
