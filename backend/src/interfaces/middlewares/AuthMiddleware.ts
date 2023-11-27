import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class AuthMiddleware {
  async handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const secret = process.env.JWT_SECRET

    try {
      jwt.verify(token, secret)

      return next()
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }
}

export { AuthMiddleware }
