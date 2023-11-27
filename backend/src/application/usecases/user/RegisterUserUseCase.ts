import { CreateUserDTO } from '@/application/dtos/UserDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { UserRepository } from '@/domain/repositories/UserRepository'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import bcrypt from 'bcrypt'

class RegisterUserUseCase {
  private readonly userRespository: UserRepository

  constructor(userRespository: UserDatabaseRepository) {
    this.userRespository = userRespository
  }

  async execute(user: CreateUserDTO) {
    const userExists = await this.userRespository.findByEmail(user.email)

    if (userExists) {
      throw new CustomError('User already exists', 409)
    }

    const passwordHash = await bcrypt.hash(user.password, 10)

    try {
      await this.userRespository.create({ ...user, password: passwordHash })
    } catch (error) {
      throw new CustomError('Internal server error', 500)
    }
  }
}

export { RegisterUserUseCase }
