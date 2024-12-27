import request from "supertest";
import app from "../src/app";

describe("Todos API", () => {
	it("should create a new task with valid data", async () => {
		const newTask = {
			title: "Test Task",
			description: "Test description",
			completed: false,
			status: "pending",
		};

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
		const testTaskId = "12345"; // Reemplaza esto con un ID válido para la prueba
		const response = await request(app).get(`/api/todos/${testTaskId}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("id", testTaskId);
	});

	it("should update a task by ID", async () => {
		const testTaskId = "12345"; // Reemplaza esto con un ID válido para la prueba
		const updates = { title: "Updated Task" };

		const response = await request(app)
			.put(`/api/todos/${testTaskId}`)
			.send(updates);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("title", updates.title);
	});

	it("should delete a task by ID", async () => {
		const testTaskId = "12345"; // Reemplaza esto con un ID válido para la prueba

		const response = await request(app).delete(`/api/todos/${testTaskId}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty(
			"message",
			"Task deleted successfully"
		);
	});
});
