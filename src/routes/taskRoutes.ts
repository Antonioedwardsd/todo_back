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

// Ruta temporal protegida con `requiresAuth`
router.get("/api/protected", requiresAuth(), (req, res) => {
	res
		.status(200)
		.json({ message: "You are authenticated!", user: req.oidc.user });
});

router.post("/api/todos", requiresAuth(), createTaskController);
router.get("/api/todos", requiresAuth(), getAllTasksController);
router.get("/api/todos/:id", requiresAuth(), getTaskByIdController);
router.put("/api/todos/:id", requiresAuth(), updateTaskController);
router.delete("/api/todos/:id", requiresAuth(), deleteTaskController);

export default router;
