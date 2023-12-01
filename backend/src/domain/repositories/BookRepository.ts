import { BookDTO } from '@/application/dtos/BookDTO'
import { Book } from '../entities/Book'

export interface BookRepository {
  create(book: BookDTO): Promise<void>
  findAll(params?: Partial<Book>): Promise<Book[] | null>
  findById(id: string): Promise<Book | null>
  update(id: string, book: Partial<BookDTO>): Promise<void>
  delete(id: string): Promise<void>
}
