import { AuthUserDTO } from '@/application/dtos/UserDTO'
import { UserRepository } from '@/domain/repositories/UserRepository'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class AuthUserMiddleware {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization?.split(' ') || []

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const secret = process.env.JWT_SECRET

    try {
      const decoded = jwt.verify(token, secret) as AuthUserDTO

      const user = await this.userRepository.findById(decoded.id)

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      return next()
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }
}

export { AuthUserMiddleware }
