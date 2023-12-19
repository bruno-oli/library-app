import { BookDTO } from '@/application/dtos/BookDTO'
import { BookRepository } from '@/domain/repositories/BookRepository'
import { prisma } from '../PrismaInstance'
import { Book } from '@/domain/entities/Book'

export type BookOrderByFilter = keyof Book

class BookDatabaseRepository implements BookRepository {
  async create(book: BookDTO) {
    await prisma.book.create({
      data: book,
    })
  }

  async findAll(
    params?: Partial<Book>,
    orderBy?: BookOrderByFilter,
    order?: 'asc' | 'desc',
    take?: number,
    skip?: number,
  ) {
    return await prisma.book.findMany({
      where: {
        ...params,
      },

      take,
      skip,

      orderBy: {
        [`${orderBy}`]: order,
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
