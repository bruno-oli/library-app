import { Router } from "express";
import { registerUserRoute } from "./registerUserRoute";
import { loginUserRoute } from "./loginUserRoute";
import { authUserRoute } from "./authUserRoute";

const userRoutes = Router()

userRoutes.use(registerUserRoute)
userRoutes.use(loginUserRoute)
userRoutes.use(authUserRoute)

export { userRoutes }