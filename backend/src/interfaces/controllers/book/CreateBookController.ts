import { BookDTO } from '@/application/dtos/BookDTO'
import { CreateBookUseCase } from '@/application/usecases/book/CreateBookUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { createBookSchema } from '@/interfaces/validation/schemas/book/createBookSchema'
import { Request, Response } from 'express'

class CreateBookController {
  private readonly createBookUseCase: CreateBookUseCase

  constructor(createBookUseCase: CreateBookUseCase) {
    this.createBookUseCase = createBookUseCase
  }

  handle = async (req: Request, res: Response) => {
    // eslint-disable-next-line
    const { name, description, image, stock, price_in_cents, author, featured } = req.body

    // eslint-disable-next-line
    const book = { name, description, image, stock, price_in_cents, author, featured } as BookDTO

    const validateBody = createBookSchema.safeParse(book)

    if (!validateBody.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      await this.createBookUseCase.execute(book)

      return res.status(201).send()
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { CreateBookController }
