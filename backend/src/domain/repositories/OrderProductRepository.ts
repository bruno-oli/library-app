import { CreateOrderProductDTO } from '@/application/dtos/OrderProductDTO'
import { OrderProduct } from '../entities/OrderProduct'

export interface OrderProductRepository {
  create(orderProduct: CreateOrderProductDTO): Promise<void>
  findById(id: string): Promise<OrderProduct | null>
  findAllByOrderId(orderId: string): Promise<OrderProduct[] | null>
  update(
    id: string,
    orderProduct: Partial<CreateOrderProductDTO>,
  ): Promise<void>
  delete(id: string): Promise<void>
}
