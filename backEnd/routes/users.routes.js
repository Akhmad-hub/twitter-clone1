import express from "express"
import { protecRoute } from "../middleware/protectRoute.js"
import { followUnFollowUser, getSuggestedUser, getUserProfile, updateUser } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.get("/profile/:userName", protecRoute, getUserProfile)
userRoutes.get("/suggestedUser", protecRoute, getSuggestedUser)
userRoutes.post("/follow/:id", protecRoute, followUnFollowUser)
userRoutes.post("/update", protecRoute, updateUser)


export default userRoutes