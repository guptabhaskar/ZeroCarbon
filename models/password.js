import { sequelize } from "./dbStart";
import { DataTypes } from "sequelize";

export const Password = sequelize.define(
  "password",
  {
    user_id: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);
