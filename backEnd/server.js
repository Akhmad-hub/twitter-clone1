import express from "express"
import authRoutes from "./routes/auth.routes.js"
import "dotenv/config";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.routes.js";
import {v2 as cloudinary} from "cloudinary"
import postRoutes from "./routes/post.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";
import helmet from "helmet";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})  

const app = express()
const PORT= process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //to parse from data
app.use(helmet())

app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/notifications", notificationsRoutes)


app.listen(PORT, () => {
    console.log(`server is running  on port ${PORT}`)
    connectMongoDB()
})