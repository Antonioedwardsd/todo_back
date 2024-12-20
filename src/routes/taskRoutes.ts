import express from "express";
import Task from "../models/task";
import { taskSchema } from "../utils/taskValidator";

const router = express.Router();

router.post("/api/todos", async (req, res, next) => {
	try {
		const validatedData = taskSchema.parse(req.body);
		const task = await Task.create(validatedData);
		res.status(201).json(task);
	} catch (error) {
		next(error);
	}
});

router.get("/api/todos", async (req, res) => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
});

router.put("/api/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, completed } = req.body;
		const task = await Task.findByPk(id);

		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}

		await task.update({ title, description, completed });
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ error: "Failed to update task" });
	}
});

router.delete("/api/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);

		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}

		await task.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Failed to delete task" });
	}
});

export default router;
