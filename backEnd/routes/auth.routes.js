import express from "express";
import { login, logOut, signUp } from "../controllers/auth.controller.js";

const authRoutes = express.Router();


authRoutes.post("/signup", signUp)
authRoutes.post("/login", login)
authRoutes.post("/logout", logOut)

export default authRoutes;
