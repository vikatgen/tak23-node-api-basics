import express from "express";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js";
import authorRoutes from "./routes/author.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import publisherRoutes from "./routes/publisher.routes.js";
import cors from 'cors';
import helmet from "helmet";
import enviorment from "./config/config.js";
import { setupSwagger } from "./config/swagger.config.js";
import * as bodyParser from "express";

const PORT = enviorment.PORT || 3006;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupSwagger(app);

app.use(authRoutes);
app.use(bookRoutes);
app.use(authorRoutes);
app.use(categoryRoutes);
app.use(publisherRoutes);

app.listen(PORT, () => {
    console.log(`API docs available on http://localhost:${PORT}/api-docs . Server listening on http://localhost:${PORT}`);
});
