import express from "express"
import cors from "cors"
import "dotenv/config"

const app = express()

// Middlewares
app.use(express.json())
app.use(cors({
  origin: "*"
}))

export { app };