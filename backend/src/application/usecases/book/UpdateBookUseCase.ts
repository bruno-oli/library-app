import { BookDTO } from '@/application/dtos/BookDTO'
import { shallowComparison } from '@/application/utils/shallowComparision'
import { Book } from '@/domain/entities/Book'
import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'

class UpdateBookUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(id: string, book: BookDTO) {
    try {
      const bookExists = await this.bookRepository.findById(id)

      if (!bookExists) {
        throw new CustomError('Book not found', 404)
      }

      await this.bookRepository.update(id, book)

      const modifiedBook = (await this.bookRepository.findById(id)) as Book

      const isUnmodified = shallowComparison(bookExists, modifiedBook, [
        'updatedAt',
        'createdAt',
      ])

      if (isUnmodified) {
        throw new CustomError('Not modified', 304)
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { UpdateBookUseCase }
