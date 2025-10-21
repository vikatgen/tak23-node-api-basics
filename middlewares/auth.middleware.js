import jwt from "jsonwebtoken";
import prisma from "../config/PrismaClient.js";
import config from "../config/config.js";

export const authenticateToken = async (request, response, next) => {
    try {
        const token = request.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return response.status(401).json({ message: "Invalid token" });
        }

        const payload = jwt.verify(token, config.JWT_SECRET_HASH);
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