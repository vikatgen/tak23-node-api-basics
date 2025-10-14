import { Router } from 'express';
import { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from '../middlewares/validate.middleware.js';
import { categorySchema } from '../validations/category.validate.js';

const router = Router();

router.use(authenticateToken);

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);
router.post('/categories', validate(categorySchema), createCategory);
router.put('/categories/:id', validate(categorySchema), updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
