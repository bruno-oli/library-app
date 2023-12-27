declare interface IBook {
  id: string
  name: string
  description: string
  author: string
  image: string
  stock: number
  price_in_cents: number
  createdAt: string
  updatedAt: string
}

declare interface IGetBooksResponse {
  books: IBook[]
  count: number
}
