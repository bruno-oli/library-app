import { DeleteOrderUseCase } from '@/application/usecases/order/DeleteOrderUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { deleteOrderSchema } from '@/interfaces/validation/schemas/order/deleteOrderSchema'
import { Request, Response } from 'express'

class DeleteOrderController {
  private readonly deleteOrderUseCase: DeleteOrderUseCase

  constructor(deleteOrderUseCase: DeleteOrderUseCase) {
    this.deleteOrderUseCase = deleteOrderUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params

    const validateRequestParams = deleteOrderSchema.safeParse(id)

    if (!validateRequestParams.success) {
      return res.status(400).json({ error: 'Invalid request params' })
    }

    try {
      await this.deleteOrderUseCase.execute(id)

      return res.status(204).send()
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

export { DeleteOrderController }
