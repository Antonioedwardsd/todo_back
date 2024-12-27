import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import {
	createTaskController,
	getAllTasksController,
	getTaskByIdController,
	updateTaskController,
	deleteTaskController,
} from "../controllers/taskController";

const router = Router();

const isTesting = process.env.NODE_ENV === "test";

if (!isTesting) {
	router.use(requiresAuth());
}

router.post("/api/todos", requiresAuth(), createTaskController);
router.get("/api/todos", requiresAuth(), getAllTasksController);
router.get("/api/todos/:id", requiresAuth(), getTaskByIdController);
router.put("/api/todos/:id", requiresAuth(), updateTaskController);
router.delete("/api/todos/:id", requiresAuth(), deleteTaskController);

export default router;
