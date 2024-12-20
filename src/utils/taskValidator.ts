import { z } from "zod";

export const taskSchema = z.object({
	title: z.string().nonempty("Title is required"),
	description: z.string().optional(),
	completed: z.boolean().optional(),
});
