import Task from "../models/task";

export const createTask = async (data: {
	title: string;
	description?: string;
}) => {
	return await Task.create(data);
};

export const getAllTasks = async () => {
	return await Task.findAll();
};

export const getTaskById = async (id: string) => {
	return await Task.findByPk(id);
};

export const updateTask = async (
	id: string,
	updates: { title?: string; description?: string; completed?: boolean }
) => {
	const task = await Task.findByPk(id);
	if (!task) return null;

	return await task.update(updates);
};

export const deleteTask = async (id: string) => {
	const task = await Task.findByPk(id);
	if (!task) return null;

	await task.destroy();
	return true;
};
