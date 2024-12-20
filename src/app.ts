import express from "express";
import sequelize from "./utils/database";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(taskRoutes);
app.use(errorHandler);

// Rutas
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to To-Do Backend!" });
});

// Sincronización con la base de datos y arranque del servidor
const PORT = 3000;

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connected successfully");
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to the database:", err);
	});
