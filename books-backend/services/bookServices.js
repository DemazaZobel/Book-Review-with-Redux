// services/bookService.js
import Book from "../models/book.js";

const getAllBooks = async () => {
  return await Book.findAll();
};

const createBook = async (data) => {
  return await Book.create(data);
};

const getBookById = async (id) => {
  return await Book.findByPk(id);
};

const updateBookById = async (id, data) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  return await book.update(data);
};

const deleteBookById = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  await book.destroy();
  return true;
};

export {
  getAllBooks,
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
