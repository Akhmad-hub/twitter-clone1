import express from "express"
import authRoutes from "./routes/auth.routes.js"
import "dotenv/config";
import connectMongoDB from "./db/connectMongoDB.js";


const app = express()
const PORT= process.env.PORT || 3000

app.use(express.json())

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`server is running  on port ${PORT}`)
    connectMongoDB()
})