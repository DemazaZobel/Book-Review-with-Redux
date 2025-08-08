import {
    getAllBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById,
  } from "../services/bookServices.js";
  
  export const getBooks = async (req, res) => {
    try {
      const books = await getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const addBook = async (req, res) => {
    try {
      const book = await createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getBook = async (req, res) => {
    try {
      const book = await getBookById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateBook = async (req, res) => {
    try {
      const updated = await updateBookById(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Book not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteBook = async (req, res) => {
    try {
      const deleted = await deleteBookById(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Book not found" });
      res.json({ message: "Book deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  