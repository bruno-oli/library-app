import { Decimal } from '@prisma/client/runtime/library'

export interface Book {
  id: string
  name: string
  description: string
  image: string
  stock: number
  price: Decimal
  author: string
  createdAt: Date
  updatedAt: Date
}
