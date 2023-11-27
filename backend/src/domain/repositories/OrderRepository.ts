import { OrderDTO } from '@/application/dtos/OrderDTO'
import { Order } from '../entities/Order'

export interface OrderRepository {
  create(order: OrderDTO): Promise<void>
  findById(id: string): Promise<Order>
  update(id: string, order: Partial<OrderDTO>): Promise<void>
  delete(id: string): Promise<void>
}
