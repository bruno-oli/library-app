import { BookDTO } from '@/application/dtos/BookDTO'
import { Book } from '../entities/Book'
import { BookOrderByFilter } from '@/infrastructure/persistence/BookDatabaseRepository'

export interface BookRepository {
  create(book: BookDTO): Promise<void>
  findAll(
    params?: Partial<Book>,
    orderBy?: BookOrderByFilter,
    order?: 'asc' | 'desc',
    take?: number,
    skip?: number,
  ): Promise<{ books: Book[]; count: number } | null>
  findById(id: string): Promise<Book | null>
  update(id: string, book: Partial<BookDTO>): Promise<void>
  delete(id: string): Promise<void>
}
