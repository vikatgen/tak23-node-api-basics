import prisma from '../config/PrismaClient.js';
import { buildPrismaQueryOptions } from "prisma-smart-query";

export const getAllPublishers = async (request, response) => {
    try {
        const { queryOptions, meta } = buildPrismaQueryOptions(
            request,
            {},
            ["name"],
            {
                defaultSort: { created_at: "desc" },
            }
        )

        queryOptions.include = {
            books: true
        };

        const [publishers, total] = await Promise.all([
            prisma.publisher.findMany(queryOptions),
            prisma.publisher.count({ where: queryOptions.where })
        ]);

        response.status(200).json({
            data: publishers,
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

export const getPublisher = async (request, response) => {
    try {
        const { id } = request.params;

        const publisher = await prisma.publisher.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!publisher) {
            return response.status(404).json({
                message: "Publisher not found."
            })
        }

        response.status(200).json({
            publisher
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const createPublisher = async (request, response) => {
    try {
        const { name } = request.body;

        const existingPublisher = await prisma.publisher.findUnique({
            where: { name }
        });

        if (existingPublisher) {
            return response.status(400).json({
                message: "Publisher with this name already exists."
            });
        }

        const newPublisher = await prisma.publisher.create({
            data: {
                name
            }
        });

        response.status(201).json({
            message: "Publisher created successfully.",
            newPublisher
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const updatePublisher = async (request, response) => {
    try {
        const { name } = request.body;
        const { id } = request.params;

        const existingPublisher = await prisma.publisher.findUnique({
            where: { name }
        });

        if (existingPublisher && existingPublisher.id !== Number(id)) {
            return response.status(400).json({
                message: "Publisher with this name already exists."
            });
        }

        const updatedPublisher = await prisma.publisher.update({
            where: { id: Number(id) },
            data: { name }
        });

        response.status(200).json({
            message: "Publisher updated successfully.",
            updatedPublisher
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const deletePublisher = async (request, response) => {
    try {
        const { id } = request.params;

        await prisma.publisher.delete({
            where: { id: Number(id) }
        });

        response.status(200).json({
            message: "Publisher deleted successfully."
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}
