import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

class Task extends Model {}

Task.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(1024),
			allowNull: true,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		status: {
			type: DataTypes.ENUM("pending", "in-progress", "completed"),
			allowNull: false,
			defaultValue: "pending",
		},
	},
	{
		sequelize,
		modelName: "Task",
		tableName: "tasks",
		timestamps: true,
	}
);

export default Task;
