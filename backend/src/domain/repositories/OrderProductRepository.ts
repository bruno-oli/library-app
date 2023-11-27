import { OrderProductDTO } from '@/application/dtos/OrderProductDTO'
import { OrderProduct } from '../entities/OrderProduct'

export interface OrderProductRepository {
  create(orderProduct: OrderProductDTO): Promise<void>
  findById(id: string): Promise<OrderProduct>
  update(id: string, orderProduct: Partial<OrderProductDTO>): Promise<void>
  delete(id: string): Promise<void>
}
