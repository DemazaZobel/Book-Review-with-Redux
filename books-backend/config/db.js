// config/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export { sequelize as db };
