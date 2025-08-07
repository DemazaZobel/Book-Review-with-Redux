// server.js or index.js
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/books.js";
import { db } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);

const PORT = 5000;

db.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error("Database connection failed:", err);
});
