import { AuthAdminDTO } from '@/application/dtos/AdminDTO'
import { AdminRepository } from '@/domain/repositories/AdminRepository'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class AuthAdminMiddleware {
  private readonly adminRepository: AdminRepository

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization?.split(' ') || []

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const secret = process.env.JWT_SECRET

    try {
      const decoded = jwt.verify(token, secret) as AuthAdminDTO

      const admin = await this.adminRepository.findById(decoded.id)

      if (!admin) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      return next()
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }
}

export { AuthAdminMiddleware }
