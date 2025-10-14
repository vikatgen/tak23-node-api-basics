import prisma from "../config/PrismaClient.js";
import { buildPrismaQueryOptions } from "prisma-smart-query";

export const getAllBooks = async (request, response) => {
    try {
        const { queryOptions, meta } = buildPrismaQueryOptions(
            request,
            {},
            ["title", "description"],
            {
                defaultSort: { created_at: "desc" },
            }
        )

        queryOptions.include = {
            authors: {
                include: {
                    author: true
                }
            },
            categories: {
                include: {
                    category: true
                }
            },
            publisher: true
        };

        const [books, total] = await Promise.all([
            prisma.book.findMany(queryOptions),
            prisma.book.count({ where: queryOptions.where })
        ])

        response.status(200).json({
            data: books,
            meta: {
                ...meta,
                total,
                totalPages: Math.ceil(total / meta.limit)
            }
        })
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: error,
            message: "Something happening. Bad luck."
        })
    }

}

export const getBook = async (request, response) => {

    try {
        const { id } = request.params

        const book = await prisma.book.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                authors: {
                    include: {
                        author: true
                    }
                },
                categories: {
                    include: {
                        category: true
                    }
                },
                publisher: true
            }
        })

        if (!book) {
            return response.status(404).json({
                message: "Book not found."
            })
        }

        response.status(200).json({
            book
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }

}

export const createBook = async (request, response) => {
    const { title, description, year, authorIds, categoryIds, publisherId } = request.body;

    try {

        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                year,
                publisherId,
                authors: {
                    create: authorIds.map(authorId => ({
                        author: {
                            connect: { id: authorId }
                        }
                    }))
                },
                categories: {
                    create: categoryIds.map(categoryId => ({
                        category: {
                            connect: { id: categoryId }
                        }
                    }))
                }
            },
            include: {
                authors: {
                    include: {
                        author: true
                    }
                },
                categories: {
                    include: {
                        category: true
                    }
                },
                publisher: true
            }
        })

        response.status(201).json({
            message: "Book created successfully.",
            newBook
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }
}

export const updateBook = async (request, response) => {
    const { title, description, year, authorIds, categoryIds, publisherId } = request.body;
    const { id } = request.params

    try {

        await prisma.bookAuthors.deleteMany({
            where: { book_id: Number(id) }
        });

        await prisma.bookCategory.deleteMany({
            where: { book_id: Number(id) }
        });

        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                year,
                publisherId,
                authors: {
                    create: authorIds.map(authorId => ({
                        author: {
                            connect: { id: authorId }
                        }
                    }))
                },
                categories: {
                    create: categoryIds.map(categoryId => ({
                        category: {
                            connect: { id: categoryId }
                        }
                    }))
                }
            },
            include: {
                authors: {
                    include: {
                        author: true
                    }
                },
                categories: {
                    include: {
                        category: true
                    }
                },
                publisher: true
            }
        })

        response.status(200).json({
            message: "Book updated successfully.",
            updatedBook
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }
}

export const deleteBook = async (request, response) => {

    try {
        
        const { id } = request.params;

        await prisma.book.delete({
            where: { 
                id: Number(id) 
            }
        })

        response.status(200).json({
            message: "Book deleted successfully.",
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }

}