import { CustomError } from '@/domain/errors/CustomError'
import { OrderProductRepository } from '@/domain/repositories/OrderProductRepository'
import { OrderRepository } from '@/domain/repositories/OrderRepository'

class GetOrderByIdUseCase {
  private readonly orderRepository: OrderRepository
  private readonly orderProductRepository: OrderProductRepository

  constructor(
    orderRepository: OrderRepository,
    orderProductRepository: OrderProductRepository,
  ) {
    this.orderRepository = orderRepository
    this.orderProductRepository = orderProductRepository
  }

  async execute(id: string) {
    try {
      const order = await this.orderRepository.findById(id)

      if (!order) {
        throw new CustomError('Order not found', 404)
      }

      const orderProducts =
        await this.orderProductRepository.findAllByOrderId(id)

      return { ...order, products: orderProducts }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { GetOrderByIdUseCase }
