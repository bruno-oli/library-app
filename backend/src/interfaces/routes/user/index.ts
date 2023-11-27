import { Router } from "express";
import { registerUserRoute } from "./registerUserRoute";

const userRoutes = Router()

userRoutes.use(registerUserRoute)

export { userRoutes }