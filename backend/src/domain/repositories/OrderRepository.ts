import { CreateOrderDTO, OrderDTO } from '@/application/dtos/OrderDTO'
import { Order } from '../entities/Order'

export interface OrderRepository {
  create(order: CreateOrderDTO): Promise<Order>
  findById(id: string): Promise<Order | null>
  update(id: string, order: Partial<OrderDTO>): Promise<void>
  delete(id: string): Promise<void>
}
