import { BookDTO } from '@/application/dtos/BookDTO'
import { BookRepository } from '@/domain/repositories/BookRepository'
import { prisma } from '../PrismaInstance'
import { Book } from '@/domain/entities/Book'

class BookDatabaseRepository implements BookRepository {
  async create(book: BookDTO) {
    await prisma.book.create({
      data: book,
    })
  }

  async findAll(params?: Partial<Book>) {
    return await prisma.book.findMany({
      where: {
        ...params,
      },
      orderBy: {
        price_in_cents: 'asc',
      },
    })
  }

  async findById(id: string) {
    return await prisma.book.findUnique({ where: { id } })
  }

  async update(id: string, book: Partial<BookDTO>) {
    await prisma.book.update({ where: { id }, data: book })
  }

  async delete(id: string) {
    await prisma.book.delete({ where: { id } })
  }
}

export { BookDatabaseRepository }
