import { z } from "zod";

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export { loginUserSchema }