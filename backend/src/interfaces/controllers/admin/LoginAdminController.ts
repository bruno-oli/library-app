import { LoginAdminUseCase } from '@/application/usecases/admin/LoginAdminUseCase'
import { CustomError } from '@/domain/errors/CustomError'
import { loginUserSchema } from '@/interfaces/validation/schemas/user/loginUserSchema'
import { Request, Response } from 'express'

class LoginAdminController {
  private readonly loginAdminUseCase: LoginAdminUseCase

  constructor(loginAdminUseCase: LoginAdminUseCase) {
    this.loginAdminUseCase = loginAdminUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const validateRequestBody = loginUserSchema.safeParse({ email, password })

    if (!validateRequestBody.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      const { token } = await this.loginAdminUseCase.execute(email, password)

      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { LoginAdminController }
