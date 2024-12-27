import { Request, Response } from "express";
import { z } from "zod";
import Task from "../models/task";

const taskSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	completed: z.boolean().optional(),
	status: z.enum(["pending", "in-progress", "done"]).optional(),
});

export const createTaskController = async (req: Request, res: Response) => {
	try {
		const validatedData = taskSchema.parse(req.body);
		const task = await Task.create(validatedData);
		res.status(201).json(task);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: "An unexpected error occurred." });
		}
	}
};

export const getAllTasksController = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "An unexpected error occurred." });
		}
	}
};

export const getTaskByIdController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		res.status(200).json(task);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "An unexpected error occurred." });
		}
	}
};

export const updateTaskController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const validatedData = taskSchema.partial().parse(req.body);
		const task = await Task.findByPk(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		await task.update(validatedData);
		res.status(200).json(task);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: "An unexpected error occurred." });
		}
	}
};

export const deleteTaskController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);
		if (!task) {
			res.status(404).json({ error: "Task not found" });
			return;
		}
		await task.destroy();
		res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: "An unexpected error occurred." });
		}
	}
};
