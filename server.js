import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { swaggerOptions } from "./utils/swaggerOptions.js";
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3006;

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(authRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
    console.log(`API docs available on http://localhost:${PORT}/api-docs . Server listening on http://localhost:${PORT}`);
});
