import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisnma = new PrismaClient();

export const authenticateToken = async (request, response, next) => {
    try {
        // "Bearer lajwef980u34+09u5rplkjqwep9uf0q394jopf"
        const token = request.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return response.status(401).json({ message: "Invalid token" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET_HASH);
        const user = await prisma.user.findUnique({ where: { id: payload.id } });

        if(!user) {
            return response.status(401).json({ message: "Invalid token" });
        }

        request.user = {
            id: user.id,
            email: user.email,
        };

        next();
    } catch (exception) {
        response.status(500).json({ message: "Something went wrong" });
    }
}