import { CreateOrderDTO, OrderDTO } from '@/application/dtos/OrderDTO'
import { OrderRepository } from '@/domain/repositories/OrderRepository'
import { prisma } from '../PrismaInstance'

class OrderDatabaseRepository implements OrderRepository {
  async create(order: CreateOrderDTO) {
    return await prisma.order.create({ data: order })
  }

  async findById(id: string) {
    return await prisma.order.findUnique({ where: { id } })
  }

  async update(id: string, order: Partial<OrderDTO>) {
    await prisma.order.update({ where: { id }, data: order })
  }

  async delete(id: string) {
    await prisma.order.delete({ where: { id } })
  }
}

export { OrderDatabaseRepository }
