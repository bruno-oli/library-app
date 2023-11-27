import { z } from "zod";

const authUserSchema = z.object({
  token: z.string()
})

export { authUserSchema }