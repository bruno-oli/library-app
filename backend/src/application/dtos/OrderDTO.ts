export interface OrderDTO {
  total_in_cents: number
  user_id: string
  status: 'DRAFT' | 'IN_PROGRESS' | 'CANCELED' | 'DONE'
}
