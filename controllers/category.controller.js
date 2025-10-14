import prisma from '../config/PrismaClient.js';
import { buildPrismaQueryOptions } from "prisma-smart-query";

export const getAllCategories = async (request, response) => {
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
            books: {
                include: {
                    book: true
                }
            }
        };

        const [categories, total] = await Promise.all([
            prisma.category.findMany(queryOptions),
            prisma.category.count({ where: queryOptions.where })
        ]);

        response.status(200).json({
            data: categories,
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

export const getCategory = async (request, response) => {
    try {
        const { id } = request.params;

        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!category) {
            return response.status(404).json({
                message: "Category not found."
            })
        }

        response.status(200).json({
            category
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const createCategory = async (request, response) => {
    try {
        const { name } = request.body;

        const existingCategory = await prisma.category.findUnique({
            where: { name }
        });

        if (existingCategory) {
            return response.status(400).json({
                message: "Category with this name already exists."
            });
        }

        const newCategory = await prisma.category.create({
            data: {
                name
            }
        });

        response.status(201).json({
            message: "Category created successfully.",
            newCategory
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const updateCategory = async (request, response) => {
    try {
        const { name } = request.body;
        const { id } = request.params;

        const existingCategory = await prisma.category.findUnique({
            where: { name }
        });

        if (existingCategory && existingCategory.id !== Number(id)) {
            return response.status(400).json({
                message: "Category with this name already exists."
            });
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { name }
        });

        response.status(200).json({
            message: "Category updated successfully.",
            updatedCategory
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}

export const deleteCategory = async (request, response) => {
    try {
        const { id } = request.params;

        await prisma.category.delete({
            where: { id: Number(id) }
        });

        response.status(200).json({
            message: "Category deleted successfully."
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }
}
