import { Router } from 'express';
import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor} from "../controllers/author.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from '../middlewares/validate.middleware.js';
import { authorSchema } from '../validations/author.validate.js';

const router = Router();

router.use(authenticateToken);

router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthor);
router.post('/authors', validate(authorSchema), createAuthor);
router.put('/authors/:id', validate(authorSchema), updateAuthor);
router.delete('/authors/:id', deleteAuthor);

export default router;