import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo_back", "postgres", "root", {
	host: "localhost",
	port: 5432,
	dialect: "postgres",
});

export default sequelize;
