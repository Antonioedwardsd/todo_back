import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME || "todo_back",
	process.env.DB_USER || "postgres",
	process.env.DB_PASSWORD || "root",
	{
		host: process.env.DB_HOST || "localhost",
		port: parseInt(process.env.DB_PORT || "5432"),
		dialect: "postgres",
		logging: false,
	}
);

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

testConnection();

export default sequelize;
