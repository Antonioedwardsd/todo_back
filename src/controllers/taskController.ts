import { Request, Response } from "express";
import {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	deleteTask,
} from "../services/taskService";
import { taskSchema } from "../utils/taskValidator";

export const createTaskController = async (req: Request, res: Response) => {
	try {
		const validatedData = taskSchema.parse(req.body);
		const task = await createTask(validatedData);
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const getAllTasksController = async (req: Request, res: Response) => {
	try {
		const tasks = await getAllTasks();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
};

export const updateTaskController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		const task = await updateTask(id, updates);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}

		res.status(200).json(task);
	} catch (error) {
		res.status(400).json({ error });
	}
};

export const deleteTaskController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deleted = await deleteTask(id);
		if (!deleted) {
			res.status(404).json({ error: "Task not found" });
			return;
		}

		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Failed to delete task" });
	}
};
