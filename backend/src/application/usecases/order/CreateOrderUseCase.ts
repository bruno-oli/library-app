import { OrderDTO } from '@/application/dtos/OrderDTO'
import { OrderProductDTO } from '@/application/dtos/OrderProductDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { OrderRepository } from '@/domain/repositories/OrderRepository'
import { prisma } from '@/infrastructure/PrismaInstance'

class CreateOrderUseCase {
  private readonly orderRepository: OrderRepository

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(order: OrderDTO, books: OrderProductDTO[]) {
    try {
      const createdOrder = await this.orderRepository.create({
        status: order.status,
        user_id: order.user_id,
        total_in_cents: 0,
      })

      await prisma
        .$transaction(async () => {
          for (const book of books) {
            const bookExists = await prisma.book.findUnique({
              where: {
                id: book.product_id,
              },
            })

            if (!bookExists) {
              await prisma.order.delete({
                where: {
                  id: createdOrder.id,
                },
              })

              throw new CustomError(`Book ${book.product_id} not found`, 404)
            }

            if (book.quantity > bookExists.stock) {
              await prisma.order.delete({
                where: {
                  id: createdOrder.id,
                },
              })

              throw new CustomError(
                `Book ${bookExists.name} is out of stock`,
                400,
              )
            }

            await prisma.orderProduct.create({
              data: {
                order_id: createdOrder.id,
                product_id: book.product_id,
                quantity: book.quantity,
                price_in_cents: bookExists.price_in_cents,
              },
            })

            await prisma.book.update({
              where: {
                id: bookExists.id,
              },
              data: {
                stock: bookExists.stock - book.quantity,
              },
            })
          }
        })
        .then(async () => {
          const allOrderProducts = await prisma.orderProduct.findMany({
            where: {
              order_id: createdOrder.id,
            },
          })

          const totalInCents = allOrderProducts.reduce(
            (acc, orderProduct) =>
              acc + orderProduct.price_in_cents * orderProduct.quantity,
            0,
          )

          await prisma.order.update({
            where: {
              id: createdOrder.id,
            },
            data: {
              total_in_cents: totalInCents,
            },
          })
        })

      const updatedOrder = await this.orderRepository.findById(createdOrder.id)

      return updatedOrder
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { CreateOrderUseCase }
