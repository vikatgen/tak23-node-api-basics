import { Router } from 'express';
import { createBook, updateBook, getAllBooks, getBook, deleteBook } from '../controllers/book.controller.js'
import { validate } from '../middlewares/validate.middleware.js';
import { bookSchema } from '../validations/book.validate.js';

const router = Router();

router.get('/books', getAllBooks)
router.get('/books/:id', getBook)
router.post('/books', validate(bookSchema), createBook);
router.put('/books/:id', validate(bookSchema), updateBook);
router.delete('/books/:id', deleteBook)

export default router;