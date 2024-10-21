import { Router } from 'express';
import { createBook } from '../controllers/book.controller.js'

const router = Router();

router.post('/books', createBook);

export default router;