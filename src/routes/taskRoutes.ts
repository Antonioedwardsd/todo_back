import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import {
	createTaskController,
	getAllTasksController,
	updateTaskController,
	deleteTaskController,
} from "../controllers/taskController";

const router = Router();

router.post("/api/todos", requiresAuth(), createTaskController);
router.get("/api/todos", requiresAuth(), getAllTasksController);
router.put("/api/todos/:id", requiresAuth(), updateTaskController);
router.delete("/api/todos/:id", requiresAuth(), deleteTaskController);

export default router;
