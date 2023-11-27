import { Router } from "express";
import { registerUserRoute } from "./registerUserRoute";
import { loginUserRoute } from "./loginUserRoute";

const userRoutes = Router()

userRoutes.use(registerUserRoute)
userRoutes.use(loginUserRoute)

export { userRoutes }