import { Decimal } from '@prisma/client/runtime/library'

export interface BookDTO {
  name: string
  description: string
  image: string
  stock: number
  price: Decimal
  author: string
}
