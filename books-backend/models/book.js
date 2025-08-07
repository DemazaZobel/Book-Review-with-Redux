// models/book.js
import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Book = db.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Book;
