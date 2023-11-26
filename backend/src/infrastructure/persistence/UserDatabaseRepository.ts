import { CreateUserDTO, UserDTO } from "@/application/dtos/UserDTO";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { prisma } from "../PrismaInstance";

class UserDatabaseRepository implements UserRepository {
  async create(user: CreateUserDTO) {
    await prisma.user.create({ data: user });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, user: Partial<UserDTO>) {
    await prisma.user.update({ where: { id }, data: user });
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }
}

export { UserDatabaseRepository }