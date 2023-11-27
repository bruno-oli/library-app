import { CustomError } from '@/domain/errors/CustomError'
import { UserDatabaseRepository } from '@/infrastructure/persistence/UserDatabaseRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class LoginUserUseCase {
  private readonly userRepository: UserDatabaseRepository

  constructor(userRepository: UserDatabaseRepository) {
    this.userRepository = userRepository
  }

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new CustomError('Invalid credentials', 401)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new CustomError('Invalid credentials', 401)
    }

    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ id: user.id, email, name: user.name }, secret)

    return { token }
  }
}

export { LoginUserUseCase }
