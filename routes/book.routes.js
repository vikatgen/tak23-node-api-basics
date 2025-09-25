import { Router } from 'express';
import { createBook, updateBook, getAllBooks, getBook, deleteBook, getCategories, getBookStats } from '../controllers/book.controller.js'
import { validate } from '../middlewares/validate.middleware.js';
import { bookSchema } from '../validations/book.validate.js';
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/books', authenticateToken, getAllBooks)
router.get('/books/stats', authenticateToken, getBookStats)
router.get('/books/:id', authenticateToken, getBook)
router.post('/books', authenticateToken, validate(bookSchema), createBook);
router.put('/books/:id', authenticateToken, validate(bookSchema), updateBook);
router.delete('/books/:id', authenticateToken, deleteBook)
router.get('/categories', authenticateToken, getCategories)

export default router;