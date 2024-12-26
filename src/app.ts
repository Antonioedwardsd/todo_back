import express from "express";
import sequelize from "./utils/database";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { auth } from "express-openid-connect";

const app = express();

const config = {
	authRequired: false,
	authLogout: true,
	secret:
		process.env.AUTH_SECRET || "a_long_randomly_generated_string_stored_in_env",
	baseURL: "http://localhost:3000",
	clientID: "XgKTPvpKb06BkkADcGnd9E5M8fctMigK",
	issuerBaseURL: "https://dev-1y8kfge7r5g4gzlc.us.auth0.com",
};

app.use(express.json());
app.use(auth(config));
app.use(taskRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to To-Do Backend!" });
});

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
