export interface OrderDTO {
  total: number
  user_id: string
  status: "DRAFT" | "IN_PROGRESS" | "CANCELED" | "DONE"
}