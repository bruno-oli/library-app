import { CreateUserDTO, UserDTO } from '@/application/dtos/UserDTO'
import { User } from '@/domain/entities/User'
import { UserRepository } from '@/domain/repositories/UserRepository'

class UserMockRepository implements UserRepository {
  public users: User[] = []

  async create(user: CreateUserDTO) {
    this.users.push({
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) || null
  }

  async update(id: string, user: Partial<UserDTO>) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...user,
    }
  }

  async delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id)
  }
}

export { UserMockRepository }
