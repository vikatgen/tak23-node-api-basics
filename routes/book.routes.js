/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBookInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - year
 *         - author
 *         - publisher
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         description:
 *           type: string
 *           description: Description of the book
 *         year:
 *           type: number
 *           description: Publication year
 *         author:
 *           type: string
 *           description: Author of the book
 *         publisher:
 *           type: string
 *           description: Publisher of the book
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
 *           description: Auto-generated ID of the book
 *         title:
 *           type: string
 *           description: Title of the book
 *         description:
 *           type: string
 *           description: Description of the book
 *         year:
 *           type: number
 *           description: Publication year
 *         author:
 *           type: string
 *           description: Author of the book
 *         publisher:
 *           type: string
 *           description: Publisher of the book
 *   responses:
 *     BookNotFound:
 *       description: The requested book was not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Book not found
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
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
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
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/BookNotFound'
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
 *             $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input
 */
router.post('/books', validate(bookSchema), createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/BookNotFound'
 *       400:
 *         description: Invalid input
 */
router.put('/books/:id', validate(bookSchema), updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         $ref: '#/components/responses/BookNotFound'
 */
router.delete('/books/:id', deleteBook)

export default router;