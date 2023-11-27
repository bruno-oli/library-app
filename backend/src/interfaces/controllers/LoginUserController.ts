import { LoginUserUseCase } from '@/application/usecases/user/LoginUserUseCase'
import { Request, Response } from 'express'
import { loginUserSchema } from '../validation/schemas/user/loginUserSchema'
import { CustomError } from '@/domain/errors/CustomError'

class LoginUserController {
  private readonly loginUserUseCase: LoginUserUseCase

  constructor(loginUserUseCase: LoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const validateRequestBody = loginUserSchema.safeParse({ email, password })

    if (!validateRequestBody.success) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    try {
      const { token } = await this.loginUserUseCase.execute(email, password)

      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export { LoginUserController }
