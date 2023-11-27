import { AuthAdminUseCase } from '@/application/usecases/admin/AuthAdminUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { authAdminSchema } from '@/interfaces/validation/schemas/admin/authAdminSchema'
import { Request, Response } from 'express'

class AuthAdminController {
  private readonly authAdminUseCase: AuthAdminUseCase

  constructor(authAdminUseCase: AuthAdminUseCase) {
    this.authAdminUseCase = authAdminUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { token } = req.body

    const validateRequestBody = authAdminSchema.safeParse({ token })

    if (!validateRequestBody.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      const { admin } = await this.authAdminUseCase.execute(token)

      return res.status(200).json({ admin })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { AuthAdminController }
