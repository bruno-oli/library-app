import { DeleteBookUseCase } from '@/application/usecases/book/DeleteBookUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { deleteBookSchema } from '@/interfaces/validation/schemas/book/deleteBookSchema'
import { Request, Response } from 'express'

class DeleteBookController {
  private readonly deleteBookUseCase: DeleteBookUseCase

  constructor(deleteBookUseCase: DeleteBookUseCase) {
    this.deleteBookUseCase = deleteBookUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params

    const validateBody = deleteBookSchema.safeParse({ id })

    if (!validateBody.success) {
      return res.status(400).json({
        error: 'Invalid request body',
      })
    }

    try {
      await this.deleteBookUseCase.execute(id)

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

export { DeleteBookController }
