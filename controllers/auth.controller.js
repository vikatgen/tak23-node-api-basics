import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const prisma = new PrismaClient();

export const register = async (request, response) => {
    try {
        const { email, password } = request.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return response.status(400).json({ message: "User already exists" });
        };

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                passwordHash
            }
        });

        response.status(201).json({ message: "User created successfully" });
    } catch(exception) {
        response.status(500).json({ message: "Something went wrong" });
    }

};

export const login = async (request, response) => {
    try {

        const { email, password } = request.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return response.status(401).json({ message: "Invalid credentials" });
        };

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return response.status(401).json({ message: "Invalid credentials" });
        };

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_HASH, { expiresIn: "1h" });

        response.status(200).json({ token });
    } catch(exception) {
        response.status(500).json({ message: "Something went wrong" });
    };
};