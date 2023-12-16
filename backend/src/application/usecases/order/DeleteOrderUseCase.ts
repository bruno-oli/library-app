import { CustomError } from '@/domain/errors/CustomError'
import { OrderRepository } from '@/domain/repositories/OrderRepository'
import { prisma } from '@/infrastructure/PrismaInstance'

class DeleteOrderUseCase {
  private readonly orderRepository: OrderRepository

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(id: string) {
    try {
      const orderExists = await this.orderRepository.findById(id)

      if (!orderExists) {
        throw new CustomError('Order not found', 404)
      }

      await prisma.orderProduct.deleteMany({
        where: {
          order_id: id,
        },
      })

      await this.orderRepository.delete(id)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { DeleteOrderUseCase }
