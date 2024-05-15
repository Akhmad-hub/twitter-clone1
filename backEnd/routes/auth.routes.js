import express from "express";
import { getMe, login, logOut, signUp } from "../controllers/auth.controller.js";
import { protecRoute } from "../middleware/protectRoute.js";

const authRoutes = express.Router();


authRoutes.get("/me", protecRoute, getMe)
authRoutes.post("/signup", signUp)
authRoutes.post("/login", login)
authRoutes.post("/logout", logOut)

export default authRoutes;
