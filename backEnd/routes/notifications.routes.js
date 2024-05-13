import express from "express";
import { protecRoute } from "../middleware/protectRoute.js";
import { deleteAllNotifications, deleteNotifications, getNotifications } from "../controllers/notifications.controller.js";

const notificationsRoutes = express.Router();

notificationsRoutes.get("/", protecRoute, getNotifications);
notificationsRoutes.delete("/", protecRoute, deleteAllNotifications);
notificationsRoutes.delete("/:id", protecRoute, deleteNotifications);
export default notificationsRoutes;
