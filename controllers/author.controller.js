import prisma from '../config/PrismaClient.js';
import { buildPrismaQueryOptions } from "prisma-smart-query";

export const getAllAuthors = async (request, response) => {
    try {
        const { queryOptions, meta } = buildPrismaQueryOptions(
            request,
            {},
            ["first_name", "last_name"],
            {
                defaultSort: { created_at: "desc" },
            }
        )

        queryOptions.include = {
            books: {
                include: {
                    book: {
                        include: {
                            publisher: true
                        }
                    }
                }
            }
        };

        const [authors, total] = await Promise.all([
            prisma.author.findMany(queryOptions),
            prisma.author.count({ where: queryOptions.where })
        ]);

        response.status(200).json({
            data: authors,
            meta: {
                ...meta,
                total,
                totalPages: Math.ceil(total / meta.limit)
            }
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const getAuthor = async (request, response) => {
    try {
        const { id } = request.params;

        const author = await prisma.author.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!author) {
            return response.status(404).json({
                message: "Author not found."
            })
        }

        response.status(200).json({
            author
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const createAuthor = async (request, response) => {
    try {
        const { first_name, last_name } = request.body;

        const newAuthor = await prisma.author.create({
            data: {
                first_name,
                last_name
            }
        });

        response.status(201).json({
            message: "Author created successfully.",
            newAuthor
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const updateAuthor = async (request, response) => {
    try {
        const { first_name, last_name } = request.body;
        const { id } = request.params;

        const updatedAuthor = await prisma.author.update({
            where: { id: Number(id) },
            data: {
                first_name,
                last_name
            }
        });

        response.status(200).json({
            message: "Author updated successfully.",
            updatedAuthor
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const deleteAuthor = async (request, response) => {
    try {
        const { id } = request.params;

        await prisma.author.delete({
            where: { id: Number(id) }
        });

        response.status(200).json({
            message: "Author deleted successfully."
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}