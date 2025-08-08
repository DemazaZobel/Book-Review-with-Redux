import express from "express";
import cors from "cors";
import bookRoutes from "./routes/books.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);


export default app;
