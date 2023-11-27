import { AuthUserUseCase } from "@/application/usecases/user/AuthUserUseCase"
import { Request, Response } from "express"
import { authUserSchema } from "../validation/schemas/user/authUserSchema"
import { CustomError } from "@/domain/errors/CustomError"

class AuthUserController {
  private readonly authUserUseCase: AuthUserUseCase

  constructor(authUserUseCase: AuthUserUseCase) {
    this.authUserUseCase = authUserUseCase
  }

  handle = async (req: Request, res: Response) => {
    const { token } = req.body

    const validateRequestBody = authUserSchema.safeParse({ token })

    if (!validateRequestBody.success) {
      return res.status(400).json({ error: "Invalid request body" })
    }

    try {
      const { decoded } = await this.authUserUseCase.execute(token)

      return res.status(200).json({ user: decoded })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message })
      }

      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

export { AuthUserController }