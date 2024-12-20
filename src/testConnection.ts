import sequelize from "./utils/database";

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connected successfully!");
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});
