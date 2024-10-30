import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export const getAllBooks = async (request, response) => {

    try {
        
        const books = await prisma.book.findMany()

        response.status(200).json({
            books
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }

}

export const getBook = async (request, response) => {

    try {

        const { id } = request.params

        const book = await prisma.book.findUnique({
            where: { id }
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
    const { title, description, year, author, publisher } = request.body;

    try {

        const newBook = await prisma.book.create({
            data: {
                title: title,
                description: description,
                year: year,
                author: author,
                publisher: publisher
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
    const { title, description, year, author, publisher } = request.body;
    const { id } = request.params

    try {
        
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                year,
                author,
                publisher
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
            where: { id }
        })

        response.status(200).json({
            message: "Book deleted successfully.",
            updatedBook
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }

}