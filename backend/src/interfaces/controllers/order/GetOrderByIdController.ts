import { AuthUserDTO } from '@/application/dtos/UserDTO'
import { GetOrderByIdUseCase } from '@/application/usecases/order/GetOrderUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { getOrderByIdSchema } from '@/interfaces/validation/schemas/order/getOrderByIdSchema'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class GetOrderByIdController {
  private readonly getOrderByIdUseCase: GetOrderByIdUseCase

  constructor(getOrderByIdUseCase: GetOrderByIdUseCase) {
    this.getOrderByIdUseCase = getOrderByIdUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params
    const [, token] = req.headers.authorization?.split(' ') || ([] as string[])

    const validateRequestParams = getOrderByIdSchema.safeParse(id)

    if (!validateRequestParams.success) {
      return res.status(400).json({ error: 'Invalid request params' })
    }

    const { id: userId } = jwt.decode(token) as AuthUserDTO

    try {
      const order = await this.getOrderByIdUseCase.execute(id)

      if (order.user_id !== userId) {
        throw new CustomError('Unauthorized', 401)
      }

      return res.status(200).json(order)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          error: error.message,
        })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { GetOrderByIdController }
