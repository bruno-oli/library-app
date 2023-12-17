import { AuthUserDTO } from '@/application/dtos/UserDTO'
import { CustomError } from '@/domain/errors/CustomError'
import { UserRepository } from '@/domain/repositories/UserRepository'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import jwt from 'jsonwebtoken'

class AuthUserUseCase {
  private readonly userRepository: UserRepository

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

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        iat: decoded.iat,
      }
    } catch (error) {
      throw new CustomError('Invalid credentials', 401)
    }
  }
}

export { AuthUserUseCase }
