import express from "express";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors';
import helmet from "helmet";
import enviorment from "./config/config.js";
import { setupSwagger } from "./config/swagger.config.js";

const PORT = enviorment.PORT || 3006;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

setupSwagger(app);

app.use(authRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
    console.log(`API docs available on http://localhost:${PORT}/api-docs . Server listening on http://localhost:${PORT}`);
});
