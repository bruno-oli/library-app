import { GetBookByIdUseCase } from '@/application/usecases/book/GetBookByIdUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { getBookByIdSchema } from '@/interfaces/validation/schemas/book/getBookByIdSchema'
import { Request, Response } from 'express'

class GetBookByIdController {
  private readonly getBookByIdUseCase: GetBookByIdUseCase

  constructor(getBookByIdUseCase: GetBookByIdUseCase) {
    this.getBookByIdUseCase = getBookByIdUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params

    const validateParams = getBookByIdSchema.safeParse({ id })

    if (!validateParams.success) {
      return res.status(400).json({
        error: 'Invalid request params',
      })
    }

    try {
      const book = await this.getBookByIdUseCase.execute(id)

      return res.status(200).json(book)
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

export { GetBookByIdController }
