export interface OrderDTO {
  user_id: string
  status: string
}

export interface CreateOrderDTO extends OrderDTO {
  total_in_cents: number
}
