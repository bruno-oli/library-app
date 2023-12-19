import { UpdateBookUseCase } from '@/application/usecases/book/UpdateBookUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { updateBookSchema } from '@/interfaces/validation/schemas/book/updateBookSchema'
import { Request, Response } from 'express'

class UpdateBookController {
  private readonly updateBookUseCase: UpdateBookUseCase

  constructor(updateBookUseCase: UpdateBookUseCase) {
    this.updateBookUseCase = updateBookUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    if (!id) {
      return res.status(400).json({ error: 'Invalid request params' })
    }

    // eslint-disable-next-line
    const { name, description, image, stock, price_in_cents, author, featured } = req.body

    const book = {
      name,
      description,
      image,
      stock,
      // eslint-disable-next-line
      price_in_cents,
      author,
      featured,
    }

    const validateBody = updateBookSchema.safeParse(book)

    if (!validateBody.success) {
      console.log(validateBody.error)

      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      await this.updateBookUseCase.execute(id, book)

      return res.status(204).send()
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { UpdateBookController }
