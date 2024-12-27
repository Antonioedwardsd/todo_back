import request from "supertest";
import app from "../src/app";
import Task from "../src/models/task";

let testTaskId: string;

beforeAll(async () => {
	// Limpia la base de datos antes de crear datos de prueba
	await Task.destroy({ where: {} });

	// Crea una tarea de prueba
	const task = await Task.create({
		title: "Test Task",
		description: "Test description",
		completed: false,
		status: "pending",
	});
	testTaskId = task.id; // Guarda el ID generado para usarlo en las pruebas
});

// Objeto global para las pruebas de creación
const newTask = {
	title: "New Test Task",
	description: "New Test description",
	completed: false,
	status: "pending", // Usa valores válidos según el esquema
};

describe("Todos API", () => {
	it("should create a new task with valid data", async () => {
		const response = await request(app).post("/api/todos").send(newTask);

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.title).toBe(newTask.title);
	});

	it("should return 400 for invalid task data", async () => {
		const invalidTask = {};

		const response = await request(app).post("/api/todos").send(invalidTask);

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("error");
	});

	it("should retrieve all tasks", async () => {
		const response = await request(app).get("/api/todos");
		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("should retrieve a specific task by ID", async () => {
		const response = await request(app).get(`/api/todos/${testTaskId}`); // Usa testTaskId
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("id", testTaskId);
	});

	it("should update a task by ID", async () => {
		const updates = { title: "Updated Task" };

		const response = await request(app)
			.put(`/api/todos/${testTaskId}`) // Usa testTaskId
			.send(updates);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("title", updates.title);
	});

	it("should delete a task by ID", async () => {
		const response = await request(app).delete(`/api/todos/${testTaskId}`); // Usa testTaskId
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty(
			"message",
			"Task deleted successfully"
		);
	});
});
