export interface Order {
  id: string
  total_in_cents: number
  user_id: string
  status: string
  createdAt: Date
  updatedAt: Date
}
