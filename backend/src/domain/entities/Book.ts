export interface Book {
  id: string
  name: string
  description: string
  image: string
  stock: number
  price_in_cents: number
  author: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}
