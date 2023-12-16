import { CreateOrderProductDTO } from '@/application/dtos/OrderProductDTO'
import { OrderProductRepository } from '@/domain/repositories/OrderProductRepository'
import { prisma } from '../PrismaInstance'

class OrderProductDatabaseRepository implements OrderProductRepository {
  async create(orderProduct: CreateOrderProductDTO) {
    await prisma.orderProduct.create({ data: orderProduct })
  }

  async findById(id: string) {
    return await prisma.orderProduct.findUnique({
      where: {
        id,
      },
    })
  }

  async findAllByOrderId(orderId: string) {
    return await prisma.orderProduct.findMany({
      where: {
        order_id: orderId,
      },
    })
  }

  async update(id: string, orderProduct: Partial<CreateOrderProductDTO>) {
    await prisma.orderProduct.update({
      where: {
        id,
      },
      data: orderProduct,
    })
  }

  async delete(id: string) {
    await prisma.orderProduct.delete({
      where: {
        id,
      },
    })
  }
}

export { OrderProductDatabaseRepository }
