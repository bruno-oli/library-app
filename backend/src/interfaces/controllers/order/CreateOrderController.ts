import { OrderDTO } from '@/application/dtos/OrderDTO'
import { AuthUserDTO } from '@/application/dtos/UserDTO'
import { CreateOrderUseCase } from '@/application/usecases/order/CreateOrderUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { createOrderSchema } from '@/interfaces/validation/schemas/order/createOrderSchema'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class CreateOrderController {
  private readonly createOrderUseCase: CreateOrderUseCase

  constructor(createOrderUseCase: CreateOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { books } = req.body

    const validateRequestBody = createOrderSchema.safeParse({ books })

    if (!validateRequestBody.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const [, token] = req.headers.authorization?.split(' ') || ([] as string[])

    // eslint-disable-next-line
    const { id: user_id } = (jwt.decode(token)) as AuthUserDTO

    const order: OrderDTO = {
      status: 'IN_PROGRESS',
      // eslint-disable-next-line
      user_id,
    }

    try {
      const createdOrder = await this.createOrderUseCase.execute(
        order,
        validateRequestBody.data.books,
      )

      return res.status(201).json(createdOrder)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { CreateOrderController }
