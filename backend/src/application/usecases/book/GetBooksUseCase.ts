import { Book } from '@/domain/entities/Book'
import { CustomError } from '@/domain/errors/CustomError'
import { BookRepository } from '@/domain/repositories/BookRepository'
import { BookOrderByFilter } from '@/infrastructure/persistence/BookDatabaseRepository'

class GetBooksUseCase {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async execute(
    params?: Partial<Book>,
    orderBy: BookOrderByFilter = 'name',
    order: 'asc' | 'desc' = 'asc',
    take: number = 10,
    skip: number = 0,
  ) {
    try {
      const { books, count } = (await this.bookRepository.findAll(
        params,
        orderBy,
        order,
        take,
        skip,
      )) as { books: Book[]; count: number }

      if (!books || !books.length) {
        throw new CustomError('Any book was found', 404)
      }

      return { books, count }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw new CustomError('Internal server error', 500)
    }
  }
}

export { GetBooksUseCase }
