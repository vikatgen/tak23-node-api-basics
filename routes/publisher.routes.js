import { Router } from 'express';
import { getAllPublishers, getPublisher, createPublisher, updatePublisher, deletePublisher } from "../controllers/publisher.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from '../middlewares/validate.middleware.js';
import { publisherSchema } from '../validations/publisher.validate.js';

const router = Router();

router.use(authenticateToken);

router.get('/publishers', getAllPublishers);
router.get('/publishers/:id', getPublisher);
router.post('/publishers', validate(publisherSchema), createPublisher);
router.put('/publishers/:id', validate(publisherSchema), updatePublisher);
router.delete('/publishers/:id', deletePublisher);

export default router;
