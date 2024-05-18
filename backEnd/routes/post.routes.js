import express from "express"
import { protecRoute } from "../middleware/protectRoute.js"
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowPosts, getLikedPosts, getUserPosts, likeUnLikePost } from "../controllers/post.controller.js"
import { getTrendingHashtags } from "../controllers/hasTag.controller.js"


const postRoutes = express.Router()
postRoutes.get("/trending", getTrendingHashtags)
postRoutes.get("/getFollowing", protecRoute, getFollowPosts)
postRoutes.get("/all", protecRoute, getAllPosts,getTrendingHashtags)
postRoutes.get("/user/:userName", protecRoute,getUserPosts)
postRoutes.get("/likes/:id", protecRoute, getLikedPosts)
postRoutes.post("/create", protecRoute,createPost)
postRoutes.post("/like/:id", protecRoute, likeUnLikePost)
postRoutes.post("/comment/:id", protecRoute, commentOnPost)
postRoutes.delete("/:id", protecRoute,deletePost)

export default postRoutes