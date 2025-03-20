/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - year
 *         - author
 *         - publisher
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         description:
 *           type: string
 *           description: The book description
 *         year:
 *           type: integer
 *           description: The publication year
 *         author:
 *           type: string
 *           description: The book author
 *         publisher:
 *           type: string
 *           description: The book publisher
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was updated
 */

import { Router } from 'express';
import { createBook, updateBook, getAllBooks, getBook, deleteBook } from '../controllers/book.controller.js'
import { validate } from '../middlewares/validate.middleware.js';
import { bookSchema } from '../validations/book.validate.js';

const router = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', getAllBooks)

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get('/books/:id', getBook)

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - year
 *               - author
 *               - publisher
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               year:
 *                 type: integer
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input data
 */
router.post('/books', validate(bookSchema), createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - year
 *               - author
 *               - publisher
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               year:
 *                 type: integer
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *     responses:
 *       200:
 *         description: The book was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: The book was not found
 */
router.put('/books/:id', validate(bookSchema), updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted successfully
 *       404:
 *         description: The book was not found
 */
router.delete('/books/:id', deleteBook)

export default router;