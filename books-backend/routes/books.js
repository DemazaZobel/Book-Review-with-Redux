import express from "express";
import bookController from "../controllers/bookcontroller.js";

const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
