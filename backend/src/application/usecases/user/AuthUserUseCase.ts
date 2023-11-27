import { AuthUserDTO } from '@/application/dtos/UserDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import jwt from 'jsonwebtoken'

class AuthUserUseCase {
  private readonly userRepository: UserDatabaseRepository

  constructor(userRepository: UserDatabaseRepository) {
    this.userRepository = userRepository
  }

  async execute(token: string) {
    const secret = process.env.JWT_SECRET

    try {
      const decoded = jwt.verify(token, secret) as AuthUserDTO
      const user = await this.userRepository.findById(decoded.id)

      if (!user) {
        throw new CustomError('Invalid credentials', 401)
      }

      return { decoded }
    } catch (error) {
      throw new CustomError('Invalid credentials', 401)
    }
  }
}

export { AuthUserUseCase }
