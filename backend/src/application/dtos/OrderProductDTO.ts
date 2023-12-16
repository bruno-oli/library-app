export interface OrderProductDTO {
  product_id: string
  quantity: number
}

export interface CreateOrderProductDTO extends OrderProductDTO {
  order_id: string
  price_in_cents: number
}
