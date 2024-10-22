import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3006;

const app = express();
app.use(express.json());

app.use(bookRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
