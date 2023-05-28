import { sequelize } from "./dbStart";
import { DataTypes } from "sequelize";

export const Leaderboard = sequelize.define("leaderboard", {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    carbon_emissions: {
        type: DataTypes.FLOAT
    },
}, {
    timestamps: false,
});
