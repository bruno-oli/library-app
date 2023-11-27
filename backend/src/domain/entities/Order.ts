export interface Order {
  id: string
  total: number
  user_id: string
  status: 'DRAFT' | 'IN_PROGRESS' | 'CANCELED' | 'DONE'
  createdAt: Date
  updatedAt: Date
}
