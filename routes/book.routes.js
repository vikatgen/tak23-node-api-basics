import { Router } from 'express';
import { createBook, updateBook } from '../controllers/book.controller.js'
import { validate } from '../middlewares/validate.middleware.js';
import { bookSchema } from '../validations/book.validate.js';

const router = Router();

router.post('/books', validate(bookSchema), createBook);
router.put('/books/:id', validate(bookSchema), updateBook)

export default router;