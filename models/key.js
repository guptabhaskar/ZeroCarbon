import { sequelize } from "./dbStart";
import { DataTypes } from "sequelize";

export const Key = sequelize.define(
  "key",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
