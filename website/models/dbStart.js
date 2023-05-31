import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL);

async function main() {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
