import { sequelize } from "./dbStart";
import { DataTypes } from "sequelize";

export const File = sequelize.define("file", {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  document_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
});
