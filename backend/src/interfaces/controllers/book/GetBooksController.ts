import { GetBooksUseCase } from '@/application/usecases/book/GetBooksUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { getBooksSchema } from '@/interfaces/validation/schemas/book/getBooksSchema'
import { Request, Response } from 'express'

class GetBooksController {
  private readonly getBooksUseCase: GetBooksUseCase

  constructor(getBooksUseCase: GetBooksUseCase) {
    this.getBooksUseCase = getBooksUseCase
  }

  handle = async (req: Request, res: Response) => {
    // eslint-disable-next-line
    const { name, author, price_in_cents, image, stock, description, createdAt } = req.query

    const { orderBy, order } = req.query

    const { take, skip } = req.query

    const query = {
      name,
      author,
      // eslint-disable-next-line
      price_in_cents: price_in_cents ? Number(price_in_cents) : undefined,
      image,
      stock: stock ? Number(stock) : undefined,
      description,
      createdAt,
    }

    const validateQuery = getBooksSchema.safeParse({
      query: { ...query },
      orderBy,
      order,
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    })

    if (!validateQuery.success) {
      return res.status(400).json({
        error: 'Invalid request query',
      })
    }

    try {
      const { books, count } = await this.getBooksUseCase.execute(
        validateQuery.data.query,
        validateQuery.data.orderBy,
        validateQuery.data.order,
        validateQuery.data.take,
        validateQuery.data.skip,
      )

      return res.status(200).json({ books, count })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          error: error.message,
        })
      }

      return res.status(500).json({
        error: 'Internal server error',
      })
    }
  }
}

export { GetBooksController }
