import { z } from 'zod'

const getBooksSchema = z.object({
  query: z
    .object({
      name: z.string().min(2),
      description: z.string().min(20),
      image: z.string().url(),
      stock: z.number().nonnegative(),
      price_in_cents: z.number().nonnegative(),
      author: z.string().min(2),
      createdAt: z.date(),
    })
    .partial()
    .optional(),

  orderBy: z
    .enum([
      'name',
      'description',
      'image',
      'stock',
      'price_in_cents',
      'author',
      'createdAt',
    ])
    .optional(),

  order: z.enum(['asc', 'desc']).optional(),

  take: z.number().nonnegative().optional(),
  skip: z.number().nonnegative().optional(),
})

export { getBooksSchema }
