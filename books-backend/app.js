import express from "express";
import cors from "cors";
import booksRoutes from "./routes/books.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', booksRoutes);

app.get('/', (req, res) => {
  res.send('Books API is running');
});

module.exports = app;
