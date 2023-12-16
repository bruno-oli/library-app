export interface OrderProduct {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_in_cents: number
  createdAt: Date
  updatedAt: Date
}
