import Task from "../models/task";
import { z } from "zod";

// Esquema de validación para creación y actualización
const createTaskSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
});

const updateTaskSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	completed: z.boolean().optional(),
});

export const createTask = async (data: {
	title: string;
	description?: string;
}) => {
	try {
		const validatedData = createTaskSchema.parse(data); // Validación con Zod
		return await Task.create(validatedData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Validation failed: " + error.message);
		}
	}
};

export const getAllTasks = async () => {
	try {
		return await Task.findAll();
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Error retrieving tasks: " + error.message);
		}
	}
};

export const getTaskById = async (id: string) => {
	try {
		const task = await Task.findByPk(id);
		if (!task) throw new Error("Task not found");
		return task;
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Error retrieving task: " + error.message);
		}
	}
};

export const updateTask = async (
	id: string,
	updates: { title?: string; description?: string; completed?: boolean }
) => {
	try {
		const validatedUpdates = updateTaskSchema.parse(updates); // Validación con Zod
		const task = await Task.findByPk(id);
		if (!task) return null;

		return await task.update(validatedUpdates);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Error updating task: " + error.message);
		}
	}
};

export const deleteTask = async (id: string) => {
	try {
		const task = await Task.findByPk(id);
		if (!task) return null;

		await task.destroy();
		return true;
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Error deleting task: " + error.message);
		}
	}
};
